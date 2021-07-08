import React, { useState, useEffect, useRef, useCallback } from 'react';
import { isEmpty } from 'lodash';
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap';

import './BoardContent.scss';
import Column from 'components/Column/Column';
import { mapOrder } from 'utilities/sorts';
import { initialData } from 'actions/initialData';
import { applyDrag } from 'utilities/dragDrop';

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [isInput, setIsInput] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const onNewColumnTitleChange = useCallback((e) => {
    setNewColumnTitle(e.target.value)
  }, [])

  const newColumnInputRef = useRef(null)

  useEffect(() => {
    const boardFromDB = initialData.boards.find(
      (board) => board.id === 'board-1'
    );
    if (boardFromDB) {
      setBoard(boardFromDB);

      // sort column theo columnOrder
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'));
    }
  }, []);

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select()
    }
  }, [isInput]);

  if (isEmpty(board)) {
    return <div className="not-found">Board not found!</div>;
  }

  // Set gia tri thu tu khi drop
  const newColumnsToAdd = (newColumns) => {
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map((c) => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult)

    newColumnsToAdd(newColumns)
  }

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];
      let currentColumn = newColumns.find((c) => c.id === columnId);
      currentColumn.card = applyDrag(currentColumn.card, dropResult);
      currentColumn.cardOder = currentColumn.card.map((i) => i.id);

      setColumns(newColumns);
    }
  }

  const toggleOpenInput = () => {
    setIsInput(!isInput)
  }

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
      return
    }
    // Hard code
    const newColumnToAdd = {
      id: Math.random().toString(36).substr(2, 5), // 5 random characters
      boardId:board.id,
      title: newColumnTitle.trim(),
      cardOder: [],
      card: []
    }

    let newColumns = [...columns]
    newColumns.push(newColumnToAdd)

    newColumnsToAdd(newColumns)
    setNewColumnTitle('')
    toggleOpenInput()
  }

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'cards-drop-preview',
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column column={column} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>
      <BootstrapContainer className="board-container">
        {!isInput && 
        <Row>
          <Col className="add-column" onClick={toggleOpenInput}>
            <i className="fa fa-plus icon" />
            Add Another Column
          </Col>
        </Row>
        }
        {isInput && 
        <Row>
          <Col className="add-name-column">
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter title"
              className="input-title-column"
              ref={newColumnInputRef}
              value={newColumnTitle}
              onChange={onNewColumnTitleChange}
              onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
            />
            <Button variant="success" size="sm" onClick={addNewColumn}>Add Column</Button>
            <span className="cancel-new-column">
              <i className="fa fa-trash icon" onClick={toggleOpenInput} />
            </span>
          </Col>
        </Row>
        }
      </BootstrapContainer>
    </div>
  );
}

export default BoardContent;
