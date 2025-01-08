import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ 
  data, 
  xKey = 'year',
  yKey = 'count',
  title, 
  xLabel, 
  yLabel,
  expanded = false,
  stacked = false,
  colors = ['#1ed760'] // Couleur Spotify par défaut
}) => {
  const chartRef = React.useRef(null);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Cache la légende car redondante avec le titre
      },
      title: {
        display: true,
        text: title,
        color: '#ffffff',
        font: {
          size: expanded ? 18 : 14,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        backgroundColor: 'rgba(36, 36, 36, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.parsed.y.toLocaleString();
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#ffffff',
          maxRotation: 45,
          minRotation: 45,
          autoSkip: false,
          font: {
            size: expanded ? 12 : 10
          }
        },
        title: {
          display: true,
          text: xLabel,
          color: '#ffffff',
          font: {
            size: expanded ? 14 : 12
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: expanded ? 12 : 10
          },
          callback: function(value) {
            return value.toLocaleString();
          }
        },
        title: {
          display: true,
          text: yLabel,
          color: '#ffffff',
          font: {
            size: expanded ? 14 : 12
          }
        }
      }
    }
  };

  const chartData = {
    labels: data.map(item => item[xKey]),
    datasets: stacked ? 
      Object.keys(data[0]).filter(key => key !== xKey).map((key, index) => ({
        label: key,
        data: data.map(item => item[key]),
        backgroundColor: colors[index % colors.length],
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      })) :
      [{
        label: yLabel,
        data: data.map(item => item[yKey]),
        backgroundColor: colors[0],
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: '#1fdf6f'
      }]
  };

  return (
    <div style={{ width: '100%', height: expanded ? '100%' : '300px' }}>
      <Bar ref={chartRef} options={options} data={chartData} />
    </div>
  );
};

export default BarChart;
