const TrackItem = ({ rank, name, artists, artwork, stats }) => (
  <div className="track-item">
    <div className="track-rank">{rank}</div>
    {artwork && (
      <div className="track-artwork">
        <img src={artwork} alt={name} />
      </div>
    )}
    <div className="track-info">
      <div className="track-name">{name}</div>
      <div className="track-artists">{artists}</div>
      {stats && <div className="track-stats">{stats}</div>}
    </div>
  </div>
);

const List = ({ data, xKey }) => {
  return (
  <div className="top-tracks-list">
    {data.map((track, index) => (
      <TrackItem 
        key={index} 
        rank={index + 1} 
        name={track.name} 
        artists={track.artists} 
        artwork={track.artwork_url} 
        stats={`Popularité: ${track[xKey]}`}
      />
    ))}
  </div>
  )
}

export default List
