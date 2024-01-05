import React, { useState, useEffect } from "react";
import "./styles.css";
import Card from "./Card";
import axios from "axios";
import { newapikey } from "./../config";

const CategoryCards = ({ category }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Make an API request using Axios
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${newapikey}`
      )
      .then((response) => {
        if (response.data.articles) {
          setArticles(response.data.articles);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [category]);

  return (
    <div className="news-cards-default">
      <div className="category-heading">{category.toUpperCase()}</div>
      {articles.map((article, i) => (
        <Card key={i} article={article} />
      ))}
    </div>
  );
};

export default CategoryCards;
