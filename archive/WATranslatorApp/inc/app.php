<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>WATranslatorApp</title>
    <link rel="stylesheet" href="https://unpkg.com/awsm.css/dist/awsm_theme_big-stone.min.css">
</head>

<body>
    <main>
        <article>
            <section>
                <form action="" method="get">
                    <fieldset>
                        <legend>Setup</legend>
                        <label for="article">Article Link:</label>
                        <input type="text" name="article" value="<?= $state["params"]["article"]; ?>">
                        <a href="/" style="display: none" id="resetButton"><button type="button">Reset</button></a>
                    </fieldset>
                    <?php if ($state["params"]["article"] !== null) { ?>
                        <br />
                        <fieldset>
                            <legend>Translator</legend>
                            <label for="article">Input:</label>
                            <input type="text" name="input" value="<?= $state["params"]["input"]; ?>">
                            <label for="output">Output:</label>
                            <span id="output"><?= (isset($output)) ? $output : "Waiting for input..."; ?></span>
                        </fieldset>
                        <script>
                            <?php require("translator.js"); ?>
                            document.getElementById("resetButton").style.display = "block";
                        </script>
                    <?php } else { ?>
                        <script>
                            if (localStorage.getItem("cachedDictionary")) {
                                localStorage.removeItem("cachedDictionary");
                            }
                        </script>
                    <?php } ?>
                    <input type="submit" style="display: none;">
                </form>
            </section>
        </article>
    </main>
</body>

</html>