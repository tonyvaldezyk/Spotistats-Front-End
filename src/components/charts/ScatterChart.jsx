import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const ScatterChart = ({ 
  data, 
  xKey,
  yKey,
  title,
  xLabel,
  yLabel,
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
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            return `${xLabel}: ${context.raw.x}, ${yLabel}: ${context.raw.y}`;
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
    datasets: [{
      data: data.map(item => ({
        x: item[xKey],
        y: item[yKey]
      })),
      backgroundColor: color + '80',
      pointRadius: expanded ? 6 : 4,
      pointHoverRadius: expanded ? 8 : 6,
    }]
  };

  return (
    <div style={{ width: '100%', height: expanded ? '100%' : '300px' }}>
      <Scatter options={options} data={chartData} />
    </div>
  );
};

export default ScatterChart;
