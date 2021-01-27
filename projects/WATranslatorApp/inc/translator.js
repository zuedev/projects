const state = {
  params: {
    article: '<?= (string) $state["params"]["article"] ;?>',
    input: '<?= (string) $state["params"]["input"] ;?>'
  }
};

document.addEventListener("DOMContentLoaded", readyHandler());

function readyHandler() {
  state.dictionary = getDictionary();

  translationHandler();
}

function translationHandler(outputElement) {
  if (state.params.input.length > 0) {
    let outputElement = document.getElementById("output"),
      translationData = [];

    state.params.input
      .replace(/[^a-zA-Z ]/g, "")
      .split(" ")
      .forEach(element => {
        console.log(element);

        let translation = state.dictionary[element],
          result;
        if (translation !== undefined) {
          result = "<span title='exact match!'>" + translation + "</span>";
        } else {
          result = handleTranslationError(element);
        }
        translationData.push(result);
      });

    let outputHTML = translationData.join(" ");

    outputElement.innerHTML = outputHTML;
  }
}

function getDictionary() {
  if (localStorage.getItem("cachedDictionary")) {
    return JSON.parse(localStorage.getItem("cachedDictionary"));
  }

  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "/?load" + "&article=" + state.params.article, false);
  xmlhttp.send();

  let dictionary = xmlhttp.response;

  localStorage.setItem("cachedDictionary", dictionary);

  return JSON.parse(dictionary);
}

function handleTranslationError(failedTranslation) {
  let attempt =
      fuzzyTranslate(failedTranslation) || "<span title='unknown'>?????</span>",
    result;

  switch (attempt.type) {
    case "fuzzy":
      result =
        "<u title='" + attempt["certainty"] + "'>" + attempt["word"] + "</u>";
      break;

    default:
      result = attempt;
      break;
  }

  return result;
}

function fuzzyTranslate(needle) {
  let result,
    x = [],
    keys = Object.keys(state.dictionary);

  keys.forEach(element => {
    let distance = levenshteinDistance(needle, element),
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

    x.push({
      distance: distance,
      word: state.dictionary[element],
      certainty: certainty + " (" + element + ")"
    });
  });

  x.sort((a, b) => {
    return a.distance - b.distance;
  });

  if (x.length === 0 || x[0].distance > 2) {
    result = false;
  } else {
    result = x[0]; // TODO: multiple suggested words?
    result.type = "fuzzy";
  }

  return result;
}

/**
 * Calculates the Levenstein Distance (LD) between two given words
 * @param {string} a
 * @param {string} b
 * @returns {number} The LD of a and b as an integer
 */
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
