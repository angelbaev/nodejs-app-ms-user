module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'dev',
  clusterOptimization: false,
  dbPath: __dirname + '/../db/ms_user.db', //':memory:'
};