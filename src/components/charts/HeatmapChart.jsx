import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const HeatmapChart = ({ data, maxDensity, title, xLabel, yLabel, expanded }) => {
  const chartData = {
    datasets: [{
      label: 'Densité',
      data: data.map(point => ({
        x: point.x,
        y: point.y,
        r: Math.sqrt(point.density / maxDensity) * 20 // Taille proportionnelle à la densité
      })),
      backgroundColor: data.map(point => {
        const intensity = point.density / maxDensity;
        return `rgba(46, 213, 115, ${intensity})`; // Couleur Spotify avec opacité variable
      }),
      borderColor: 'rgba(46, 213, 115, 0.1)',
      borderWidth: 1,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: !expanded,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const point = data[context.dataIndex];
            return `Dansabilité: ${point.x.toFixed(2)}, Positivité: ${point.y.toFixed(2)}, Densité: ${point.density}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xLabel,
          color: '#fff'
        },
        min: 0,
        max: 1,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#fff'
        }
      },
      y: {
        title: {
          display: true,
          text: yLabel,
          color: '#fff'
        },
        min: 0,
        max: 1,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#fff'
        }
      }
    }
  };

  return (
    <div className={`chart-container ${expanded ? 'expanded' : ''}`}>
      <h3 className="chart-title">{title}</h3>
      <Scatter data={chartData} options={options} />
    </div>
  );
};

export default HeatmapChart;
