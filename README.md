# solid-router 2.0.1: link state is wrong with `hashHistory()`

A minimal reproduction for a bug report to [solidjs/solid-router](https://github.com/solidjs/solid-router).

With `createRouter({ history: hashHistory() })`, the router's automatic link state (`aria-current="page"` and `data-active` on plain `<a>` elements) is wrong:

- On `/#/`, **both** links are marked.
- On `/#/applications`, **neither** link is marked.

Navigation itself works. The same app with `browserHistory()` is correct.

## Run

```sh
npm install
npm run dev           # hash history: open http://localhost:5199/#/
npm run dev:browser   # browser history, for comparison: open http://localhost:5199/
```

Yellow background = `aria-current="page"`. Green outline = `data-active`.

## What the page shows

- The history mode and the router's `location.pathname`.
- Two links, `href={paths()}` and `href={paths.applications}`. In hash mode they render as `#/` and `#/applications`.
- Three `useLinkState` readouts. With `paths` nodes the values are correct. With the plain string `"#/applications"` they are inverted. In browser mode the string readout is an in-page anchor; ignore it there.

The app code is all in [`src/main.jsx`](src/main.jsx).

## Versions

`@solidjs/router` 2.0.1, `solid-js` 2.0.3, `@solidjs/web` 2.0.3, `@solidjs/vite-plugin` 3.0.1, `vite` 8.3.8 (pinned in `package.json` and `package-lock.json`).
