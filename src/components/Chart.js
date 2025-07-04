import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ articles }) => {
  const data = {
    labels: articles.map(article => article.source),
    datasets: [
      {
        label: 'Number of Articles',
        data: articles.map(article => article.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default Chart;
