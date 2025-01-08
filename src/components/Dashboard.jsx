import React from 'react';
import { BarChart } from './charts/BarChart';
import { useAcousticnessYear } from './../hooks/useApi.js';
import LineChart from './charts/LineChart.jsx';

export const Dashboard = () => {
  const { data: songs, isLoading } = useAcousticnessYear();
  const { data: content } = songs || {};

  console.log(content)

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full flex">
      <LineChart content={content.average_acousticness} title="Average acousticness by year" label="From 0 to 1"/>
    </div>
  );
};
