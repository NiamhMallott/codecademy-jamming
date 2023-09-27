import { useState, useEffect, useCallback } from "react";

function App() {
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([
    {
      name: "Young and Beautiful",
      artist: "Lana Del Rey",
      album: "The Great Gatsby Soundtrack",
      id: 0,
      uri: "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
    },
    {
      name: "Wildest Dreams",
      artist: "Taylor Swift",
      album: "Taylors Version",
      id: 1,
      uri: "spotify:album:2up3OPMp9Tb4dAKM2erWXR",
    },
    {
      name: "Bonfire",
      artist: "Childish Gambino",
      album: "Camp",
      id: 2,
      uri: "spotify:album:2up3OPsp9Tb4dAKM2erWXQ",
    },
    {
      name: "Ceilings",
      artist: "Lizzy McAlpine",
      album: "five second flat",
      id: 3,
      uri: "spotify:album:2up3OPMp9Tb4eAKM2erWXQ",
    },
  ]);

  const addTrack = useCallback(
    (newTrack) => {
      for (let i = 0; i < playlistTracks.length; i++) {
        if (newTrack.id === playlistTracks[i].id) {
          return;
        }
      }

      setPlaylistTracks([...playlistTracks, newTrack]);
    },
    [playlistTracks]
  );

  const removeTrack = useCallback(
    (selectedTrack) => {
      setPlaylistTracks(
        playlistTracks.filter((track) => {
          return track.id !== selectedTrack.id;
        })
      );
    },
    [playlistTracks]
  );

  const savePlaylist = useCallback(() => {
    const uris = playlistTracks.map((track) => track.uri);

    setPlaylistTracks([]);
    setPlaylistTitle("");
  }, [playlistTracks]);

  return (
    <div>
      <div className="flex justify-center">
        <Header />
      </div>

      <div className="flex justify-center my-8 max-w-2xl mx-auto">
        <SearchBar />
      </div>

      <div className="flex justify-between gap-x-8 max-w-2xl mx-auto">
        <SearchResults searchResults={searchResults} addTrack={addTrack} />
        <Tracklist
          playlistTitle={playlistTitle}
          playlistTracks={playlistTracks}
          removeTrack={removeTrack}
          setPlaylistTitle={setPlaylistTitle}
          savePlaylist={savePlaylist}
        />
      </div>
    </div>
  );
}

export default App;

function Header() {
  return <h1 className="text-2xl">Jamming</h1>;
}

function SearchBar() {
  return <input className="w-full ring-2 rounded px-2 py-1 ring-purple-500" />;
}

function SearchResults({ searchResults, addTrack }) {
  return (
    <div>
      <h2 className="pb-2 font-bold">Search Results</h2>
      <ul>
        {searchResults.map((searchResult) => (
          <li key={searchResult.id}>
            <Track
              name={searchResult.name}
              artist={searchResult.artist}
              album={searchResult.album}
              id={searchResult.id}
              uri={searchResult.uri}
              addTrack={addTrack}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tracklist({
  playlistTitle,
  setPlaylistTitle,
  playlistTracks,
  removeTrack,
  savePlaylist,
}) {
  return (
    <div>
      <h2 className="font-bold">
        <input
          value={playlistTitle}
          onChange={(event) => {
            setPlaylistTitle(event.target.value);
          }}
        />
      </h2>

      <ul>
        {playlistTracks.map((playlistTrack) => (
          <li key={playlistTrack.id}>
            <Track
              name={playlistTrack.name}
              artist={playlistTrack.artist}
              album={playlistTrack.album}
              id={playlistTrack.id}
              uri={playlistTrack.uri}
              removeTrack={removeTrack}
            />
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          savePlaylist();
        }}
      >
        Save & Export
      </button>
    </div>
  );
}

function Track({ name, artist, album, id, uri, addTrack, removeTrack }) {
  return (
    <div>
      <p>{name}</p>
      <p>{artist}</p>
      <p>{album}</p>
      <p>{id}</p>
      <p>{uri}</p>
      {addTrack && (
        <button
          onClick={() => {
            addTrack({ name, artist, album, id, uri });
          }}
        >
          Add
        </button>
      )}
      {removeTrack && (
        <button
          onClick={() => {
            removeTrack({ name, artist, album, id, uri });
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
}
