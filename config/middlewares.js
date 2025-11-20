module.exports = [
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  {
    name: "strapi::favicon",
    config: {
      path: "./favicon.ico",
    },
  },
  "strapi::public",
];


