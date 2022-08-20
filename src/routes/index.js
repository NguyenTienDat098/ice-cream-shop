const siteRouter = require('./site');
const authRouter = require('./auth');
function routes(app) {
  app.use('/auth', authRouter);
  app.use('/', siteRouter);
}
module.exports = routes;
