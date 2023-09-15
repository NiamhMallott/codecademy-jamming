import { useState, useEffect, useCallback } from "react";

function App() {
  const [playlistTitle, setPlaylistTitle] = useState("bloopy");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([
    {
      name: "Young and Beautiful",
      artist: "Lana Del Rey",
      album: "The Great Gatsby Soundtrack",
      id: 0,
    },
    {
      name: "Wildest Dreams",
      artist: "Taylor Swift",
      album: "Taylors Version",
      id: 1,
    },
    { name: "Bonfire", artist: "Childish Gambino", album: "Camp", id: 2 },
    {
      name: "Ceilings",
      artist: "Lizzy McAlpine",
      album: "five second flat",
      id: 3,
    },
  ]);

  return (
    <div>
      <div className="flex justify-center">
        <Header />
      </div>

      <div className="flex justify-center my-8 max-w-2xl mx-auto">
        <SearchBar />
      </div>

      <div className="flex justify-between gap-x-8 max-w-2xl mx-auto">
        <SearchResults searchResults={searchResults} />
        <Tracklist
          playlistTitle={playlistTitle}
          playlistTracks={playlistTracks}
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

function SearchResults({ searchResults }) {
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
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tracklist({ playlistTitle, playlistTracks }) {
  return (
    <div>
      <h2 className="font-bold">Playlist</h2>
      <input value={playlistTitle} />
      <ul>
        {playlistTracks.map((playlistTrack) => (
          <li key={playlistTrack.id}>
            <Track
              name={playlistTrack.name}
              artist={playlistTrack.artist}
              album={playlistTrack.album}
              id={playlistTrack.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Track({ name, artist, album, id }) {
  return (
    <div>
      <p>{name}</p>
      <p>{artist}</p>
      <p>{album}</p>
      <p>{id}</p>
    </div>
  );
}
