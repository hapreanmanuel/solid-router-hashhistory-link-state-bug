import { render } from "@solidjs/web";
import { createRouter, hashHistory, browserHistory, useLinkState, useLocation } from "@solidjs/router";

const mode = import.meta.env.VITE_HISTORY === "browser" ? "browser" : "hash";

const Router = createRouter({
  history: mode === "browser" ? browserHistory() : hashHistory(),
  routes: [
    { path: "/", component: () => <h1>Home page</h1> },
    { path: "/applications", component: () => <h1>Applications page</h1> },
  ],
});
const { paths } = Router;

function LinkStateReadout(props) {
  const s = useLinkState(() => props.href);
  return (
    <li>
      useLinkState({JSON.stringify(String(props.href))}): active={String(s.active())} current=
      {String(s.current())}
    </li>
  );
}

function Layout(props) {
  const location = useLocation();
  return (
    <>
      <p>
        history: <b>{mode}</b>, router location.pathname: <code>{location.pathname}</code>
      </p>
      <nav>
        <a id="home" href={paths()}>Home</a>
        <a id="apps" href={paths.applications}>Applications</a>
      </nav>
      <ul>
        <LinkStateReadout href={paths()} />
        <LinkStateReadout href={paths.applications} />
        <LinkStateReadout href="#/applications" />
      </ul>
      {props.children}
    </>
  );
}

render(() => <Router>{(props) => <Layout>{props.children}</Layout>}</Router>, document.getElementById("root"));
