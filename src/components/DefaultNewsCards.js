import React from 'react'
import "./styles.css"
import Card from "./Card"

const NewsCardsDefault = ({articles}) => {
  return (
    <div className='news-cards-default'>
    {
      articles.map((article,i) =>(
        <Card key={i} article={article}/>
      ))
    }    
    </div>
  )
}

export default NewsCardsDefault
