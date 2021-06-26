import React from 'react'

import './Card.scss'

function Card(props) {
  const { card } = props

  return (
    <div className="card-item">
      {card.cover && (
        <img 
          src={card.cover} 
          alt="toannguyen-trello"
          className="card-cover"
          onMouseDown={e => e.preventDefault()}
        />
      )}
      <div className="title-card">Title: {card.title}</div>
    </div>
  )
}

export default Card
