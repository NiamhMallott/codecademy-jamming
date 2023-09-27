const clientId = "d2959691412f4d3e9188f6039f535d1e";
const redirect = "http://127.0.0.1:5173/";

const scopes = ["playlist-read-private", "playlist-modify-private"];
const endpoint =
  "https://accounts.spotify.com/authorize" +
  "?response_type=token" +
  `&client_id=${window.encodeURIComponent(clientId)}` +
  `&scope=${window.encodeURIComponent(scopes.join(" "))}` +
  `&redirect_uri=${window.encodeURIComponent(redirect)}`;

function login() {
  window.location = endpoint;
}

const queryParams = new window.URLSearchParams(window.location.hash.slice(1));

let shouldRequest = false;

if (queryParams.has("access_token")) {
  const token = queryParams.get("access_token");
  const expires = +queryParams.get("expires_in");
  const now = Date.now();

  window.localStorage.setItem("access_token", token);
  window.localStorage.setItem("expires_in", `${now + expires * 1000}`);

  shouldRequest = false;

  window.location.hash = "";
  window.setTimeout(login, now + expires * 1000);
} else if (window.localStorage.getItem("access_token")) {
  const expires = +window.localStorage.getItem("expires_in");
  const now = Date.now();

  if (now <= expires) {
    shouldRequest = false;
    window.setTimeout(login, expires - now);
  } else {
    shouldRequest = true;
  }
}

if (shouldRequest) {
  login();
}

// HOOKS -----------------------------------------------------------------------

export function useToken() {
  return window.localStorage.getItem("access_token");
}
