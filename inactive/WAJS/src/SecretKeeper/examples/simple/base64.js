$(document).ready(() => {
  console.log("WAJS_SecretKeeper Initialising...");

  const target = {
    tag: "h2",
    text: "Purpose"
  };

  (() => {
    let y = getTargetNode(target);

    y.innerHTML = btoa(y.innerHTML);
    y.style.overflowWrap = "break-word";
  })();

  function getTargetNode(params) {
    let allTagsArr = document.getElementsByTagName(params.tag),
      x;

    for (let index = 0; index < allTagsArr.length; index++) {
      const element = allTagsArr[index];

      if (element.textContent == params.text) {
        x = element;
      }
    }

    return x.nextElementSibling;
  }

  console.log("WAJS_SecretKeeper Done!");
});
