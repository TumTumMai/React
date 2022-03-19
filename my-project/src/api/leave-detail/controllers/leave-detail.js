"use strict";
const { ValidationError } = require("@strapi/utils").errors;
/**
 *  leave-detail controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::leave-detail.leave-detail",
  ({ strapi }) => ({
    async create(ctx) {
      const { title, description, startDate, endDate, leaveDayType, userId } =
        ctx.request.body.data;

      const user = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: { id: userId },
        });

      if (!user) {
        throw new ValidationError("userId title must be defined.");
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
