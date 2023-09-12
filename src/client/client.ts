/// <reference lib="dom" />

window.onload = () => {
  if (
    (window as unknown as any).htmx &&
    (window as unknown as any).htmx.config
  ) {
    (window as unknown as any).htmx.config.globalViewTransitions = true;
  }
  console.log("The Page loaded. And this is client-side javascript!");
  //Please dont get carried away with client-side js. Remember the state is supposed to be coming from the server/html.

  document.body.addEventListener("htmx:beforeSwap", function (evt: any) {
    if (!evt.detail)
      if (evt.detail.xhr.status >= 401 && evt.detail.xhr.status <= 599) {
        evt.detail.shouldSwap = true;
        evt.detail.isError = true;
      }
  });
};
