export default () => ({
  port: parseInt(process.env.PORT, 10) || 9000,
  session_secret: process.env.SESSION_SECRET,
});
