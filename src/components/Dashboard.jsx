import React, { useState } from 'react';
import { 
  RiCloseLine
} from 'react-icons/ri';

import BarChart from './charts/BarChart';
import CurvedLineChart from './charts/CurvedLineChart';

import SpotifyLogo from './layout/spotifyLogo';
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
  useTop10Longest,
  useMode,
  useKey
} from '../hooks/useApi';

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
    xKey: "popularity",
    xLabel: "Popularité"
  },
  {
    key: "topDance",
    hook: useTop10Dance,
    type: "list",
    title: "Top 10 des Titres les les Plus Dansants",
    xKey: "danceability",
    xLabel: "Dansabilité"
  },
  {
    key: "topRelax",
    hook: useTop10Relaxing,
    type: "list",
    title: "Top 10 des Titres les les Plus Relaxants",
    xKey: "acousticness",
    xLabel: "Score relaxation"
  },
  {
    key: "topLong",
    hook: useTop10Longest,
    type: "list",
    title: "Top 10 des Titres les les Plus Longs",
    xKey: "duration_ms",
    xLabel: "Durée"
  },
  {
    key: "artistYear",
    title: "Top 10 Artistes par Année",
    hook: useTracksByArtistYear,
  },
  {
    key: "features",
    title: "Caractéristiques Musicales",
    hook: useAcousticnessByYear,
  },
  {
    key: "mode",
    title: "Modalité du track (Major vs Minor)",
    hook: useMode,
    colors: ['#1ed760', '#d14f21'],
    type: "pie"
  },
  {
    key: "keys",
    title: "Tonalité du track",
    hook: useKey,
    colors: ['#ff6384', '#1eEf60', '#d14f21', '#b10f2e', '#f39c12', '#e74c3c', '#9b59b6', '#3498db', '#2ecc71', '#e67e22', '#ecf0f1', '#95a5a6'],
    type: "doughnut"
  }
]

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

  const Widget = ({ identifier, className = '', children}) => {
    const { title, xKey, yKey, xLabel, yLabel, hook, labels, type, colors}  = charts?.find(item => item.key === identifier);
    const { data, isLoading, error } = hook() || {};
    const onExpand = () => handleExpand(`${identifier}`)
    const expanded = expandedWidget === `${identifier}`

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
        colors={colors}
        expanded={expandedWidget === `${identifier}`}
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
      <div className="main-content">
        <header className="header">
          <div className="logo-container">
            <SpotifyLogo />
          </div>
          <h1>Tableau de bord Statistique</h1>
        </header>

        <div className="dashboard-grid">
          <div className="kpis-section">
            <div className="section">
              <h2 className="section-title">Évolution Temporelle</h2>
              <div className="section-content">
                <div className="kpis-grid">
                  <Widget className="kpi-widget" identifier="danceabilityVSvalence" />
                  <Widget className="kpi-widget" identifier="trackYears" />
                  <Widget className="kpi-widget" identifier="popularityLanguage" />
                  <Widget identifier="mode" />
                  <Widget identifier="keys" />
                  <Widget 
                    className="kpi-widget"
                    identifier="artistYear"
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
                  <Widget
                    identifier="features"
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
                  <Widget identifier = "topPopular"/>
                  <Widget identifier = "topDance"/>
                  <Widget identifier = "topRelax"/>
                  <Widget identifier = "topLong"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
