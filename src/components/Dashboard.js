import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Chart';

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [lastUpdate, setLastUpdate] = useState('');

  const fetchArticles = async () => {
    try {
      const response = await axios.get('/api/articles');
      setArticles(response.data);
      setLastUpdate(new Date().toLocaleString());
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
    const interval = setInterval(fetchArticles, 7200000); // Fetch every 2 hours
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h1>Media Monitoring Dashboard</h1>
      <p>Last updated: {lastUpdate}</p>
      <Chart articles={articles} />
      {/* Render articles here */}
    </div>
  );
};

export default Dashboard;
