import React, { Component } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button } from 'reactstrap';
import './Customers.css';
import NewCar from '../Cars/NewCar';
import { useLocation } from "react-router-dom";
import { database, ref, update, onValue } from '../../firebase';


class Customers extends Component {
    constructor(props) {
        super(props);
        const location = props.location;
        this.state = {
            car: [],
            customer: location.state.customer || {},
            isModalOpen: false,
        };
    }
    
    toggleModal = () => {
        this.setState(prevState => ({
            isModalOpen: !prevState.isModalOpen
        }));
    };

    handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        this.setState({
            customer: {
                ...this.state.customer,
                [name]: val
            }
        });
    };

    updateCustomer = async () => {
        const { customer } = this.state;
        try {
            const customerRef = ref(database, `customers/${customer.id}`);
            await update(customerRef, customer);
        } catch (error) {
            console.error("Error updating customer: ", error);
            alert('Failed to update customer');
        }
    };

    componentDidMount() {
        this.fetchCars();
    }

    fetchCars = () => {
        const { customer } = this.state;
        const carsRef = ref(database, 'car');
        onValue(carsRef, (snapshot) => {
            const cars = [];
            snapshot.forEach((childSnapshot) => {
                const carData = childSnapshot.val();
                if (carData.customerId === customer.id) {
                    cars.push({ id: childSnapshot.key, ...carData });
                }
            });
            this.setState({ car: cars });
        });
    };

    render() {
        const { car, customer } = this.state;
        return (
            <>
                <div className="header-container">
                    <h1 style={{ textDecorationLine: "underline" }}>Customer Details</h1>
                </div>

                <div className="customer-details">
                    <img className="CustPic" src='../img/profile.png' alt="Profile" />
                    <div className="inputs">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={customer.name || ''}
                            onChange={this.handleInputChange}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={customer.phone || ''}
                            onChange={this.handleInputChange}
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={customer.email || ''}
                            readOnly
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={customer.city || ''}
                            onChange={this.handleInputChange}
                        />
                        <div style={{ fontSize: '20px' }}>
                            <label htmlFor="active">Active:</label>
                            <input
                                type="checkbox"
                                name="active"
                                style={{ width: '20px', height: '20px' }}
                                checked={customer.active || false}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <Button
                            style={{ backgroundColor: '#007bff' }}
                            className="newbutton"
                            onClick={this.updateCustomer}
                        >
                            Update
                        </Button>

                        <div className="car-list">
                            <div className="carshead" style={{ display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ textDecorationLine: "underline" }}>Car List</h3>
                                <Button
                                    style={{ backgroundColor: '#007bff' }}
                                    className="newbutton"
                                    onClick={this.toggleModal}
                                >
                                    New
                                </Button>
                            </div>
                            <div className="scrollable">
                                <List>
                                    {car.map((carItem) => (
                                        <ListItem key={carItem.id}>
                                            <ListItemText
                                                primary={`${carItem.plate} - ${carItem.brand}`}
                                                secondary={`${carItem.year}, ${carItem.miles}`}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        </div>
                    </div>
                </div>

                <NewCar isOpen={this.state.isModalOpen} toggle={this.toggleModal} customerId={customer.id}/>
            </>
        );
    }
}

export default (props) => {
    const location = useLocation();
    return <Customers {...props} location={location} />;
};

