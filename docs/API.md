# Strapi Blog API

## REST Endpoints

- `GET /api/posts` – list all posts (includes author, cover, categories, tags)
- `GET /api/posts/:slug` – get single post by slug
- `POST /api/posts` – create a post (requires authenticated Admin user)
- `GET /api/categories` – list categories
- `GET /api/tags` – list tags
- `GET /api/authors` – list authors

> All endpoints accept standard Strapi query params like `pagination[start]`, `pagination[limit]`, `filters[...]`, and `sort`.

## Example Requests

### Fetch All Posts (curl)

```bash
curl "$STRAPI_URL/api/posts?populate=cover,author,categories,tags"
```

### Fetch Single Post by Slug (curl)

```bash
curl "$STRAPI_URL/api/posts/my-slug"
```

### Create Post (curl)

```bash
curl -X POST "$STRAPI_URL/api/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{
    "data": {
      "title": "New Post Title",
      "excerpt": "Short summary",
      "content": "<p>Rich text content</p>",
      "author": 1,
      "categories": [1],
      "tags": [1]
    }
  }'
```

### Fetch Posts (fetch API)

```js
const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?populate=cover,author,categories,tags`, {
  headers: { "Content-Type": "application/json" },
});
const json = await res.json();
```

### Create Post (fetch API)

```js
await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
  },
  body: JSON.stringify({
    data: {
      title: "Headless CMS with Strapi",
      excerpt: "Production-ready headless CMS setup",
      content: "<p>Full article body...</p>",
      author: 1,
      categories: [1],
      tags: [1],
    },
  }),
});
```


