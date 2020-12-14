import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ConfirmationModal = (props) => {
    const {
        isOpen,
        close,
        confirm,
        message,
        title,
    } = props;
    return (
        <Modal isOpen={isOpen} toggle={close}>
            <ModalHeader toggle={close}>{title}</ModalHeader>
            <ModalBody>
                {message}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={confirm}>Yes</Button>
                <Button color="secondary" onClick={close}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}


export default ConfirmationModal;