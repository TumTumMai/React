module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "1d",
      },
    },
  },
  // Leave report page;
  "leavereport-plugin": {
    enabled: true,
    resolve: "./src/plugins/leavereport",
  },
  "test-plugin": {
    enabled: true,
    resolve: "./src/plugins/my-plugin",
  },

});
