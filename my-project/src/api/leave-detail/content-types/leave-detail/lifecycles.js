const { PolicyError, ValidationError } = require("@strapi/utils").errors;
const moment = require("moment");

module.exports = {
  async beforeUpdate(event) {
    const { data, where, select, populate } = event.params;
    const { startDate, endDate, status, leaveDayType, publishedAt } = data;
    const { id } = where;

    // data.user is value belongs to content-manager and data.userId is value belongs to custom api
    const userId = data.user ? data.user : data.userId;
    var leaveDate = 0;

    //get leaveDetail before update
    const leaveDetail = await strapi.db
      .query("api::leave-detail.leave-detail")
      .findOne({
        where: { id: id },
      });

    //get user
    const user = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({
        where: { id: userId },
      });
    if (!user) {
      throw new ValidationError("user is empty");
    }

    // check startDate & endDate
    if (!!startDate && !!endDate) {
      const startDateConvert = moment(startDate);
      const endDateConvert = moment(endDate);

      if (startDateConvert.isSame(endDateConvert)) {
        leaveDate = 1;
      } else if (startDateConvert.isAfter(endDateConvert)) {
        event.params.data.startDate = endDate;
        event.params.data.endDate = startDate;

        leaveDate = startDateConvert.diff(endDateConvert, "days") + 1;
      } else {
        leaveDate = endDateConvert.diff(startDateConvert, "days") + 1;
      }
    }

    // check status leaveDetail
    if (status !== leaveDetail.status) {
      var dataUpdate = {};
      if (status === "approve") {
        if (leaveDayType === "sick_leave") {
          leaveDate = user.sickLeave + leaveDate;
          dataUpdate = { sickLeave: leaveDate };
        } else if (leaveDayType === "vacation_leave") {
          leaveDate = user.vacationLeave + leaveDate;
          dataUpdate = { vacationLeave: leaveDate };
        } else if (leaveDayType === "personal_leave") {
          leaveDate = user.personalLeave + leaveDate;
          dataUpdate = { personalLeave: leaveDate };
        }
      }

      // if old staus approve and cancel, tranaction has been confirmed
      if (leaveDetail.status !== "approve" && leaveDetail.status !== "cancel") {
        if (leaveDate >= 0) {
          await strapi.db.query("plugin::users-permissions.user").update({
            where: { id: userId },
            data: dataUpdate,
          });
        } else {
          throw new PolicyError("Transaction error");
        }
      } else {
        throw new PolicyError(
          "The transaction has been confirmed. Please make a new transaction."
        );
      }
    }
  },
};
