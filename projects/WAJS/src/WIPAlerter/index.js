$(document).ready(() => {
  console.log("WAJS_WIPAlerter Initialising...");

  (() => {
    if (document.getElementsByClassName("badge-wip").length > 0) {
      let div = document.createElement("div");

      div.innerHTML =
        "<strong>Hey!</strong> This article is a work in progress, so please be gentle. &#128534;";
      div.setAttribute(
        "style",
        `
            padding: 20px;
            background-color: darkorange;
            color: black;
            text-align: center;
        `
      );

      document.body.prepend(div);
    }
  })();

  console.log("WAJS_WIPAlerter Done!");
});
