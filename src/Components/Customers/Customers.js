import React, { Component } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button } from 'reactstrap';
import './Customers.css'
import NewCar from '../Cars/NewCar'

export class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            car: [
                { id: 1, plate: "NKZ1734", brand: "Renault Clio", year: "2008", miles: "178000", vin: "", engnum: "" },
                { id: 2, plate: "KOH2982", brand: "Citroen C3", year: "2005", miles: "150000", vin: "", engnum: "" },
                { id: 3, plate: "NKZ1734", brand: "Renault Clio", year: "2008", miles: "178000", vin: "", engnum: "" },
                { id: 4, plate: "NKZ1734", brand: "Renault Clio", year: "2008", miles: "178000", vin: "", engnum: "" },
                { id: 5, plate: "NKZ1734", brand: "Renault Clio", year: "2008", miles: "178000", vin: "", engnum: "" },
            ]
        };
    }

    toggleModal = () => {
        this.setState(prevState => ({
            isModalOpen: !prevState.isModalOpen
        }));
    };

    render() {
        const { car } = this.state;
        return (
            <>
                <div className="header-container">
                    <h1 style={{ textDecorationLine: "underline" }}>Customer Details</h1>
                </div>

                <div className="customer-details">
                    <img className="CustPic" src='../img/profile.png' alt="Profile" />
                    <div className="inputs">
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name" />
                        <input type="text" placeholder="Phone" />
                        <input type="text" placeholder="Email" />
                        <input type="text" placeholder="City" />
                        <div style={{ fontSize: '20px' }}>
                            <label for="active">Active:</label>
                            <input type="radio" style={{ width: '20px', height: '20px' }} />
                        </div>


                        <div className="car-list">
                            <div className="carshead">
                                <h3 style={{ textDecorationLine: "underline" }}>Car List</h3>
                                <Button style={{backgroundColor: '#007bff' }} className="newbutton" onClick={this.toggleModal}>New</Button>
                            </div>
                            <div className="scrollable">
                                <List>
                                    {car.map((carItem) => (
                                        <ListItem key={carItem.id}>
                                            <ListItemText
                                                primary={`${carItem.id} - ${carItem.plate} - ${carItem.brand}`}
                                                secondary={`${carItem.year}, ${carItem.miles}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        </div>


                    </div>
                </div>

                <NewCar isOpen={this.state.isModalOpen} toggle={this.toggleModal} />

            </>
        )
    }
}