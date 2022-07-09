export default (function () {
  return {
    get: async ({ contentId }: { contentId?: string }) => {
      return await fetch(`https://sueqk.dev/api/articles/${!!contentId ? contentId : "LIST"}`)
        .then(async (r) => await r.json())
        .catch((e) => e.message);
    }
  };
})();
