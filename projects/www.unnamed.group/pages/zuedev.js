import Head from "next/head";

export default function index() {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>zue.dev | Putting OSS to work</title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
          integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/js/all.min.js"
          integrity="sha256-HkXXtFRaflZ7gjmpjGQBENGnq8NIno4SDNq/3DbkMgo="
          crossOrigin="anonymous"
        ></script>
        <link rel="stylesheet" href="/css/zuedev.css" />
      </Head>
      <div id="parent">
        <div id="headerPattern"></div>
        <div className="container-fluid">
          <div className="row">
            <h1>
              zue.dev
              <small className="text-muted">Putting OSS to work</small>
            </h1>
          </div>
          <div id="projects" className="row">
            <h2>Projects:</h2>
            <div>
              <ul>
                <li>
                  <a
                    href="https://unnamed.group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>Unnamed Group:</b> An open-source gaming community. Make
                    memes, not war.
                  </a>
                </li>
                <li>
                  <a
                    href="https://unnamed.group/bbg/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>Blue Bean Games:</b> Just some beans making games for
                    fun.
                  </a>
                </li>
                <li>
                  <a
                    href="https://zuedev.gitlab.io/classNameless/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>classNameless:</b> A classNameless CSS framework
                  </a>
                </li>
                <li>
                  <a
                    href="https://eldragiir.guide/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>Eldragiir Guide:</b> Fantasy worldbuilding project
                  </a>
                </li>
                <li>
                  <a
                    href="https://paradise.directory/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>Paradise Directory:</b> Sci-fi worldbuilding project
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/package/discordjs-reactroles"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>DiscordJS ReactRoles:</b> An easy and simple
                    implementation of 'React Roles' using Discord.js
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/package/discordjs-karmasystem"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>DiscordJS Karma System:</b> An easy and simple
                    implementation of a typical 'Karma' system using Discord.js
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/PREVAC/www.coronavirus-toolkit.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>Coronavirus Toolkit:</b> Evidence-based toolkit for
                    communities to combat COVID-19
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
        integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}
