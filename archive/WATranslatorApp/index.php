<?php

$state = [
    "params" => [
        "article" => null,
        "input" => null
    ]
];

foreach ($state["params"] as $key => $value) {
    if (isset($_GET[$key])) {
        $x = (string) $_GET[$key];
        if ($x != "") {
            $state["params"][$key] = $x;
        }
    }
}

if (isset($_GET["load"])) {
    //TODO: usage of preg_match* functions dangerous with volatile user data, use sanitized inputs in produciton!
    if ($state["params"]["article"] !== null) {
        $articleContent = file_get_contents($state["params"]["article"]);

        preg_match('/dictionary\/(.*)\/search/', $articleContent, $x);
        $dictionaryId = $x[1];

        $x = json_decode(file_get_contents("https://www.worldanvil.com/dictionary/" . $dictionaryId . "/load"), true)["html"];

        preg_match_all('/dictionary-word-translation\\">(.*?)<\\/span>/', $x, $before);
        preg_match_all('/dictionary-word-title\\"><strong>(.*?)<\\/strong>/', $x, $after);

        if (count($before[1]) !== count($after[1])) {
            echo "Error 5001: Dictionary count mismatch.";
        }

        $response = [];
        for ($i = 0; $i < count($before[1]); $i++) {
            $response[$before[1][$i]] = $after[1][$i];
        }
        echo json_encode($response);
    }
    exit;
}

require("inc/app.php");
