/* Seed script to create initial Author, Category, Tag, and Posts */

require("dotenv").config();

const strapiFactory = require("@strapi/strapi");

async function seed() {
  const app = await strapiFactory().load();

  try {
    const existingPosts = await app.entityService.count("api::post.post");
    if (existingPosts > 0) {
      console.log("Seed data already exists, skipping.");
      await app.destroy();
      process.exit(0);
    }

    console.log("Seeding Strapi Blog data...");

    const author = await app.entityService.create("api::author.author", {
      data: {
        name: "Naman Sharma",
        bio: "Full-stack developer and tech writer, sharing insights on JavaScript, Node.js, and modern web development.",
      },
    });

    const category = await app.entityService.create("api::category.category", {
      data: {
        name: "Web Development",
      },
    });

    const tag = await app.entityService.create("api::tag.tag", {
      data: {
        name: "JavaScript",
      },
    });

    const now = new Date();

    const post1 = await app.entityService.create("api::post.post", {
      data: {
        title: "Getting Started with Strapi and Next.js",
        excerpt:
          "Learn how to build a modern, production-ready blog using Strapi as a headless CMS and Next.js as the frontend.",
        content:
          "<p>Strapi and Next.js are a powerful combination for building fast, SEO-friendly blogs and content-driven applications.</p><p>In this guide, we will walk through setting up Strapi as a headless CMS, defining content types, and consuming the API from a Next.js frontend.</p>",
        publishedAt: now,
        author: author.id,
        categories: [category.id],
        tags: [tag.id],
      },
    });

    const post2 = await app.entityService.create("api::post.post", {
      data: {
        title: "Modern Frontend Architecture with App Router",
        excerpt:
          "A deep dive into building scalable frontend architectures using the Next.js App Router and server components.",
        content:
          "<p>The App Router in Next.js 14 unlocks powerful patterns for data fetching, layouts, and streaming.</p><p>We will explore how to structure your blog, handle SEO metadata, and integrate with a headless CMS like Strapi.</p>",
        publishedAt: now,
        author: author.id,
        categories: [category.id],
        tags: [tag.id],
      },
    });

    console.log("Seeded author:", author.id);
    console.log("Seeded category:", category.id);
    console.log("Seeded tag:", tag.id);
    console.log("Seeded posts:", post1.id, post2.id);
  } catch (error) {
    console.error("Error while seeding Strapi data:", error);
  }

  await app.destroy();
  process.exit(0);
}

seed();


