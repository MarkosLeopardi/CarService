import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const NewService = ({ isOpen, toggle }) => {
    const [miles, setPlate] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const CalDate = () => {
        const today = new Date();
        today.setDate(today.getDate() +1);
        return today.toISOString().split('T')[0];
    };
    const handleSave = () => {
        const newCar = { miles, date, type};
        // Here you should call a function passed from parent to actually add this customer
        toggle();
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader style={{backgroundColor: '#A87676', color: 'white'}} toggle={toggle}>New Service</ModalHeader>
            <ModalBody>
                <input
                    type="text"
                    placeholder="Mileage"
                    className="form-control"
                    value={miles}
                    onChange={(e) => setPlate(e.target.value)}
                />
                <input
                    style={{ marginTop: '20px' }}
                    type="date"
                    placeholder="Date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={CalDate()}
                />
                <select
                style={{ marginTop: '20px' }}
                className="form-control"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="">Big</option>
                <option value="">Small</option>
                <option value="">Oils</option>
                
            </select>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSave}>Save</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default NewService;