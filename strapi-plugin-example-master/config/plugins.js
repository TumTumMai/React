module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "1d",
      },
    },
  },
  // Leave report page;
  "my-plugin": {
    enabled: true,
    resolve: "./src/plugins/leavereport",
  },
  // provider for development
  // upload: {
  //   config: {
  //     provider: "development",
  //     providerOptions: {
  //       urlHostName: env("HOST_NAME"),
  //     },
  //   },
  // },
});
