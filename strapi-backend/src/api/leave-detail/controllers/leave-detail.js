"use strict";
const { ValidationError } = require("@strapi/utils").errors;
/**
 *  leave-detail controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::leave-detail.leave-detail",
  ({ strapi }) => ({
    async allSum() {
      let result = [];

      const users = await strapi.db
        .query("plugin::users-permissions.user")
        .findMany();

      const leaves = await strapi.db
        .query("api::leave-detail.leave-detail")
        .findMany({
          where: {
            status: "approve",
            endDate: {
              $lte: new Date().getFullYear() + "-12-31",
            },
          },
          populate: {
            user: true,
          },
        });
      if (users.length > 0 && leaves.length > 0) {
        result = users.map((user) => {
          const leavesFilter = leaves.filter(
            (leave) => leave.user.id === user.id
          );
          user.sick_leave = 0;
          user.vacation_leave = 0;
          user.persanal_leave = 0;
          user.total_leave = 0;

          leavesFilter.forEach((element) => {
            if (element.leaveDayType === "sick_leave") {
              user.sick_leave = user.sick_leave + element.leaveDays;
            }
            if (element.leaveDayType === "vacation_leave") {
              user.vacation_leave = user.vacation_leave + element.leaveDays;
            }
            if (element.leaveDayType === "personal_leave") {
              user.persanal_leave = user.persanal_leave + element.leaveDays;
            }
            user.total_leave =
              user.sick_leave + user.persanal_leave + user.vacation_leave;
          });

          return user;
        });
      }

      return result;
    },

    async sum(ctx) {
      const data = {
        leaveDays: 0,
      };
      const { userId, leaveDayType } = ctx.query;

      const user = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: { id: userId },
        });

      if (!user) {
        throw new ValidationError("userId must be defined.");
      }

      if (
        !leaveDayType ||
        (leaveDayType !== "sick_leave" &&
          leaveDayType !== "vacation_leave" &&
          leaveDayType !== "personal_leave")
      ) {
        throw new ValidationError("leaveDayType is incorrect.");
      }

      const leaves = await strapi.db
        .query("api::leave-detail.leave-detail")
        .findMany({
          where: {
            user: userId,
            status: "approve",
            leaveDayType: leaveDayType,
            endDate: {
              $lte: new Date().getFullYear() + "-12-31",
            },
          },
        });

      if (!!leaves && leaves.length > 0) {
        for (const item of leaves) {
          data.leaveDays = data.leaveDays + item.leaveDays;
        }
      }

      return { data: data };
    },
    async create(ctx) {
      const { title, description, startDate, endDate, leaveDayType, userId } =
        ctx.request.body.data;

      const user = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: { id: userId },
        });

      if (!user) {
        throw new ValidationError("userId must be defined.");
      }

      const result = await super.create(ctx);

      if (!!result && result?.data) {
        await strapi.db.query("api::leave-detail.leave-detail").update({
          where: { id: result.data.id },
          data: { user: userId },
        });
      }

      return result;
    },
  })
);
