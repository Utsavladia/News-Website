import React from 'react'
import "./styles.css"


function timeAgo(timestamp) {
    const currentDate = new Date();
    const providedDate = new Date(timestamp);
  
    const timeDifferenceInSeconds = Math.floor((currentDate - providedDate) / 1000);
  
    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} second${timeDifferenceInSeconds !== 1 ? 's' : ''} ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  }

const Card = ({article}) => {

const timestamp = article.publishedAt;
const time = timeAgo(timestamp)
  return (
    <div className='news-card'>
    <img src={article.urlToImage} alt="latest news" />
    <h4 className='card-title'>{article.title}</h4>
    {/* <p className='card-description'>{article.description}</p> */}
    <div className='card-bottom'>
        <div className='left-source'>
            <span className='card-source'>{article.source.name}</span>
            <span className='card-date'>{time}</span>
        </div>
        <button className='card-button'>Read more</button>
        
    </div>


    
      
    </div>
  )
}

export default Card
