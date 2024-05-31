import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { database, ref, push, set } from '../../firebase';



const NewCar = ({ isOpen, toggle }) => {
    const [plate, setPlate] = useState('');
    const [brand, setBrand] = useState('');
    const [year, setYear] = useState('');
    const [miles, setMiles] = useState('');
    const [vin, setVin] = useState('');
    const [engnum, setEngnum] = useState('');
    const [photo, setPhoto] = useState('');



    const handleSave = async () => {
        const newCar = { plate, brand, year, miles, vin, engnum, photo};
        try {
            const newCarRef = push(ref(database, 'car'));
            await set(newCarRef, newCar);
            
            toggle();
        } catch (error) {
            console.error('Error saving customer:', error);
        }
    };




    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader style={{backgroundColor: '#A87676', color: 'white'}} toggle={toggle}>New Car</ModalHeader>
            <ModalBody>
                <input
                    type="text"
                    placeholder=" License Plate"
                    className="form-control"
                    value={plate}
                    onChange={(e) => setPlate(e.target.value)}
                />
                <input
                    style={{ marginTop: '20px' }}
                    type="text"
                    placeholder="Brand & Model"
                    className="form-control"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />
                <input
                    style={{ marginTop: '20px' }}
                    type="text"
                    placeholder="Manufacture Year"
                    className="form-control"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <input
                    style={{ marginTop: '20px' }}
                    type="text"
                    placeholder="Mileage"
                    className="form-control"
                    value={miles}
                    onChange={(e) => setMiles(e.target.value)}
                />
                <input
                    style={{ marginTop: '20px' }}
                    type="text"
                    placeholder="Vehicle Identification Number"
                    className="form-control"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                />
                <input
                    style={{ marginTop: '20px' }}
                    type="text"
                    placeholder="Engine Number"
                    className="form-control"
                    value={engnum}
                    onChange={(e) => setEngnum(e.target.value)}
                />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSave}>Save</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default NewCar;