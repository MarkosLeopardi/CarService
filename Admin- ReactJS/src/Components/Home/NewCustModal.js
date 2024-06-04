import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Home.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { database, ref, push, set } from '../../firebase';

const NewCustomerModal = ({ isOpen, toggle }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setName('');
            setPhone('');
            setCity('');
            setEmail('');
            setPass('');
            setActive(false);
        }
    }, [isOpen]);

    const handleSave = async () => {
        const newCustomer = { name, phone, city, email, pass, active };
        const auth = getAuth(); 
        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;

            const newCustomerRef = push(ref(database, 'customers'));
            await set(newCustomerRef, { ...newCustomer, uid: user.uid });

            toggle(); 
        } catch (error) {
            console.error('Error saving customer:', error);
        }
    };
    
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader style={{backgroundColor: '#A87676', color: 'white'}} toggle={toggle}>New Customer</ModalHeader>
            <ModalBody>
                <input
                    type="text"
                    placeholder=" Full Name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    style={{marginTop: '20px'}}
                    type="text"
                    placeholder="Phone"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    style={{marginTop: '20px'}}
                    type="text"
                    placeholder="City"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <input
                    style={{marginTop: '20px'}}
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    style={{marginTop: '20px'}}
                    type="text"
                    placeholder="Password"
                    className="form-control"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <div style={{marginTop: '20px'}}>
                    <label>
                        Active:
                        <input
                            style={{marginLeft: '10px'}}
                            type="checkbox"
                            checked={active}
                            onChange={(e) => setActive(e.target.checked)}
                        />
                    </label>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSave}>Save</Button>
            </ModalFooter>
        </Modal>
    );
};

export default NewCustomerModal;
