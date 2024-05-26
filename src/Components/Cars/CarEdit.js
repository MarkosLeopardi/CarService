import React, { Component } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from "@mui/material";
import { Button } from 'reactstrap';
import './Cars.css'
import ComService from "./ComService";
import NewService from "./NewService";
import { CiEdit } from "react-icons/ci";

export class CarEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service: [
                { id: 1, date: "15/08/2020", servtype: "Big", miles: "178000", comms: "Υμαντας Χρονισμου" },
                { id: 2, date: "12/04/2024", servtype: "Small", miles: "188000", comms: "Air-Condition" },
                { id: 3, date: "20/01/2024", servtype: "Oils", miles: "178450", comms: "Αλλαγη" },
                { id: 4, date: "20/01/2024", servtype: "Small", miles: "146466", comms: "Γενικο" },
                { id: 5, date: "11/05/2024", servtype: "Oils", miles: "134566", comms: "Αλλαγη" }
            ],
            newservice: [
                { id: 1, date: "15/08/2020", servtype: "Big", miles: "178000" },
                { id: 2, date: "12/04/2024", servtype: "Small", miles: "188000" },
                { id: 3, date: "20/01/2024", servtype: "Oils", miles: "178450" },
                { id: 4, date: "20/01/2024", servtype: "Small", miles: "146466" },
                { id: 5, date: "11/05/2024", servtype: "Oils", miles: "134566" }
            ]
        };
    }

    toggleNewServiceModal = () => {
        this.setState(prevState => ({
            isNewServiceModalOpen: !prevState.isNewServiceModalOpen
        }));
    };

    toggleComServiceModal = () => {
        this.setState(prevState => ({
            isComServiceModalOpen: !prevState.isComServiceModalOpen
        }));
    };

    render() {
        const { service, newservice } = this.state;

        return (
            <>
                <div className="header-container">
                    <h1 style={{ textDecorationLine: "underline" }}>Car Details</h1>
                </div>

                <div className="car-details">
                    <img className="carpic" src='/img/carprof.png' />
                    <div className="inputs">
                        <input type="text" placeholder="License Plate" />
                        <input type="text" placeholder="Brand & Model" />
                        <input type="text" placeholder="Year" />
                        <input type="text" placeholder="Mileage" />
                        <input type="text" placeholder="Vehicle Identification Number" />
                        <input type="text" placeholder="Engine Number" />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Button style={{ backgroundColor: '#007bff', width: '20%', }}>Edit</Button>

                            <div className="service-list" style={{ display: 'flex', flexDirection: 'row' }}>

                                {/* List with all the service done*/}

                                <div className="servicehead" style={{ width: '500px' }}>
                                    <h3 style={{ textDecorationLine: "underline", marginBottom: '55px' }}>Service List</h3>
                                    <div className="scrollable">
                                        <List>
                                            {service.map((service) => (
                                                <ListItem key={service.id}>
                                                    <ListItemText
                                                        primary={`${service.id} - ${service.date} `}
                                                        secondary={`${service.servtype}, ${service.miles}, ${service.comms}`} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </div>
                                </div>

                                {/* List with all the next services*/}
                                <div className="next-service" style={{ width: '500px', marginLeft: "120px" }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <h3 style={{ textDecorationLine: "underline" }}>Next Service</h3>
                                        <Button style={{ backgroundColor: '#007bff', width: '20%', marginBottom: '10px' }} className="newbutton" onClick={this.toggleNewServiceModal}>New</Button>
                                    </div>
                                    <div className="scrollable">
                                        <List>
                                            {newservice.map((newservice) => (
                                                <ListItem key={service.id} style={{ display: 'flex' }}>
                                                    <ListItemText
                                                        primary={`${newservice.id} - ${newservice.date} `}
                                                        secondary={`${newservice.servtype}, ${newservice.miles}`}
                                                        style={{ width: '85%' }} />
                                                    <ListItemButton style={{ backgroundColor: '#007bff', color: 'white' }} onClick={this.toggleComServiceModal}><CiEdit /></ListItemButton>
                                                </ListItem>

                                            ))}

                                        </List>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <ComService isOpen={this.state.isComServiceModalOpen} toggle={this.toggleComServiceModal} />
                <NewService isOpen={this.state.isNewServiceModalOpen} toggle={this.toggleNewServiceModal} />
            </>
        )
    }
}