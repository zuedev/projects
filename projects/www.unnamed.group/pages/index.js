import Head from "next/head";
import Image from "next/image";
import "@fortawesome/fontawesome-free/js/all.js";

export default function index() {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>unnamed.group</title>
        <meta property="og:site_name" content="unnamed.group" />
        <meta property="og:title" content="Unnamed Group" />
        <meta property="og:description" content="Make memes, not war" />
        <meta property="og:image" content="/preview.png" />
        <meta property="twitter:image" content="/img/preview.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/img/uglogow.png" />
        <link rel="stylesheet" href="/css/index.css" />
      </Head>
      <div id="parent">
        <main>
          <Image
            id="logo"
            src="/img/uglogow-bs4px_blink_invert.gif"
            width={64}
            height={64}
          />
          <br />
          <h1>Unnamed Group</h1>
          <h4>Make memes, not war</h4>
          <br />
          <div id="socialLinks">
            <a
              href="https://discord.gg/APhVPtXJu7"
              target="_blank"
              style={{ color: "#738adb" }}
            >
              <i className="fab fa-discord"></i>
            </a>
            <a
              href="https://twitter.com/UnnamedDotGroup"
              target="_blank"
              style={{ color: "#1da1f2" }}
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.twitch.tv/uagpmc"
              target="_blank"
              style={{ color: "#9147fe" }}
            >
              <i className="fab fa-twitch"></i>
            </a>
            <a
              href="https://github.com/unnamedgroup"
              target="_blank"
              style={{ color: "#333" }}
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </main>
        <footer>2016 - 2021</footer>
      </div>
    </div>
  );
}
