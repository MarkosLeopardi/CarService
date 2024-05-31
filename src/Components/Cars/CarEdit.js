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
import { useLocation } from "react-router-dom";
import { database, ref, update } from '../../firebase';

class CarEdit extends Component {
    constructor(props) {
        super(props);
        const location = props.location;
        this.state = {
            car: location.state.car || {},
            service: [],
            newservice: [],
            isNewServiceModalOpen: false,
            isComServiceModalOpen: false
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

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            car: {
                ...this.state.car,
                [name]: value
            }
        });
    };

    updateCar = async () => {
        const { car } = this.state;
        try {
            const carRef = ref(database, `car/${car.id}`);
            await update(carRef, car);
            alert('Car updated successfully');
        } catch (error) {
            console.error("Error updating car: ", error);
            alert('Failed to update car');
        }
    };

    render() {
        const { car, service, newservice } = this.state;

        return (
            <>
                <div className="header-container">
                    <h1 style={{ textDecorationLine: "underline" }}>Car Details</h1>
                </div>

                <div className="car-details">
                    <img className="carpic" src='/img/carprof.png' alt="Car Profile" />
                    <div className="inputs">
                        <input
                            type="text"
                            value={car.plate || ''}
                            placeholder="Plate"
                            name="plate"
                            onChange={this.handleInputChange}
                        />
                        <input
                            type="text"
                            value={car.brand || ''}
                            placeholder="Brand & Model"
                            name="brand"
                            onChange={this.handleInputChange}
                        />
                        <input
                            type="text"
                            value={car.year || ''}
                            placeholder="Manufacture Year"
                            name="year"
                            onChange={this.handleInputChange}
                        />
                        <input
                            type="text"
                            value={car.miles || ''}
                            placeholder="Mileage"
                            name="miles"
                            onChange={this.handleInputChange}
                        />
                        <input
                            type="text"
                            value={car.vin || ''}
                            placeholder="Vehicle Identification Number"
                            name="vin"
                            onChange={this.handleInputChange}
                        />
                        <input
                            type="text"
                            value={car.engnum || ''}
                            placeholder="Engine Number"
                            name="engnum"
                            onChange={this.handleInputChange}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Button
                                style={{ backgroundColor: '#007bff', width: '20%' }}
                                onClick={this.updateCar}
                            >
                                Edit
                            </Button>

                            <div className="service-list" style={{ display: 'flex', flexDirection: 'row' }}>

                                {/* List with all the service done*/}
                                <div className="servicehead" style={{ width: '500px' }}>
                                    <h3 style={{ textDecorationLine: "underline", marginBottom: '55px' }}>Service List</h3>
                                    <div className="scrollable">
                                        <List>
                                            {service.map((service) => (
                                                <ListItem key={service.id}>
                                                    <ListItemText
                                                        primary={`${service.id} - ${service.date}`}
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
                                        <Button
                                            style={{ backgroundColor: '#007bff', width: '20%', marginBottom: '10px' }}
                                            className="newbutton"
                                            onClick={this.toggleNewServiceModal}
                                        >
                                            New
                                        </Button>
                                    </div>
                                    <div className="scrollable">
                                        <List>
                                            {newservice.map((newservice) => (
                                                <ListItem key={newservice.id} style={{ display: 'flex' }}>
                                                    <ListItemText
                                                        primary={`${newservice.id} - ${newservice.date}`}
                                                        secondary={`${newservice.servtype}, ${newservice.miles}`}
                                                        style={{ width: '85%' }} />
                                                    <ListItemButton
                                                        style={{ backgroundColor: '#007bff', color: 'white' }}
                                                        onClick={this.toggleComServiceModal}
                                                    >
                                                        <CiEdit />
                                                    </ListItemButton>
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
        );
    }
}

export default (props) => {
    const location = useLocation();
    return <CarEdit {...props} location={location} />;
};
