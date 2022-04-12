module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'dc1fb19e40e53143fc2d001ae9e46301'),
  },
});
