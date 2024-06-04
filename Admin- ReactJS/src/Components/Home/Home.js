import React, { Component } from "react";
import './Home.css';
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import NewCustomerModal from "./NewCustModal";
import { Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { database, ref, get, child, remove, query, orderByChild, equalTo } from '../../firebase';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            searchQuery: "",
            isModalOpen: false,
        };
    }

    componentDidMount() {
        this.fetchCustomers();
    }

    // Gemizei tin lista
    fetchCustomers = async () => {
        try {
            const dbRef = ref(database);
            const snapshot = await get(child(dbRef, 'customers'));
            if (snapshot.exists()) {
                const customersData = Object.keys(snapshot.val()).map(key => ({
                    id: key,
                    ...snapshot.val()[key]
                }));
                this.setState({ customers: customersData });
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    // Filtrarei tin lista oso grafeis
    getFilteredCustomers = () => {
        const { customers, searchQuery } = this.state;
        if (!searchQuery) {
            return customers;
        }
        return customers.filter(customer =>
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phone.includes(searchQuery)
        );
    }

    // Diagrafei ta entries apo tin firebase me to perasemno customerid
    deleteCustomer = async (id) => {
        try {
            
            await remove(ref(database, `customers/${id}`));
    
            const carsQuery = query(ref(database, 'car'), orderByChild('customerId'), equalTo(id));
            const carsSnapshot = await get(carsQuery);
            if (carsSnapshot.exists()) {
                const cars = carsSnapshot.val();
                for (const carId in cars) {
                    await remove(ref(database, `car/${carId}`));

                    const nextserviceQuery = query(ref(database, 'nextservice'), orderByChild('carId'), equalTo(carId));
                    const nextserviceSnapshot = await get(nextserviceQuery);
                    if (nextserviceSnapshot.exists()) {
                        const nextserviceEntries = nextserviceSnapshot.val();
                        for (const serviceId in nextserviceEntries) {
                            await remove(ref(database, `nextservice/${serviceId}`));
                        }
                    }

                    const doneserviceQuery = query(ref(database, 'doneservice'), orderByChild('carId'), equalTo(carId));
                    const doneserviceSnapshot = await get(doneserviceQuery);
                    if (doneserviceSnapshot.exists()) {
                        const doneserviceEntries = doneserviceSnapshot.val();
                        for (const serviceId in doneserviceEntries) {
                            await remove(ref(database, `doneservice/${serviceId}`));
                        }
                    }
                }
            }

            this.setState((prevState) => ({
                customers: prevState.customers.filter(customer => customer.id !== id)
            }));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    // Anoigei to Modal
    toggleModal = (callback) => {
        this.setState(prevState => ({
            isModalOpen: !prevState.isModalOpen
        }), callback);
    };

    render() {
        const filteredCustomers = this.getFilteredCustomers();

        return (
            <>
                <div className="header-container">
                    <h1 style={{ textDecorationLine: "underline" }}>Select Customer</h1>
                    <input
                        type="text"
                        placeholder="Search customers..."
                        className="search-input"
                        value={this.state.searchQuery}
                        onChange={(e) => this.setState({ searchQuery: e.target.value })}
                    />
                    <Button color="primary" className="newbutton" onClick={() => this.toggleModal()}>New</Button>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>City</th>
                            <th>Email</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.name}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.city}</td>
                                    <td>{customer.email}</td>
                                    <td>
                                        <input
                                            type="radio"
                                            name={`active_${customer.id}`}
                                            readOnly
                                            checked={customer.active}
                                        />
                                    </td>
                                    <td>
                                        <Button style={{ backgroundColor: '#007bff' }} onClick={() => this.deleteCustomer(customer.id)}><MdDelete /></Button>
                                        <Button style={{ marginLeft: '20px', backgroundColor: '#007bff' }} onClick={() => this.props.navigate('/Customers', { state: { customer } })}>
                                            <FaUserEdit />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No customers found</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <NewCustomerModal
                    isOpen={this.state.isModalOpen}
                    toggle={() => this.toggleModal(this.fetchCustomers)}
                />
            </>
        )
    }
}

export default (props) => {
    const navigate = useNavigate();
    return <Home {...props} navigate={navigate} />;
};
