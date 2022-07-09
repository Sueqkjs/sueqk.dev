import client from "$lib/client";

export async function get() {
  let urls = [
    {
      loc: "https://sueqk.dev/",
      lastmod: "2022-07-09",
      priority: 1.0,
      changefreq: "monthly"
    },
    {
      loc: "https://sueqk.dev/about",
      lastmod: "2022-07-09",
      priority: 0.8,
      changefreq: "monthly"
    },
    {
      loc: "https://sueqk.dev/articles",
      lastmod: "2022-07-09",
      priority: 0.8,
      changefreq: "monthly"
    }
  ];

  const articles = await client.get({}).catch(console.error);
  if (articles) {
    for (let article of articles.contents) {
      const date = new Date(article.updatedAt);
      urls.push({
        loc: "https://sueqk.dev/articles/" + article.id,
        lastmod: [date.getFullYear(), date.getMonth(), date.getDay()].join("-"),
        priority: 0.6,
        changefreq: "Monthly"
      });
    }
  }

  let child = "";
  for (let url of urls) {
    let u = "";
    for (let [k, v] of Object.entries(url)) {
      u += `<${k}>${v}</${k}>`;
    }
    child += `<url>${u}</url>`;
  }

  return {
    status: 200,
    body: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${child}</urlset>`,
    headers: {
      "Content-type": "application/xml"
    }
  };
}
