import React, { Component } from "react";
import './Home.css';
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import NewCustomerModal from "./NewCustModal";
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [
                { id: 1, name: "John", surname: "Doe", phone: "1234567890", city: "New York", email: "john@example.com", active: true },
                { id: 2, name: "Jane", surname: "Smith", phone: "0987654321", city: "Los Angeles", email: "jane@example.com", active: false },
            ],
            searchQuery: "",
            isModalOpen: false,
        };
    }

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

    deleteCustomer = (id) => {
        this.setState((prevState) => ({
            customers: prevState.customers.filter(customer => customer.id !== id)
        }));
    }

    toggleModal = () => {
        this.setState(prevState => ({
            isModalOpen: !prevState.isModalOpen
        }));
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
                    <Button color="primary" className="newbutton" onClick={this.toggleModal}>New</Button>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
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
                                    <td>{customer.surname}</td>
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
                                        <Button style={{ backgroundColor:'#007bff'}} onClick={() => this.deleteCustomer(customer.id)}><MdDelete /></Button>
                                        <Button style={{ marginLeft: '20px',  backgroundColor:'#007bff' }} >
                                            <Link to={`/Customers`} style={{color: 'white'}}>
                                                <FaUserEdit />
                                            </Link>
                                        </Button>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No customers found</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <NewCustomerModal isOpen={this.state.isModalOpen} toggle={this.toggleModal} />
            </>

        )
    }
}