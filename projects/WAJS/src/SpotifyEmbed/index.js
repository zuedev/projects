$(document).ready(() => {
  console.log("WAJS_SpotifyEmbed Initialising...");

  const settings = {
    embedSrc: "https://open.spotify.com/embed/track/3E9Wv5hNRwedUjPkkplcx4"
  };

  (() => {
    let iframe = document.createElement("iframe");

    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowtransparency", "true");
    iframe.allow = "encrypted-media";
    iframe.setAttribute(
      "style",
      `
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          background: none;
          height: 80px;
          z-index: 999;
      `
    );
    iframe.src = settings.embedSrc;

    document.body.appendChild(iframe);
  })();

  console.log("WAJS_SpotifyEmbed Done!");
});
