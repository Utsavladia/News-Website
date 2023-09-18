import React, { useState, useEffect } from 'react';
import './styles.css';
import Card from './Card';
import axios from 'axios';

const CategoryCards = ({ category }) => {
  const apiKey = '8eff3dce9187433185d08ea38a6ecfba';
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Make an API request using Axios
    axios
      .get(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`)
      .then((response) => {
        if (response.data.articles) {
          setArticles(response.data.articles);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [category]);

  return (

    <div className="news-cards-default">
        <div className='category-heading'>{category.toUpperCase()}</div>
      {articles.map((article, i) => (
        <Card key={i} article={article} />
      ))}
    </div>
  );
};

export default CategoryCards;