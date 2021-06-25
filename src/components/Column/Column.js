import React from "react";

import "./Column.scss";
import Card from 'components/Card/Card';
import { mapOrder } from 'utilities/sorts';

function Column(props) {
  const {column} = props
  const cards = mapOrder(column.card, column.cardOder, 'id')

  return (
    <div className="column">
      <header>{column.title}</header>
      <ul className="list-card">
        {cards.map((card, index) => {
          return <Card key={index} card={card} />
        })}
      </ul>
      <footer>Add another card</footer>
    </div>
  );
}

export default Column;
