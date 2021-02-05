$(document).ready(() => {
  console.log("WAJS_LanguageTranslator Initialising...");

  const state = {
    tagsArr: document.getElementsByTagName("h3")
  };

  (() => {
    for (let index = 0; index < state.tagsArr.length; index++) {
      const element = state.tagsArr[index];

      if (element.textContent == "Dictionary") {
        state.targetPos = element.parentNode.parentNode.parentNode; // 🤢
      }
    }

    state.targetPos.prepend(createTranslator());
  })();

  function createTranslator() {
    let rootDiv = document.createElement("div"),
      inputBox = document.createElement("input"),
      resultArea = document.createElement("span");

    inputBox.addEventListener("change", event => {
      let translationData = [],
        words = event.target.value.split(" ");

      words.forEach(element => {
        translationData.push(getWord(element));
      });

      resultArea.innerHTML = "";

      translationData.forEach(element => {
        if (element) {
          if (element.guess) {
            resultArea.innerHTML +=
              "<span style='color: blue;' title='" +
              element.guess +
              "'>" +
              element.word +
              "</span>";
          } else {
            resultArea.innerHTML += element.word;
          }
          resultArea.innerHTML += " ";
        } else {
          resultArea.innerHTML +=
            "<span style='color:red;'>UNKNOWN</span>" + " ";
        }
      });
    });

    rootDiv.appendChild(inputBox);

    resultArea.setAttribute("style", `display: block;`);

    rootDiv.appendChild(resultArea);

    return rootDiv;
  }

  function getDictionaryID() {
    return $(".dictionary-search")
      .attr("data-url")
      .match(new RegExp("dictionary/" + "(.*)" + "/search"))[1];
  }

  function getWord(word) {
    const x = $.ajax({
      url: "/dictionary/" + getDictionaryID() + "/search?term=" + word,
      type: "GET",
      dataType: "json",
      async: false
    }).responseJSON.html;

    let translationData = {};

    try {
      translationData = {
        word: x
          .match(
            new RegExp(
              '<div class="dictionary-word-title"><strong>' +
                "(.*)" +
                "</strong>"
            )
          )[1]
          .trim(),
        // ipa: x
        //   .match(
        //     new RegExp(
        //       '<span class="dictionary-word-pronunciation">' +
        //         "(.*)" +
        //         "</span>"
        //     )
        //   )[1]
        //   .trim(),
        original: x
          .match(
            new RegExp(
              '<span class="dictionary-word-translation">' + "(.*)" + "</span>"
            )
          )[1]
          .trim()
      };

      if (translationData.original.toLowerCase() != word.toLowerCase()) {
        translationData = false;
        translationData.guess = false;
      }
    } catch (error) {
      let estimate = estimateWord(word);

      if (estimate) {
        translationData = getWord(estimate.word);
        translationData.guess = estimate.certainty;
      } else {
        translationData = false;
      }
    }

    return translationData;
  }

  function estimateWord(word) {
    let result;

    try {
      const wordBank = $.ajax({
        url: "/dictionary/" + getDictionaryID() + "/load",
        type: "GET",
        dataType: "json",
        async: false
      }).responseJSON.html;

      let crawlerData = {
        words: {
          original: []
        }
      };

      wordBank
        .match(
          new RegExp(
            '<span class="dictionary-word-translation">' + "(.*)" + "</span>",
            "g"
          )
        )
        .forEach((element, index) => {
          crawlerData.words.original[index] = element
            .match(
              new RegExp(
                '<span class="dictionary-word-translation">' +
                  "(.*)" +
                  "</span>"
              )
            )[1]
            .replace(/ *\([^)]*\) */g, "")
            .trim();
        });

      let levArr = [];
      crawlerData.words.original.forEach(element => {
        let distance = levenshteinDistance(word, element),
          certainty;

        if (distance === 0) {
          certainty = "99%!";
        } else if (distance === 1) {
          certainty = "very certain";
        } else if (distance === 2) {
          certainty = "quite sure";
        } else if (distance > 2) {
          certainty = "unsure";
        }

        levArr.push({
          distance: distance,
          word: element,
          certainty: certainty
        });
      });
      levArr.sort((a, b) => {
        return a.distance - b.distance;
      });

      if (levArr.length === 0 || levArr[0].distance > 3) {
        result = false;
      } else {
        result = levArr[0]; // TODO: multiple suggested words?
      }
    } catch (error) {
      result = false;
    }

    return result;
  }

  function levenshteinDistance(a, b) {
    if (a.length == 0) return b.length;
    if (b.length == 0) return a.length;

    let matrix = [],
      i,
      j;

    for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) == a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  console.log("WAJS_LanguageTranslator Done!");
});
