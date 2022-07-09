import client from "$lib/client";

export async function get() {
  let parser = new DOMParser();
  let ser = new XMLSerializer();

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
  const xml = parser.parseFromString(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
    "application/xml"
  );
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

  for (let url of urls) {
    const child = xml.createElement("url");
    const fragment = xml.createDocumentFragment();
    for(let [k, v] of Object.entries(url)) {
      const el = xml.createElement(k);
      el.innerText = v.toString();
      fragment.appendChild(el);
    }
    child.appendChild(fragment);
    xml.getElementsByTagName("urlset").item(0)!.appendChild(child);
  }

  return {
    status: 200,
    body: ser.serializeToString(xml),
    headers: {
      "Content-type": "application/xml"
    }
  }
}
