import React, { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form, Button } from 'react-bootstrap'
import { cloneDeep } from 'lodash'

import './Column.scss'
import Card from 'components/Card/Card'
import { mapOrder } from 'utilities/sorts'
import ConfirmModal from 'components/Common/ConfirmModal/ConfirmModal'
import { saveContentPressEnter, selectAllInlineText} from 'utilities/contentEditable'
import { CONFIRM_MODAL, REJECT_MODAL } from 'utilities/constants'

function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props
  const cards = mapOrder(column.card, column.cardOder, 'id')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnTitleChange = (e) => {
    setColumnTitle(e.target.value)
  }

  const [isInputCard, setIsInputCard] = useState(false)
  const toggleOpenInput = () => {
    setIsInputCard(!isInputCard)
  }

  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitleChange = (e) => {
    setNewCardTitle(e.target.value)
  }

  const newCardTextareaRef = useRef(null)

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  useEffect(() => {
    if (newCardTextareaRef && newCardTextareaRef.current) {
      newCardTextareaRef.current.focus()
      newCardTextareaRef.current.select()
    }
  }, [isInputCard])

  const toggleShowModal = () => {
    setShowConfirmModal(!showConfirmModal)
  }

  const onConfirmAction = (actionType) => {
    toggleShowModal()
    if (actionType === CONFIRM_MODAL) {
      const newColumn = {
        ...column,
        _destroy:true
      }
      onUpdateColumn(newColumn)
    }
  }

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
  }

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextareaRef.current.focus()
      return
    }
    // Hard code
    const newCardToAdd = {
      id: Math.random().toString(36).substr(2, 5), // 5 random characters
      boardId: column.boardId,
      columnId: column.id,
      title: newCardTitle.trim(),
      cover: null
    }

    let newColumns = cloneDeep(column) // kahc vowis {...column} ko thay doi data goc
    newColumns.card.push(newCardToAdd)
    newColumns.cardOder.push(newCardToAdd.id)

    onUpdateColumn(newColumns)

    // newColumnsToAdd(newColumns)
    setIsInputCard('')
    toggleOpenInput()
  }

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            size="sm"
            type="text"
            className="change-title-editable"
            value={columnTitle}
            spellCheck="false"
            onClick={selectAllInlineText}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur} // press outside auto save title
            onKeyDown={saveContentPressEnter}
            onMouseDown={e => e.preventDefault()} // when drag drop not focus input
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle size="sm" id="dropdown-basic" className="dropdown-btn" />

            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleOpenInput}>Add Card</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowModal}>Remove Column</Dropdown.Item>
              {/* <Dropdown.Item>Move all cards is this column</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="list-card">
        <Container
          groupName="col"
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
          getChildPayload={index =>
            cards[index]
          }
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
        {
          isInputCard &&
          <div className="add-new-card-area">
            <Form.Control
              size="sm"
              as="textarea"
              row="3"
              placeholder="Enter title card"
              className="input-new-card"
              ref={newCardTextareaRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={event => (event.key === 'Enter') && addNewCard()}
            />
          </div>
        }
      </div>
      <footer>
        {
          isInputCard &&
          <div className="add-new-card-action">
            <Button variant="success" size="sm" onClick={addNewCard}>Add Card</Button>
            <span className="btn-trash-icon" onClick={toggleOpenInput}>
              <i className="fa fa-trash icon" />
            </span>
          </div>
        }
        {
          !isInputCard &&
          <div className="footer-actions" onClick={toggleOpenInput}>
            <i className="fa fa-plus icon" />
            Add another card
          </div>
        }
      </footer>

      <ConfirmModal 
        show={showConfirmModal}
        onAction={onConfirmAction}
        title="Remove Column"
        content={`Are you sure want to remove <strong>${column.title}</strong>! <br /> All relate cards will be remove`}
      />
    </div>
  )
}

export default Column
