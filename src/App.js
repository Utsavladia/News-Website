import { useEffect, useState, useRef } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import "./index.css";
import NewsCards from "./components/NewsCards";
import DefaultNewsCards from "./components/DefaultNewsCards";
import axios from "axios";
import Navbar from "./components/Navbar";
import CategoryCards from "./components/CategoryCards";
import { alanapikey, newapikey } from "./config";

function App() {
  const [articles, setArticles] = useState([]);
  const newsapikey = newapikey;

  const alanBtnRef = useRef({}).current;

  useEffect(() => {
    console.log("REACT_APP_NEWS_API_KEY:", newapikey);

    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newapikey}`
      )
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });

    alanBtnRef.btnInstance = alanBtn({
      key: alanapikey,

      onCommand: async ({ command, category }) => {
        if (command === "categories") {
          try {
            const response = await axios.get(
              `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newapikey}&category=${category}`
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
              `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newapikey}&q=${category}`
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
