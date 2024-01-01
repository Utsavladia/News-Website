import { useEffect, useState, useRef } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import "./index.css";
import NewsCards from "./components/NewsCards";
import DefaultNewsCards from "./components/DefaultNewsCards";
import axios from "axios";
import Navbar from "./components/Navbar";
import CategoryCards from "./components/CategoryCards";
import dotenv from "dotenv";

dotenv.config();

function App() {
  const [articles, setArticles] = useState([]);
  const alanBtnRef = useRef({}).current;
  const newsapikey = process.env.REACT_APP_NEWS_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsapikey}`
      )
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });

    alanBtnRef.btnInstance = alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,

      onCommand: async ({ command, category }) => {
        if (command === "categories") {
          try {
            const response = await axios.get(
              `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsapikey}&category=${category}`
            );
            setArticles(response.data.articles);
          } catch (error) {
            console.log("error fetching categgory", category, error);
          }

          // Call the client code that will react to the received command
          // } else if (command === "confirmation" && articles) {
          //   console.log("Received confirmation command with articles:", articles);
          //   const articlesText = articles
          //     .map((article) => article.title)
          //     .join(". "); // Concatenate titles
          //   alanBtnRef.btnInstance.playText(
          //     `Hi, these are the article titles: ${articlesText}`
          //   );
        } else if (command === "topic") {
          try {
            const response = await axios.get(
              `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsapikey}&q=${category}`
            );
            setArticles(response.data.articles);
          } catch (error) {
            console.log("returned with the error", error);
          }
        }
      },
    });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <NewsCards />
      <DefaultNewsCards articles={articles} />
      <section id="Business">
        <CategoryCards category={"business"} />
      </section>
      <section id="Entertainment">
        <CategoryCards category={"entertainment"} />
      </section>
      <section id="Health">
        <CategoryCards category={"health"} />
      </section>
      <section id="Technology">
        <CategoryCards category={"technology"} />
      </section>
      <section id="Sports">
        <CategoryCards category={"sports"} />
      </section>
    </div>
  );
}

export default App;
