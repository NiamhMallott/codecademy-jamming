import React from 'react'



function App() {
  return (
    <>
      <div>
        <h1>Jamming</h1>
      </div>
      <SearchBar />

      <div>
        <SearchResults />
        <MyPlaylist />
      </div>
    </>
  )
}

function SearchBar() {
  return (
    <div>
      <form>
        <input type="search" ></input>
        <button>Search</button>
      </form>
    </div>
  )
}


function SearchResults() {
  const tracks = ['song 1', 'song 2', 'song 3']

  return (
    <div>
      <h2>Results</h2>

      <TrackList tracks={tracks} />
    </div>
  )
}

function MyPlaylist() {
  const tracks = ['song 1', 'song 2', 'song 3']

  return (
    <div>
      <h2>My Playlist</h2>
      <TrackList tracks={tracks} />
    </ div>
  )
}

function TrackList({ tracks }) {
  return <ul>
    {tracks.map(name => <Track name={name} />)}
  </ul>
}

function Track({ name }) {
  return <li>{name}</li>
}

export default App
