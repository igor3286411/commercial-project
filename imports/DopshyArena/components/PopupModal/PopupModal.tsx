import React, { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';

export function PopupModal(props: {
    show: boolean;
    onHide?(): void;
    content: ReactNode;
    title: string;
    closeButton: boolean;
    size?: "lg" | 'undefined';
}) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size={props.size === undefined ? 'lg' : undefined}
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Header closeButton={props.closeButton}>
                <Modal.Title id='contained-modal-title-vcenter'>
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ paddingBottom: '2rem' }}>{props.content}</Modal.Body>
            <Modal.Footer>
                {/* <Button onClick={() => props.onHide()}>Close</Button> */}
            </Modal.Footer>
        </Modal>
    );

}
