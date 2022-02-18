module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'dfd5b6e4cf90784f1aee89d0daa80348'),
  },
});
