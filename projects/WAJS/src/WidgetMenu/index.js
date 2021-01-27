$(document).ready(() => {
  console.log("WAJS_WidgetMenu Initialising...");

  const widgetContents = [
    {
      name: "option1",
      onclick: () => {
        console.log("option1 clicked!");
      }
    },
    {
      name: "option2",
      onclick: () => {
        console.log("option2 clicked!");
      }
    }
  ];

  (() => {
    let widgetDiv = document.createElement("div");

    for (let index = 0; index < 3; index++) {
      let widgetBurgerBar = widgetDiv.appendChild(
        document.createElement("div")
      );
      widgetBurgerBar.setAttribute(
        "style",
        `
            width: 3rem;
            height: 0.5rem;
            background-color: black;
            margin: 0.5rem;
            transition: 0.4s;
            margin-left: auto;
        `
      );
    }

    widgetDiv.setAttribute(
      "style",
      `
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        background: white;
        padding: 1rem;
      `
    );

    widgetDiv.addEventListener("click", () => {
      widgetDiv.classList.toggle("clicked");

      // TODO: transforms need work (units & positioning)
      if (widgetDiv.classList.contains("clicked")) {
        doAnimate(widgetDiv, true);

        widgetContents.forEach(element => {
          let elementFinal = widgetDiv.insertBefore(
            document.createElement("span"),
            widgetDiv.firstChild
          );
          elementFinal.innerHTML = element.name;
          elementFinal.setAttribute(
            "style",
            `
                display: block;
                padding: 1rem;
                font-size: large;
                font-weight: bold;
            `
          );
          // TODO: dynamic event assignment, not just "onclick"
          elementFinal.addEventListener("click", element.onclick);
        });
      } else {
        doAnimate(widgetDiv, false);

        for (let index = 0; index <= widgetDiv.childNodes.length; index++) {
          const element = widgetDiv.firstChild;
          try {
            if (element.localName === "span") {
              element.remove();
            }
          } catch (error) {} // TODO: in-line array manip issue
        }
      }
    });

    function doAnimate(element, toggle) {
      let divCollector = [];

      element.childNodes.forEach(el2 => {
        if (el2.localName === "div") {
          divCollector.push(el2);
        }
      });

      if (toggle) {
        divCollector[0].style.transform = "rotate(-45deg) translate(-9px, 6px)";
        divCollector[1].style.opacity = "0";
        divCollector[2].style.transform = "rotate(45deg) translate(-9px, -6px)";
      } else {
        divCollector[0].style.transform = "rotate(0deg) translate(0px, 0px)";
        divCollector[1].style.opacity = "1";
        divCollector[2].style.transform = "rotate(0deg) translate(0px, 0px)";
      }
    }

    document.body.appendChild(widgetDiv);
  })();

  console.log("WAJS_WidgetMenu Done!");
});
