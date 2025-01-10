import React, { useState } from 'react';
import { 
  RiDashboardLine, 
  RiMusicLine, 
  RiCloseLine
} from 'react-icons/ri';
import BarChart from './charts/BarChart';
import CurvedLineChart from './charts/CurvedLineChart';

import SpotifyLogo from './layout/spotifyLogo';
import SidebarItem from './layout/sidebarItem';
import LoadingSpinner from './layout/loadingSpinner';
import ErrorMessage from './layout/errorMessage';
import Chart from './charts';

import {
  useTracksByYear,
  useTracksByArtistYear,
  useAcousticnessByYear,
  useDanceabilityByYear,
  useDanceabilityAndValence,
  useTop10Popular,
  useTop10Dance,
  useTop10Relaxing,
  usePopularityByLanguage,
  useTop10Longest
} from '../hooks/useApi';

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

const charts = [
  {
    key: "trackYears",
    hook: useTracksByYear,
    type: "lineChart",
    xKey: "year",
    yKey: "count",
    title: "Nombre de Titres par Année",
    xLabel: "Année",
    yLabel: "Nombre de Titres"
  },
  {
    key: "danceabilityVSvalence",
    hook: useDanceabilityAndValence,
    type: "heatmapChart",
    title: "Relation Dansabilité et Positivité",
    xLabel: "Dansabilité (0-1)",
    yLabel: "Positivité (0-1)"
  },
  {
    // essayer de faire fonctionner avec deux hooks différents pour le curved
    key: "accousticVSdanceability",
    chart: CurvedLineChart,
    xKey: "year",
    yKey: ["acousticness", "danceability"],
    labels: ["Acoustique", "Dansabilité"],
    title: "Caractéristiques Musicales",
    xLabel: "Année",
    yLabel: "Score (0-1)"
  },
  {
    key: "popularityLanguage",
    hook: usePopularityByLanguage,
    type: "barChart",
    xKey: "language",
    yKey: "popularity",
    title: "Popularité par Langue",
    xLabel: "Langue",
    yLabel: "Popularité"
  },
  {
    key: "topPopular",
    hook: useTop10Popular,
    type: "list",
    title: "Top 10 des Titres les Plus Populaires",
  },
  {
    key: "topDance",
    hook: useTop10Dance,
    type: "list",
    title: "Top 10 des Titres les les Plus Dansants",
    xKey: "popularity"
  },
  {
    key: "topDance",
    hook: useTop10Dance,
    type: "list",
    title: "Top 10 des Titres les les Plus Dansants",
    xKey: "danceablity"
  },
  {
    key: "topRelax",
    hook: useTop10Relaxing,
    type: "list",
    title: "Top 10 des Titres les les Plus Relaxants",
    xKey: "acousticness"
    // * 100
  },
  {
    key: "topLong",
    hook: useTop10Longest,
    type: "list",
    title: "Top 10 des Titres les les Plus Longs",
    xKey: "duration_ms"
    // stats={`Durée: ${Math.floor(track.duration_ms / 60000)}:${String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}`}
  },
  {
    key: "artistYear",
    title: "Top 10 Artistes par Année",
    hook: useTracksByArtistYear
  },
  {
    key: "features",
    title: "Caractéristiques Musicales",
    hook: useAcousticnessByYear
  }
]

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [expandedWidget, setExpandedWidget] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');

  // Récupération des données
  const { data: artistTracks, isLoading: isLoadingArtist, error: artistError } = useTracksByArtistYear(selectedYear);
  const { data: acousticnessData, isLoading: isLoadingAcousticness, error: acousticnessError } = useAcousticnessByYear();
  const { data: danceabilityData, isLoading: isLoadingDanceability, error: danceabilityError } = useDanceabilityByYear();

  const handleExpand = (widgetId) => {
    setExpandedWidget(expandedWidget === widgetId ? null : widgetId);
  };

  const handleYearChange = (newYear) => {
    if (newYear && /^\d{4}$/.test(newYear)) {
      setSelectedYear(newYear);
    }
  };

  const Widget = ({ key2, className = '', children}) => {
    const { title, xKey, yKey, xLabel, yLabel, hook, labels, type}  = charts?.find(item => item.key === key2);
    const { data, isLoading, error } = hook() || {};
    const onExpand = () => handleExpand(`${key2}`)
    const expanded = expandedWidget === `${key2}`

    const content = () => {
      return (isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message="Erreur lors du chargement des données" />
      ) : !children ? (
      <Chart
        data={data}
        chartType={type}
        xKey={xKey}
        yKey={yKey}
        title={title}
        xLabel={xLabel}
        yLabel={yLabel}
        labels={labels}
        expanded={expandedWidget === `${key2}`}
        variant="smooth"/>
      ) : children )
    }
  
    if (expanded) {
      return (
        <div className="expanded-widget-overlay" onClick={() => onExpand()}>
          <div className="expanded-widget" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={() => onExpand()}>
              <RiCloseLine size={24} />
            </button>
            <h3 className="widget-title">{title}</h3>
            <div className="widget-content">
              {content()}
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div className={`widget ${className}`} onClick={onExpand}>
        <h3 className="widget-title">{title}</h3>
        <div className="widget-content">
          {content()}
        </div>
      </div>
    );
  }

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
            icon={<RiMusicLine />}
            label="Top Tracks" 
            active={activeSection === 'tracks'} 
            onClick={() => setActiveSection('tracks')}
          />
        </div>
      </div>

      <div className="main-content">
        <header className="header">
          <h1>Analyse des Données Spotify</h1>
        </header>

        <div className="dashboard-grid">
          <div className="kpis-section">
            <div className="section">
              <h2 className="section-title">Évolution Temporelle</h2>
              <div className="section-content">
                <div className="kpis-grid">

                  <Widget className="kpi-widget" key2="danceabilityVSvalence" />
                  <Widget className="kpi-widget" key2="trackYears" />
                  <Widget key2="popularityLanguage" />
                  {/* <Widget key2="accousticVSdanceability" /> */}

                  <Widget 
                    className="kpi-widget"
                    key2="artistYear"
                  >
                    <YearInput
                      value={selectedYear}
                      onChange={handleYearChange}
                      placeholder="Entrez une année..."
                    />
                    {isLoadingArtist ? (
                      <LoadingSpinner />
                    ) : artistError ? (
                      <ErrorMessage message="Erreur lors du chargement des données" />
                    ) : artistTracks?.songsPerArtist ? (
                      <BarChart 
                        data={Object.entries(artistTracks.songsPerArtist)
                          .map(([artist, count]) => ({
                            artist,
                            count
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

                    {/* faire le double hook handle */}
                  <Widget
                    key2="features"
                    className="kpi-widget"
                  >
                    {isLoadingAcousticness || isLoadingDanceability ? (
                      <LoadingSpinner />
                    ) : acousticnessError || danceabilityError ? (
                      <ErrorMessage message="Erreur lors du chargement des données" />
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
                </div>
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">Top Morceaux</h2>
              <div className="section-content">
                <div className="kpis-grid">
                  <Widget key2 = "topPopular"/>
                  <Widget key2 = "topDance"/>
                  <Widget key2 = "topRelax"/>
                  <Widget key2 = "topLong"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
