"use strict";

/**
 *  leave-detail controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::leave-detail.leave-detail",
  ({ strapi }) => ({
    // async create(ctx) {
    //   const { title, description, startDate, endDate, leaveDayType, idUser } =
    //     ctx.request.body;
    //   const response = await strapi.db
    //     .query("api::leave-detail.leave-detail")
    //     .create({
    //       data: {
    //         title: title,
    //         description: description,
    //         startDate: startDate,
    //         endDate: endDate,
    //         leaveDayType: leaveDayType,
    //         user: idUser,
    //         publishedAt: new Date
    //       },
    //     });
    //   return response;
    // },
  })
);
