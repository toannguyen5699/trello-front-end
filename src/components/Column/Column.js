import React, { useState, useEffect } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form } from 'react-bootstrap'

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

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

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

  const handleColumnTitleChange = (e) => {
    console.log(e.target.value)
    setColumnTitle(e.target.value)
  }

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
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
              <Dropdown.Item>Add Card</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowModal}>Remove Column</Dropdown.Item>
              {/* <Dropdown.Item>Move all cards is this column</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="list-card">
        <Container
          // onDragStart={e => console.log('drag started', e)}
          // onDragEnd={e => console.log('drag end', e)}
          // onDragEnter={() => {
          //   console.log('drag enter:', column.id)
          // }}
          // onDragLeave={() => {
          //   console.log('drag leave:', column.id)
          // }}
          // onDropReady={p => console.log('Drop ready: ', p)}
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
      </div>
      <footer>
        <div className="footer-actions">
          <i className="fa fa-plus icon" />
          Add another card
        </div>
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
