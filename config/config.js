// config.js

export default {
    development: {
      username: "mobilcvc_cv",
      password: "nILiq,)jeE4{",
      database: "mobilcvc_cv",
      host: "141.95.3.62",
      dialect: "mysql",
      use_env_variable: "DATABASE_URL"
    },
    test: {
      username: "root",
      password: null,
      database: "database_test",
      host: "127.0.0.1",
      dialect: "mysql",
      use_env_variable: "DATABASE_URL"
    },
    production: {
      username: "root",
      password: null,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "mysql",
      use_env_variable: "DATABASE_URL"
    }
  };
  