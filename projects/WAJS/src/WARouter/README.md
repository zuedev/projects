# WorldAnvil Router

WARouter is an easy to use router for your JS snippets. Due to the centralised way that the custom JavaScript works at the time of writing, this router allows the user to quickly setup conditional JS execution based on the page that is loaded.

## How to use

Just copy-paste the contents of [index.js](index.js) into your custom JS field and replace the `worldSlug` string with your world's slug. You can find this on the homepage of your world, for example:

![](example.png?raw=true)

Then, just edit the script's `switch` cases to execute your code depending on the route! The `WAJS_WARouter.getUrl()` function defaults to the homepage URL and accepts article slugs as an argument. For example, if your article's final URL is "johnsmith-article" then you would use `WAJS_WARouter.getUrl("johnsmith-article")` as your case condition. Remember to include a `break;` at the end of your case!

## Future Plans

- [ ] One-function pattern
- [ ] Namespaceless
- [ ] Query parameter pass-through
