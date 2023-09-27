import { useState, useCallback, useEffect, useMemo } from "react";

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

export function useUserId() {
  const access_token = useToken();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const method = "GET";
    const headers = { Authorization: `Bearer ${access_token}` };

    fetch("https://api.spotify.com/v1/me", { method, headers })
      .then((res) => res.json())
      .then((user) => setUserId(user.id));
  }, [access_token]);

  return userId;
}

export function useSearchResults(track) {
  const access_token = useToken();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const name = window.encodeURIComponent(track);
    const url = `https://api.spotify.com/v1/search?q=${name}&type=track&limit=5`;
    const method = "GET";
    const headers = { Authorization: `Bearer ${access_token}` };

    if (access_token && track) {
      fetch(url, { method, headers })
        .then((res) => res.json())
        .then((res) => {
          setResults(
            res.tracks.items.map((item) => {
              return {
                name: item.name,
                id: item.id,
                uri: item.uri,
                album: item.album.name,
                image: item.album.images[0].url,
                artist: item.artists.map((artist) => artist.name).join(", "),
              };
            })
          );
        });
    }
  }, [access_token, track]);

  return results;
}

export function useCreatePlaylist() {
  const access_token = useToken();
  const userId = useUserId();

  const addTracksToPlaylist = useCallback(
    (id, tracks) => {
      const url = `https://api.spotify.com/v1/playlists/${id}/tracks`;
      const method = "POST";
      const headers = { Authorization: `Bearer ${access_token}` };
      const body = JSON.stringify({
        uris: tracks.map((track) => track.uri),
        position: 0,
      });

      return fetch(url, { method, headers, body });
    },
    [access_token]
  );

  const createPlaylist = useCallback(
    (name, tracks) => {
      const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
      const method = "POST";
      const headers = { Authorization: `Bearer ${access_token}` };
      const body = JSON.stringify({
        name: name,
        public: false,
      });

      if (access_token && body.name !== "") {
        fetch(url, { method, headers, body })
          .then((res) => res.json())
          .then((res) => res.id)
          .then((playlistId) => addTracksToPlaylist(playlistId, tracks))
          .catch(console.error);
      }
    },
    [userId, addTracksToPlaylist]
  );

  return createPlaylist;
}
