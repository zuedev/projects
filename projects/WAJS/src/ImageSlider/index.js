$(document).ready(() => {
  console.log("WAJS_ImageSlider Initialising...");

  const slider = {
    images: [
      "https://i.imgur.com/PnBUQYp.jpg",
      "https://i.imgur.com/VQoZtY9.jpg"
    ],
    speed: 1000,
    position: {
      tag: "h2",
      text: "Purpose",
      offset: 0 // can be -1 for "just before" target in childNode tree
    },
    style: {
      maxHeight: "512px"
    }
  };

  document.slideNum = 0;

  (() => {
    init();
  })();

  function slide() {
    let i;
    let x = document.getElementsByClassName("slideImages");
    for (let i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.slideNum++;
    if (document.slideNum > x.length) {
      document.slideNum = 1;
    }
    x[document.slideNum - 1].style.display = "block";
    setTimeout(slide, slider.speed);
  }

  function init() {
    let target = (node = selectPosition()),
      final = document.createElement("div");

    createSliderImages().forEach(element => {
      final.appendChild(element);
    });

    for (var targetNodePos = 0; (node = node.previousSibling); targetNodePos++); // I love this

    target.parentNode.insertBefore(
      final,
      target.parentNode.childNodes[targetNodePos + slider.position.offset + 1]
    );

    slide();
  }

  function createSliderImages() {
    let sliderEl = [];

    slider.images.forEach(element => {
      let html = document.createElement("img");

      html.src = element;
      html.className = "slideImages";

      html.setAttribute(
        "style",
        `
           max-height: ` + slider.style.maxHeight
      );

      sliderEl.push(html);
    });

    return sliderEl;
  }

  function selectPosition() {
    const tag = slider.position.tag,
      text = slider.position.text,
      offset = slider.position.offset;

    let searchResults = document.getElementsByTagName(tag);

    for (let i = 0; i < searchResults.length; i++) {
      const element = searchResults[i];

      if (element.textContent === text) {
        return element;
      }
    }
  }

  console.log("WAJS_ImageSlider Done!");
});
