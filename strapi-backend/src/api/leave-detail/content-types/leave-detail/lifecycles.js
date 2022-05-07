const { PolicyError, ValidationError } = require("@strapi/utils").errors;
const moment = require("moment");

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    const { startDate, endDate, status, leaveDayType } = data;
    // data.user is value belongs to content-manager and data.userId is value belongs to custom api
    const userId = data.user ? data.user : data.userId;
    var leaveDays = 0;

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
        leaveDays = 1;
      } else if (startDateConvert.isAfter(endDateConvert)) {
        event.params.data.startDate = endDate;
        event.params.data.endDate = startDate;

        leaveDays = startDateConvert.diff(endDateConvert, "days") + 1;
      } else {
        leaveDays = endDateConvert.diff(startDateConvert, "days") + 1;
      }
    }
    // set leaveDays
    event.params.data.leaveDays = leaveDays;
  },
  async beforeUpdate(event) {
    const { data, where, select, populate } = event.params;
    const { startDate, endDate, status, leaveDayType } = data;
    const { id } = where;

    // data.user is value belongs to content-manager and data.userId is value belongs to custom api
    const userId = data.user ? data.user : data.userId;
    var leaveDays = 0;

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
        leaveDays = 1;
      } else if (startDateConvert.isAfter(endDateConvert)) {
        event.params.data.startDate = endDate;
        event.params.data.endDate = startDate;

        leaveDays = startDateConvert.diff(endDateConvert, "days") + 1;
      } else {
        leaveDays = endDateConvert.diff(startDateConvert, "days") + 1;
      }
    }

    // set leaveDays
    event.params.data.leaveDays = leaveDays;
  },
};
