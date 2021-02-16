$(document).ready(() => {
  console.log("WAJS_WARouter Initialising...");

  const WAJS_WARouter = {
    settings: {
      worldSlug: "my-world" // <--- CHANGE THIS TO YOUR WORLD SLUG!
    },
    /**
     * Constructs WorldAnvil final URL based on a page string provided
     * @param {string} page
     * @returns {string} String is final WorldAnvil path
     */
    getUrl: page => {
      let _x = page || "",
        _y = "";

      if (_x !== "") {
        _y += "/a/" + _x;
      }

      return "/w/" + WAJS_WARouter.settings.worldSlug + _y;
    }
  };

  switch (window.location.pathname) {
    case WAJS_WARouter.getUrl():
      // Home page JS
      break;
    case WAJS_WARouter.getUrl("some-article"):
      // "some-article" page JS
      break;
    default:
      // Unknown page JS
      break;
  }

  console.log("WAJS_WARouter Done!");
});
