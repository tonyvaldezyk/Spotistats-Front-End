import React, { useState } from 'react';
import { 
  RiDashboardLine, 
  RiMusicLine, 
  RiBarChartLine, 
  RiHeartLine, 
  RiSettings4Line,
  RiCloseLine
} from 'react-icons/ri';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import ScatterChart from './charts/ScatterChart';
import RadarChart from './charts/RadarChart';
import CurvedLineChart from './charts/CurvedLineChart';
import {
  useTracksByYear,
  useTracksByArtistYear,
  useAcousticnessByYear,
  useDanceabilityByYear,
  useValenceByMode,
  useDanceabilityAndValence,
  usePopularityByTempo,
  useTop10Popular,
  useTop10Dance,
  useTop10Relaxing,
  usePopularityByLanguage,
  useTop10Longest
} from '../hooks/useApi';

// Composant pour le logo Spotify
const SpotifyLogo = () => (
  <img 
    src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
    alt="Spotify Logo"
    className="spotify-logo"
  />
);

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div 
    className={`sidebar-item ${active ? 'active' : ''}`}
    onClick={onClick}
  >
    <span className="icon">{icon}</span>
    <span className="label">{label}</span>
  </div>
);

const YearInput = ({ value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue && !isNaN(inputValue) && inputValue >= 1900 && inputValue <= new Date().getFullYear()) {
      onChange(inputValue);
    }
  };

  return (
    <form className="year-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      />
    </form>
  );
};

