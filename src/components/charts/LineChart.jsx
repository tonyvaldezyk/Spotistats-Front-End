import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ 
  data, 
  xKey,
  yKey,
  title,
  xLabel,
  yLabel,
  expanded = false,
  variant = 'default',
  color = '#1ed760'
}) => {
  // Vérification et transformation des données si nécessaire
  const safeData = Array.isArray(data) ? data : [];
  
  const getLineStyle = () => {
    switch (variant) {
      case 'smooth':
        return {
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(30, 215, 96, 0.1)'
        };
      case 'stepped':
        return {
          stepped: true,
          borderWidth: 2
        };
      case 'dashed':
        return {
          borderDash: [5, 5],
          borderWidth: 2
        };
      default:
        return {
          tension: 0,
          borderWidth: 2
        };
    }
  };

  const sortedData = [...safeData].sort((a, b) => a[xKey] - b[xKey]);

  const chartData = {
    labels: sortedData.map(item => item[xKey]),
    datasets: [
      {
        label: title,
        data: sortedData.map(item => item[yKey]),
        borderColor: color,
        backgroundColor: color + '20',
        ...getLineStyle()
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: !expanded,
    plugins: {
      legend: {
        display: false
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 10,
        displayColors: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xLabel,
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: expanded ? 12 : 10
          }
        }
      },
      y: {
        title: {
          display: true,
          text: yLabel,
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#ffffff',
          font: {
            size: expanded ? 12 : 10
          }
        }
      }
    }
  };

  if (safeData.length === 0) {
    return (
      <div style={{ 
        color: '#ffffff', 
        textAlign: 'center', 
        padding: '2rem',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '8px'
      }}>
        Aucune donnée disponible
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: expanded ? '500px' : '300px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
