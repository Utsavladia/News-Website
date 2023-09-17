import { useEffect ,useState} from "react";
import alanBtn from '@alan-ai/alan-sdk-web';
import "./index.css";
import NewsCards from "./components/NewsCards";
import DefaultNewsCards from "./components/DefaultNewsCards"
import axios from 'axios';


function App() {
  const [articles, setArticles] = useState([]);


  useEffect(() => {

    axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=8eff3dce9187433185d08ea38a6ecfba')
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });

      
    alanBtn({
        key: '4e0e6c32e4834da58a2f29062e59483a2e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: (commandData) => {

          if (commandData.command === 'go:back') {

            // Call the client code that will react to the received command
          }

        }
    });
  }, []);



  return (
    <div className="App">
      <NewsCards />
      <DefaultNewsCards articles={articles}/>
      
    </div>
  );
}

export default App;