const Widget = ({ title, children, className = '', onExpand, expanded }) => {
  if (expanded) {
    return (
      <div className="expanded-widget-overlay" onClick={() => onExpand()}>
        <div className="expanded-widget" onClick={e => e.stopPropagation()}>
          <button className="close-button" onClick={() => onExpand()}>
            <RiCloseLine />
          </button>
          <h3 className="widget-title">{title}</h3>
          <div className="widget-content">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`widget ${className}`} onClick={onExpand}>
      <h3 className="widget-title">{title}</h3>
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="error-message">
    <span className="error-icon">⚠️</span>
    <p>{message}</p>
  </div>
);

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [expandedWidget, setExpandedWidget] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');
  
  // Récupération des données
  const { data: tracksByYear, isLoading: isLoadingTracks } = useTracksByYear();
  const { data: artistTracks, isLoading: isLoadingArtist } = useTracksByArtistYear(selectedYear);
  const { data: acousticnessData, isLoading: isLoadingAcousticness } = useAcousticnessByYear();
  const { data: danceabilityData, isLoading: isLoadingDanceability } = useDanceabilityByYear();
  const { data: valenceData, isLoading: isLoadingValence } = useValenceByMode();
  const { data: danceValenceData, isLoading: isLoadingDanceValence } = useDanceabilityAndValence();
  const { data: popularityTempoData, isLoading: isLoadingPopTempo } = usePopularityByTempo();
  const { data: top10Popular, isLoading: isLoadingTop10Popular } = useTop10Popular();
  const { data: top10Dance, isLoading: isLoadingTop10Dance } = useTop10Dance();
  const { data: top10Relaxing, isLoading: isLoadingTop10Relaxing } = useTop10Relaxing();
  const { data: popularityLanguageData, isLoading: isLoadingPopLanguage } = usePopularityByLanguage();
  const { data: top10Longest, isLoading: isLoadingTop10Longest } = useTop10Longest();

  const handleExpand = (widgetId) => {
    setExpandedWidget(expandedWidget === widgetId ? null : widgetId);
  };

  const handleYearChange = (newYear) => {
    if (newYear && /^\d{4}$/.test(newYear)) {
      setSelectedYear(newYear);
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo-container">
          <SpotifyLogo />
        </div>
        <div className="sidebar-items">
          <SidebarItem 
            icon={<RiDashboardLine />}
            label="Dashboard" 
            active={activeSection === 'dashboard'} 
            onClick={() => setActiveSection('dashboard')}
          />
          <SidebarItem 
            icon={<RiBarChartLine />}
            label="Trends" 
            active={activeSection === 'trends'} 
            onClick={() => setActiveSection('trends')}
          />
          <SidebarItem 
            icon={<RiMusicLine />}
            label="Top Tracks" 
            active={activeSection === 'tracks'} 
            onClick={() => setActiveSection('tracks')}
          />
          <SidebarItem 
            icon={<RiHeartLine />}
            label="Musical Features" 
            active={activeSection === 'features'} 
            onClick={() => setActiveSection('features')}
          />
        </div>
      </div>

      <div className="main-content">
        <header className="header">
          <div className="header-content">
            <img 
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Icon_RGB_Green.png"
              alt="Spotify Icon"
              className="header-logo"
            />
            <h1>Analyse des Données Spotify</h1>
          </div>
        </header>

        <div className="dashboard-grid">
          <div className="kpis-section">
            <h2 className="section-title">Évolution Temporelle</h2>
            <div className="kpis-grid">
              <Widget 
                title="Évolution du Nombre de Titres par Année" 
                className="kpi-widget"
                onExpand={() => handleExpand('tracksYear')}
                expanded={expandedWidget === 'tracksYear'}
              >
                {isLoadingTracks ? (
                  <LoadingSpinner />
                ) : (
                  <LineChart 
                    data={Object.entries(tracksByYear?.songsByYear || {}).map(([year, count]) => ({
                      year: parseInt(year),
                      count: count
                    }))}
                    xKey="year"
                    yKey="count"
                    title="Nombre de Titres par Année"
                    xLabel="Année"
                    yLabel="Nombre de Titres"
                    expanded={expandedWidget === 'tracksYear'}
                    variant="smooth"
                  />
                )}
              </Widget>

              <Widget 
                title="Top 10 Artistes par Année" 
                className="kpi-widget"
                onExpand={() => handleExpand('artistYear')}
                expanded={expandedWidget === 'artistYear'}
              >
                <YearInput
                  value={selectedYear}
                  onChange={handleYearChange}
                  placeholder="Entrez une année..."
                />
                {isLoadingArtist ? (
                  <LoadingSpinner />
                ) : artistTracks?.songsPerArtist ? (
                  <BarChart 
                    data={Object.entries(artistTracks.songsPerArtist)
                      .map(([artist, count]) => ({
                        artist: artist.replace(/[\[\]']/g, ''),
                        count: count
                      }))}
                    xKey="artist"
                    yKey="count"
                    title={`Top 10 Artistes en ${selectedYear}`}
                    xLabel="Artiste"
                    yLabel="Nombre de Titres"
                    expanded={expandedWidget === 'artistYear'}
                  />
                ) : (
                  <div className="placeholder">Entrez une année pour voir les données</div>
                )}
              </Widget>

              <Widget 
                title="Caractéristiques Musicales" 
                className="kpi-widget"
                onExpand={() => handleExpand('features')}
                expanded={expandedWidget === 'features'}
              >
                {isLoadingAcousticness || isLoadingDanceability ? (
                  <LoadingSpinner />
                ) : (
                  <CurvedLineChart 
                    data={Object.entries(acousticnessData?.average_acousticness || {}).map(([year, value]) => ({
                      year: parseInt(year),
                      acousticness: value,
                      danceability: danceabilityData?.average_danceability[year] || 0
                    }))}
                    xKey="year"
                    yKeys={["acousticness", "danceability"]}
                    labels={["Acoustique", "Dansabilité"]}
                    title="Évolution des Caractéristiques Musicales"
                    xLabel="Année"
                    yLabel="Score (0-1)"
                    expanded={expandedWidget === 'features'}
                  />
                )}
              </Widget>

              <Widget 
                title="Analyse des Caractéristiques par Mode Musical" 
                className="kpi-widget"
                onExpand={() => handleExpand('valenceMode')}
                expanded={expandedWidget === 'valenceMode'}
              >
                {isLoadingValence ? (
                  <LoadingSpinner />
                ) : valenceData?.positivness ? (
                  <RadarChart 
                    data={valenceData}
                    labels={[
                      "Positivité (0-1)",
                      "Énergie (0-1)",
                      "Dansabilité (0-1)",
                      "Acoustique (0-1)",
                      "Instrumental (0-1)"
                    ]}
                    values={[
                      valenceData.positivness["1"],
                      valenceData.energy || 0.8,
                      valenceData.danceability || 0.7,
                      valenceData.acousticness || 0.4,
                      valenceData.instrumentalness || 0.2
                    ]}
                    title="Caractéristiques par Mode (Majeur/Mineur)"
                    expanded={expandedWidget === 'valenceMode'}
                  />
                ) : (
                  <div className="placeholder">Données non disponibles</div>
                )}
              </Widget>

              <Widget 
                title="Relation Dansabilité et Positivité" 
                className="kpi-widget"
                onExpand={() => handleExpand('danceValence')}
                expanded={expandedWidget === 'danceValence'}
              >
                {isLoadingDanceValence ? (
                  <LoadingSpinner />
                ) : danceValenceData?.data ? (
                  <ScatterChart 
                    data={danceValenceData.data}
                    xKey="danceability"
                    yKey="valence"
                    title="Corrélation entre Dansabilité et Positivité"
                    xLabel="Dansabilité (0-1)"
                    yLabel="Positivité (0-1)"
                    expanded={expandedWidget === 'danceValence'}
                  />
                ) : (
                  <div className="placeholder">Données non disponibles</div>
                )}
              </Widget>

              <Widget 
                title="Impact du Tempo sur la Popularité" 
                className="kpi-widget"
                onExpand={() => handleExpand('popTempo')}
                expanded={expandedWidget === 'popTempo'}
              >
                {isLoadingPopTempo ? (
                  <LoadingSpinner />
                ) : popularityTempoData?.data ? (
                  <LineChart 
                    data={popularityTempoData.data}
                    xKey="tempo"
                    yKey="popularity"
                    title="Relation entre Tempo et Popularité"
                    xLabel="Tempo (BPM)"
                    yLabel="Popularité (0-100)"
                    expanded={expandedWidget === 'popTempo'}
                    variant="dashed"
                  />
                ) : (
                  <div className="placeholder">Données non disponibles</div>
                )}
              </Widget>

              <Widget 
                title="Popularité par Langue" 
                className="kpi-widget"
                onExpand={() => handleExpand('popLanguage')}
                expanded={expandedWidget === 'popLanguage'}
              >
                {isLoadingPopLanguage ? (
                  <LoadingSpinner />
                ) : popularityLanguageData?.data ? (
                  <BarChart 
                    data={popularityLanguageData.data}
                    xKey="language"
                    yKey="popularity"
                    title="Popularité Moyenne par Langue"
                    xLabel="Langue"
                    yLabel="Popularité (0-100)"
                    expanded={expandedWidget === 'popLanguage'}
                  />
                ) : (
                  <div className="placeholder">Données non disponibles</div>
                )}
              </Widget>
            </div>

            <h2 className="section-title">Top Morceaux</h2>
            <div className="kpis-grid">
              <Widget 
                title="Top 10 des Titres les Plus Populaires" 
                className="kpi-widget"
                onExpand={() => handleExpand('topPopular')}
                expanded={expandedWidget === 'topPopular'}
              >
                {isLoadingTop10Popular ? (
                  <LoadingSpinner />
                ) : top10Popular ? (
                  <div className="top-tracks-list">
                    {top10Popular.map((track, index) => (
                      <div key={index} className="track-item">
                        <span className="track-number">{index + 1}</span>
                        <div className="track-info">
                          <div className="track-name">{track.name}</div>
                          <div className="track-artist">{track.artists}</div>
                        </div>
                        <div className="track-popularity">{track.popularity}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="placeholder">Données non disponibles</div>
                )}
              </Widget>

              <Widget 
                title="Top 10 des Titres les Plus Dansants" 
                className="kpi-widget"
                onExpand={() => handleExpand('topDance')}
                expanded={expandedWidget === 'topDance'}
              >
                {isLoadingTop10Dance ? (
                  <LoadingSpinner />
                ) : top10Dance ? (
                  <div className="top-tracks-list">
                    {top10Dance.map((track, index) => (
                      <div key={index} className="track-item">
                        <span className="track-number">{index + 1}</span>
                        <div className="track-info">
                          <div className="track-name">{track.name}</div>
                          <div className="track-artist">{track.artists}</div>
                        </div>
                        <div className="track-score">{(track.danceability * 100).toFixed(0)}%</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="placeholder">Données non disponibles</div>
                )}
              </Widget>

              <Widget 
                title="Top 10 des Titres les Plus Relaxants" 
                className="kpi-widget"
                onExpand={() => handleExpand('topRelax')}
                expanded={expandedWidget === 'topRelax'}
              >
                {isLoadingTop10Relaxing ? (
                  <LoadingSpinner />
                ) : top10Relaxing ? (
                  <div className="top-tracks-list">
                    {top10Relaxing.map((track, index) => (
                      <div key={index} className="track-item">
                        <span className="track-number">{index + 1}</span>
                        <div className="track-info">
                          <div className="track-name">{track.name}</div>
                          <div className="track-artist">{track.artists}</div>
                        </div>
                        <div className="track-score">
                          <div>Acoustique: {(track.acousticness * 100).toFixed(0)}%</div>
                          <div>Énergie: {(track.energy * 100).toFixed(0)}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="placeholder">Données non disponibles</div>
                )}
              </Widget>

              <Widget 
                title="Top 10 des Morceaux les Plus Longs" 
                className="kpi-widget"
                onExpand={() => handleExpand('topLongest')}
                expanded={expandedWidget === 'topLongest'}
              >
                {isLoadingTop10Longest ? (
                  <LoadingSpinner />
                ) : top10Longest ? (
                  <div className="top-tracks-list">
                    {top10Longest.map((track, index) => (
                      <div key={index} className="track-item">
                        <span className="track-number">{index + 1}</span>
                        <div className="track-info">
                          <div className="track-name">{track.name}</div>
                          <div className="track-artist">{track.artists}</div>
                        </div>
                        <div className="track-duration">
                          {Math.floor(track.duration_ms / 60000)}:{String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="placeholder">Données non disponibles</div>
                )}
              </Widget>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
