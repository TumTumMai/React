const { PolicyError, ValidationError } = require("@strapi/utils").errors;
const moment = require("moment");

module.exports = {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    if (!data.user) {
      console.log("aaaa");
      throw new ValidationError("user is empty");
    }
  },
  beforeUpdate(event) {
    const { data, where, select, populate } = event.params;
    // console.log(where.id);
    //   if(!!data?.user ){

    //   }
    if (data.user === null) {
      //   console.log("aaaa");
      throw new ValidationError("user is empty");
    }
  },
};
