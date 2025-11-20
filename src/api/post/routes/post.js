module.exports = {
  routes: [
    {
      method: "GET",
      path: "/posts",
      handler: "post.customFind",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/posts/:slug",
      handler: "post.findBySlug",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/posts",
      handler: "post.customCreate",
      config: {
        policies: ["global::is-admin"],
        middlewares: [],
      },
    },
  ],
};


