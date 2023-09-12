import Html, { Children } from "@kitajs/html";

export const BaseHtml = (props: { title?: string; children: Children }) => {
  return (
    <>
      <DocTypeHTML />
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{props.title ?? "undefined"}</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Arvo&family=Noto+Sans&family=Ubuntu+Mono&display=swap"
            rel="stylesheet"
          />
          <script rel="text/javascript" src="/bundle.js" />
          <script src="https://unpkg.com/htmx.org@1.9.3" />
          <script src="https://unpkg.com/hyperscript.org@0.9.9" />
          <link href="/styles.css" rel="stylesheet" />
        </head>
        {props.children}
      </html>
    </>
  );
};

const DocTypeHTML = () => {
  return `<!DOCTYPE html>`;
};
