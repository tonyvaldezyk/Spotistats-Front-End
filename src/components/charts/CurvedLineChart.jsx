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

const CurvedLineChart = ({ 
  data, 
  xKey, 
  yKeys,
  labels,
  title, 
  xLabel, 
  yLabel, 
  expanded = false
}) => {
  const colors = ['rgb(30, 215, 96)', 'rgb(255, 99, 132)'];

  const chartData = {
    labels: data.map(item => item[xKey]),
    datasets: yKeys.map((key, index) => ({
      label: labels[index],
      data: data.map(item => item[key]),
      borderColor: colors[index],
      backgroundColor: `${colors[index]}20`,
      fill: true,
      tension: 0.4,
      pointRadius: expanded ? 4 : 2,
      pointHoverRadius: expanded ? 6 : 4,
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: !expanded,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(255, 255, 255)',
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: title,
        color: 'rgb(255, 255, 255)',
        font: {
          size: 16
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'rgb(255, 255, 255)',
        bodyColor: 'rgb(255, 255, 255)',
        borderColor: 'rgb(30, 215, 96)',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(3)}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xLabel,
          color: 'rgb(255, 255, 255)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgb(255, 255, 255)',
          font: {
            size: expanded ? 12 : 10
          }
        }
      },
      y: {
        title: {
          display: true,
          text: yLabel,
          color: 'rgb(255, 255, 255)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgb(255, 255, 255)',
          font: {
            size: expanded ? 12 : 10
          }
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: expanded ? '500px' : '300px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CurvedLineChart;
