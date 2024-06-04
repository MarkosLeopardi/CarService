import React, { Component } from "react";
import { Container } from "reactstrap";
import { Header } from './Components/Head&Nav/Header';
import { SideNavMenu } from "./Components/Head&Nav/NavMenu";
import './Layout.css';

export class Layout extends Component {
    render() {
        return (
            <div className="layout-container">
                <div className="header">
                    <Header />
                </div>
                <div className="main-content">
                    <SideNavMenu />
                    <div className="content">
                        <Container tag='main'>
                            {this.props.children}
                        </Container>
                    </div>
                </div>
            </div>
        );
    }
}