import { useState, useEffect, useCallback } from "react";
import {
  PlusIcon,
  MinusIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

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
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white min-h-screen">
      <div className="flex justify-center">
        <Header />
      </div>

      <div className="flex justify-center my-8 max-w-2xl mx-auto">
        <SearchBar />
      </div>

      <div className="grid grid-cols-2 gap-x-8 max-w-2xl mx-auto">
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
  return (
    <div className="w-full flex gap-4 mx-2 sm:mx-4 md:mx-8 lg:mx-12 rounded bg-violet-400">
      <input
        className="flex-1 rounded-l px-2 py-1 bg-transparent"
        name="Search"
      />
      <button className="border-l  inline-flex items-center gap-2 px-2 my-1">
        Search
        <MagnifyingGlassIcon width={15} height={15} />
      </button>
    </div>
  );
}

function SearchResults({ searchResults, addTrack }) {
  return (
    <div className="space-y-2 rounded-lg bg-violet-950/50 p-8">
      <h2 className="pb-2 font-bold">Search Results</h2>
      <ul className="space-y-2">
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
    <div className="space-y-2 flex flex-col rounded-lg bg-violet-950 bg-opacity-40 p-8 transition-all">
      <h2 className="font-bold">
        <input
          className="w-full rounded px-2 py-1 bg-violet-400/40		"
          value={playlistTitle}
          onChange={(event) => {
            setPlaylistTitle(event.target.value);
          }}
        />
      </h2>

      <ul className="flex-1 space-y-2">
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
        className="block mx-auto bg-indigo-600 hover:bg-indigo-700 shadow-lg rounded-lg p-2"
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
    <div className="flex items-center gap-2 rounded-lg bg-violet-950 bg-opacity-40 hover:bg-opacity-50 p-5 transition-all">
      <div className="flex-1">
        <p>{name}</p>
        <div className="flex align-tems text-xs">
          <span>
            {artist} | {album}
          </span>
        </div>
        <p className="hidden">{id}</p>
        <p className="hidden">{uri}</p>
      </div>

      <div className="text-right">
        {addTrack && (
          <button
            className="underline hover:underline-offset-4"
            onClick={() => {
              addTrack({ name, artist, album, id, uri });
            }}
          >
            <PlusIcon height={15} width={15} />
          </button>
        )}
        {removeTrack && (
          <button
            className="underline hover:underline-offset-4"
            onClick={() => {
              removeTrack({ name, artist, album, id, uri });
            }}
          >
            <MinusIcon height={15} width={15} />
          </button>
        )}
      </div>
    </div>
  );
}
