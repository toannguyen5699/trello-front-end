import React from "react";

import "./Card.scss";

function Card(props) {
  const { card } = props

  return (
    <li className="card-item">
      {card.cover && <img
        src={card.cover}
        alt="toannguyen-trello"
        className="card-cover"
      />}
      
      <div className="title-card">Title: {card.title}</div>
    </li>
  );
}

export default Card;
