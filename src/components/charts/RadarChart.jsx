import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ 
  data, 
  labels,
  values,
  title,
  expanded = false,
  color = '#1ed760'
}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        borderWidth: 1
      }
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        pointLabels: {
          color: '#ffffff',
          font: {
            size: expanded ? 12 : 10
          }
        },
        ticks: {
          color: '#ffffff',
          backdropColor: 'transparent',
          font: {
            size: expanded ? 12 : 10
          }
        }
      }
    }
  };

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: color + '20',
        borderColor: color,
        borderWidth: 2,
        pointRadius: expanded ? 4 : 2,
        pointHoverRadius: expanded ? 6 : 4,
      }
    ]
  };

  return (
    <div style={{ width: '100%', height: expanded ? '100%' : '300px' }}>
      <Radar options={options} data={chartData} />
    </div>
  );
};

export default RadarChart;
