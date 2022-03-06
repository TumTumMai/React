const { ForbiddenError, ApplicationError } = require("@strapi/utils").errors;
const moment = require("moment");

module.exports = {
  async beforeUpdate(event) {
    const { data, where, select, populate } = event.params;
    const userId = data.user;
    const { id } = where;
    const { startDate, endDate, status, leaveDayType, publishedAt } = data;
    var leaveDate = 0;

    // update data public but is not update data
    if (!!publishedAt || publishedAt === null) {
      return;
    }

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
      throw new ForbiddenError("user is empty");
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
    console.log(status, leaveDetail.status);
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
          throw new ForbiddenError("Transaction error");
        }
      } else {
        throw new ForbiddenError(
          "The transaction has been confirmed. Please make a new transaction."
        );
      }
    }
  },
};
