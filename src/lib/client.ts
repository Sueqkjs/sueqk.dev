import { MICROCMS_API_KEY, DOMAIN } from "$lib/constants";

export default (function () {
  return {
    get: async ({ endpoint, contentId }: { endpoint: string; contentId?: string }) => {
      return await fetch(
        `https://${DOMAIN}.microcms.io/api/v1/${endpoint}${contentId ? "/" + contentId : ""}`,
        {
          headers: {
            "X-MICROCMS-API-KEY": MICROCMS_API_KEY
          }
        }
      )
        .then(async (r) => await r.json())
        .catch(console.error);
    }
  };
})();
//curl "https://sueqk.microcms.io/api/v1/articles" -H "X-MICROCMS-API-KEY: 68f27ecd0fda4eb2b2a0e16f53f6d81f30de"
