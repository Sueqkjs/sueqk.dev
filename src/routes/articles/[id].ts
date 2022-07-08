import client from "$lib/client";

export async function get({ params }: {params: Record<string, string>}): Promise<Object> {
  const article = await client
    .get({
      contentId: params.id
    })
    .catch(console.error);

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