import client from "$lib/client";

export async function get({ params }: {params: Record<string, string>}): Promise<Object> {
  const article = await client
    .get({
      endpoint: "articles",
      contentId: params.id
    })
    .catch(console.error);
  console.log(article);
  if (article)
    return {
      body: {
        article
      }
    };

  return {
    status: 404
  };
}