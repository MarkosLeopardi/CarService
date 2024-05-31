import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../Home/Home.css';
import { database, ref, push, set, remove } from '../../firebase';

const ComService = ({ isOpen, toggle, nextService }) => {
    const [comms, setComms] = useState('');
    const [miles, setMiles] = useState('');

    const handleSave = async () => {
        if (!nextService) return;

        const doneServiceRef = ref(database, 'doneservice');
        const nextServiceRef = ref(database, `nextservice/${nextService.id}`);

        try {
            const doneServiceSnapshot = await push(doneServiceRef);
            const doneServiceKey = doneServiceSnapshot.key;

            await set(ref(database, `doneservice/${doneServiceKey}`), { ...nextService, comms, miles });

            await remove(nextServiceRef);

            toggle();
        } catch (error) {
            console.error('Error completing service:', error);
        }
    };

    useEffect(() => {
        if (nextService) {
            setComms(nextService.comms || '');
            setMiles(nextService.miles || '');
        }
    }, [nextService]);

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader style={{ backgroundColor: '#A87676', color: 'white' }} toggle={toggle}>Complete Service</ModalHeader>
            <ModalBody>
                <input
                    type='text'
                    value={nextService?.date || ''}
                    className="form-control"
                    readOnly
                />
                <input
                    style={{ marginTop: '10px' }}
                    type="text"
                    placeholder="Mileage"
                    className="form-control"
                    value={miles}
                    onChange={(e) => setMiles(e.target.value)}
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
