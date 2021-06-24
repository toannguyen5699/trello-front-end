import React from "react";

import "./Column.scss";
import Task from 'components/Task/Task'

function Column() {
  return (
    <div className="column">
      <header>Header_column</header>
      <ul className="list-task">
        <Task />
        <li className="task-item">title_column</li>
        <li className="task-item">title_columnqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq</li>
        <li className="task-item">title_column</li>
        <li className="task-item">title_column</li>
      </ul>
      <footer>Add another card</footer>
    </div>
  );
}

export default Column;
