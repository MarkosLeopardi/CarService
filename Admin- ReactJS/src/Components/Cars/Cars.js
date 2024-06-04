import React, { Component } from "react";
import './Cars.css';
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { Button } from 'reactstrap';
import { FaUserEdit } from "react-icons/fa";
import { database, ref, get, child, remove, equalTo, query, orderByChild } from '../../firebase';


class Cars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            car: [],
            searchQuery: ""
        };
    }

    componentDidMount() {
        this.fetchCars();
    }

    // Gemizei tin lista
    fetchCars = async () => {
        try {
            const dbRef = ref(database);
            const snapshot = await get(child(dbRef, 'car'));
            if (snapshot.exists()) {
                const carsData = Object.keys(snapshot.val()).map(key => ({
                    id: key,
                    ...snapshot.val()[key]
                }));
                this.setState({ car: carsData });
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.error('Error fetching car:', error);
        }
    };
    
    // Filtrarei tin lista oso grafeis
    getfilterCars = () => {
        const { car, searchQuery } = this.state;
        if (!searchQuery) {
            return car;
        }
        return car.filter(car =>
            car.plate.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Diagrafei ta entries apo tin firebase me to perasemno customerid
    deleteCar = async (id) => {
        try {
            await remove(ref(database, `car/${id}`));

             const nextserviceQuery = query(ref(database, 'nextservice'), orderByChild('carId'), equalTo(id));
             const nextserviceSnapshot = await get(nextserviceQuery);
             if (nextserviceSnapshot.exists()) {
                 const nextserviceEntries = nextserviceSnapshot.val();
                 for (const serviceId in nextserviceEntries) {
                     await remove(ref(database, `nextservice/${serviceId}`));
                 }
             }

             const doneserviceQuery = query(ref(database, 'doneservice'), orderByChild('carId'), equalTo(id));
             const doneserviceSnapshot = await get(doneserviceQuery);
             if (doneserviceSnapshot.exists()) {
                 const doneserviceEntries = doneserviceSnapshot.val();
                 for (const serviceId in doneserviceEntries) {
                     await remove(ref(database, `doneservice/${serviceId}`));
                 }
             }

            this.setState((prevState) => ({
                car: prevState.car.filter(car => car.id !== id)
            }));
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    }  

    render() {
        const filtercars = this.getfilterCars();

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
                        {filtercars.length > 0 ? (
                            filtercars.map((car) => (
                                <tr key={car.id}>
                                    <td>{car.plate}</td>
                                    <td>{car.brand}</td>
                                    <td>{car.year}</td>
                                    <td>{car.miles}</td>
                                    <td>
                                        <Button style={{ backgroundColor:'#007bff'}} onClick={() => this.deleteCar(car.id)}><MdDelete /></Button>
                                        <Button style={{ marginLeft: '20px',  backgroundColor:'#007bff' }} onClick={() => this.props.navigate('/Cars/CarEdit', { state: { car } })}>
                                                <FaUserEdit />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No cars found</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                
            </div>

        )
    }
}

export default (props) => {
    const navigate = useNavigate();
    return <Cars {...props} navigate={navigate} />;
};