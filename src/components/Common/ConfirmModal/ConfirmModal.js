import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import HTMLReactParser from 'html-react-parser'

import { CONFIRM_MODAL, REJECT_MODAL} from 'utilities/constants'

function ConfirmModal(props) {
  const { title, content, show, onAction } = props

  return (
    <Modal show={show} onHide={() => onAction(REJECT_MODAL)} backdrop="static" keyboard={false} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{HTMLReactParser(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onAction(REJECT_MODAL)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onAction(CONFIRM_MODAL)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
