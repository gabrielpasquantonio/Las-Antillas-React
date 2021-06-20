  module.exports = {
    development: {
      username: "root",
      //password: 'admin',
      password: null,
      database: "lasantillas3",
      host: "localhost",
      dialect: "mysql",
      port: 3306,
      logging: false
    },
    test: {
      username: "root",
      password: null,
      database: "database_test",
      host: "localhost",
      dialect: "mysql",
    },
    production: {
      username: "root",
      password: null,
      database: "database_production",
      host: "localhost",
      dialect: "mysql",
    },
  };
