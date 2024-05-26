import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../Home/Home.css';

const ComService = ({ isOpen, toggle }) => {
    const [comms, setComms] = useState('');

    const handleSave = () => {
        const newCustomer = { comms };
        // Here you should call a function passed from parent to actually add this customer
        toggle();
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader style={{ backgroundColor: '#A87676', color: 'white' }} toggle={toggle}>Complete Service</ModalHeader>
            <ModalBody>
                <input
                    type='text'
                    placeholder='Date'
                    className="form-control"
                />
                <input
                    style={{ marginTop: '10px' }}
                    type="text"
                    placeholder="Comments"
                    className="form-control"
                    value={comms}
                    onChange={(e) => setComms(e.target.value)}
                />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSave}>Save</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ComService;