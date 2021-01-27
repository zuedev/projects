$(document).ready(() => {
  console.log("WAJS_SecretKeeper Initialising...");

  const target = {
    tag: "h2",
    text: "Purpose",
    puzzleWords: [
      "these",
      "words",
      "are",
      "just",
      "for",
      "demonstration",
      "purposes",
      "lemon",
      "beans"
    ]
  };

  const el = getTargetNode(target);

  (() => {
    localStorage.setItem("secret1", btoa(el.innerHTML));

    el.innerHTML = "";

    splash();
  })();

  function start() {
    el.innerHTML = "";

    let description = document.createElement("span"),
      timer = document.createElement("span"),
      puzzleContent = document.createElement("div");

    el.appendChild(description);
    el.appendChild(puzzleContent);
    el.appendChild(timer);

    description.setAttribute(
      "style",
      ` 
        font-size: large;
        color: blue;
        display: block;
        font-family: monospace;
        margin-bottom: 2rem;
      `
    );

    timer.setAttribute(
      "style",
      ` 
        font-size: xxx-large;
        color: red;
        display: block;
        font-family: monospace;
        font-weight: bold;
        margin-top: 2rem;
      `
    );

    typingText(
      description,
      "Click on each letter to make the password before the timer runs out!",
      15
    );

    puzzleLogic(puzzleContent, target.puzzleWords, 8);

    timerStart(timer, 300);
  }

  function puzzleLogic(el, words, difficulty) {
    let _word = words[Math.floor(Math.random() * words.length)],
      _bank = [];

    for (let j = 0; j < _word.length; j++) {
      let _c = el.appendChild(document.createElement("span")),
        _buf = "abcdefghijklmnopqrstuvwxyz".replace(_c, ""),
        _wrongArr = [];

      for (let k = 0; k < difficulty; k++) {
        _selectedLetter = _buf[Math.floor(Math.random() * _buf.length)];
        if (_wrongArr.includes(_selectedLetter)) {
          k--;
        } else {
          _wrongArr[k] = _selectedLetter;
        }
      }

      _z = [];
      _z.push(_word[j]);
      for (let index = 0; index < _wrongArr.length; index++) {
        const element = _wrongArr[index];
        _z.push(element);
      }
      _z.sort(() => Math.random() - 0.5);
      _z.unshift("-");

      _bank[j] = {
        correct: _word[j],
        wrong: _wrongArr,
        mixed: _z
      };

      _c.setAttribute(
        "style",
        `
            font-size: xxx-large;
            background: black;
            color: white;
            font-weight: bold;
            font-family: monospace;
            padding: 0.25rem;
            user-select: none;
        `
      );
    }

    for (let f = 0; f < _bank.length; f++) {
      let _z = _bank[f].mixed,
        _c = el.childNodes[f];
      _c.innerHTML = _z[0];
      _c.setAttribute("a", _z);
      _c.setAttribute("b", 0);
      _c.addEventListener("click", () => {
        _b = parseInt(_c.getAttribute("b"), 10);
        if (_b < _z.length - 1) {
          _c.setAttribute("b", _b + 1);
        } else {
          _c.setAttribute("b", 0);
        }
        _c.innerHTML = _z[_b];
        if (_c.innerHTML === _bank[f].correct) {
          _c.style.background = "green";
        } else {
          _c.style.background = "black";
        }
        let checkArr = [];
        el.childNodes.forEach(element => {
          if (element.style.background === "green") {
            checkArr.push(1);
          }
        });
        if (
          checkArr.length === _bank.length &&
          checkArr.every((val, i, arr) => val === arr[0])
        ) {
          el.parentNode.innerHTML = atob(localStorage.getItem("secret1")); //win
        }
      });
    }
  }

  function timerStart(el, time) {
    let _time = time;
    setInterval(() => {
      if (_time > 0) {
        el.innerHTML = _time;
        _time--;
      } else {
        el.innerHTML = "OUT";
      }
    }, 1000);
  }

  function splash() {
    let splash = document.createElement("div"),
      warning = document.createElement("span"),
      description = document.createElement("span"),
      injectionMsg = document.createElement("span"),
      button = document.createElement("button");

    splash.appendChild(warning);
    splash.appendChild(description);
    splash.appendChild(injectionMsg);
    splash.appendChild(button);

    el.appendChild(splash);

    warning.setAttribute(
      "style",
      `
          font-size: xxx-large;
          color: red;
          font-weight: bold;
          display: block;
          font-family: monospace;
      `
    );

    description.setAttribute(
      "style",
      `
          font-size: large;
          color: red;
          display: block;
          font-family: monospace;
      `
    );

    injectionMsg.setAttribute(
      "style",
      `
          font-size: x-large;
          color: blue;
          display: block;
          font-family: monospace;
      `
    );

    button.setAttribute(
      "style",
      `
        background: blue;
        border: none;
        font-size: x-large;
        color: white;
        font-weight: bold;
        display: none;
      `
    );

    typingText(warning, "WARNING!", 50);
    typingText(
      description,
      "Unauthorized access detected, locking system... FAILED",
      40
    );

    setTimeout(() => {
      typingText(
        injectionMsg,
        "Injecting rootkit into kernel services... SUCCESS",
        50
      );
    }, 2200);

    setTimeout(() => {
      button.style.display = "inherit";
      button.innerHTML = "BEGIN DECRYPTION PROCESS";
      button.addEventListener("click", start);
    }, 5000);
  }

  function typingText(el, text, speed) {
    let i = 0,
      arrS = text.split("");
    setInterval(() => {
      if (i < text.length) {
        el.innerHTML += text[i];
        i++;
      }
    }, speed);
  }

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
