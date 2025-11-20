"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  async customFind(ctx) {
    // GET /posts
    ctx.query = {
      ...ctx.query,
      populate: {
        cover: true,
        author: true,
        categories: true,
        tags: true,
      },
      sort: ctx.query.sort || "publishedAt:desc",
    };

    const { data, meta } = await super.find(ctx);
    ctx.body = { data, meta };
  },

  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.entityService.findMany("api::post.post", {
      filters: { slug },
      populate: {
        cover: true,
        author: true,
        categories: true,
        tags: true,
      },
      limit: 1,
    });

    if (!entity || !entity.length) {
      return ctx.notFound("Post not found");
    }

    ctx.body = { data: entity[0] };
  },

  async customCreate(ctx) {
    // POST /posts (admin only via policy)
    const response = await super.create(ctx);
    return response;
  },
}));


