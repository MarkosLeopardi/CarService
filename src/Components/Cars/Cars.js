import React, { Component } from "react";
import './Cars.css';
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { Button } from 'reactstrap';
import { FaUserEdit } from "react-icons/fa";

export class Cars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            car: [
                { id: 1, plate: "NKZ1734", brand: "Renault Clio", year: "2008", miles: "178000", vin: "", engnum: "" },
                { id: 2, plate: "KOH2982", brand: "Citroen C3", year: "2005", miles: "150000", vin: "", engnum: "" },
            ],
            searchQuery: ""
        };
    }

    getfilter = () => {
        const { car, searchQuery } = this.state;
        if (!searchQuery) {
            return car;
        }
        return car.filter(car =>
            car.plate.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    deleteCar = (id) => {
        this.setState((prevState) => ({
            car: prevState.car.filter(car => car.id !== id)
        }));
    }



    render() {
        const filter = this.getfilter();

        return (
            <div>

                <div className="header-container">
                    <h1 style={{ textDecorationLine: "underline" }}>Select Car</h1>
                    <input
                        type="text"
                        placeholder="Search car..."
                        className="search-input"
                        value={this.state.searchQuery}
                        onChange={(e) => this.setState({ searchQuery: e.target.value })}
                    />
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>License Plate</th>
                            <th>Brand & Model</th>
                            <th>Manufacture Year</th>
                            <th>Mileage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filter.length > 0 ? (
                            filter.map((car) => (
                                <tr key={car.id}>
                                    <td>{car.plate}</td>
                                    <td>{car.brand}</td>
                                    <td>{car.year}</td>
                                    <td>{car.miles}</td>
                                    <td>
                                        <Button style={{ backgroundColor:'#007bff'}} onClick={() => this.deleteCar(car.id)}><MdDelete /></Button>
                                        <Button style={{ marginLeft: '20px',  backgroundColor:'#007bff' }} >
                                            <Link to={`/Cars/CarEdit`} style={{ color: 'white' }}>
                                                <FaUserEdit />
                                            </Link>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No customers found</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                
            </div>

        )
    }
}