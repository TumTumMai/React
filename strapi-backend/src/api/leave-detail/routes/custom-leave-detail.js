module.exports = {
  routes: [
    {
      method: "GET",
      path: "/leave-details/sum",
      handler: "leave-detail.sum",
    },
    {
      method: "GET",
      path: "/leave-details/allSum",
      handler: "leave-detail.allSum",
    },
  ],
};
