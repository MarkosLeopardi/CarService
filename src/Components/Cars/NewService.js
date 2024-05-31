import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { database, ref, push, set } from '../../firebase';

const NewService = ({ isOpen, toggle, carId }) => {
    const [date, setDate] = useState('');
    const [type, setType] = useState('');

    const CalDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        return today.toISOString().split('T')[0];
    };

    const handleSave = async () => {
        const newService = { carId, date, type };
        try {
            const newServiceRef = push(ref(database, 'nextservice'));
            await set(newServiceRef, newService);
            toggle();
        } catch (error) {
            console.error('Error saving service:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader style={{ backgroundColor: '#A87676', color: 'white' }} toggle={toggle}>New Service</ModalHeader>
            <ModalBody>

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
                    <option value="">Select Type</option>
                    <option value="Big">Big</option>
                    <option value="Small">Small</option>
                    <option value="Oils">Oils</option>
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
