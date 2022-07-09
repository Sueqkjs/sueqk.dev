export default (function () {
  return {
    get: async ({ contentId }: { contentId?: string }) => {
      return await fetch(`api/articles/${"/" + !!contentId ? contentId : "LIST"}`)
        .then(async (r) => await r.json())
        .catch(console.error);
    }
  };
})();
