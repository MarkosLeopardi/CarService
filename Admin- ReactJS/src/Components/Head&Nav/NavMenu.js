import React, { Component } from 'react';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

export class SideNavMenu extends Component {
  render() {
    return (
      <IconContext.Provider value={{ color: 'black' }}>
        <nav className="sidebar-nav">
          <div className="sidebar-wrap">
            {SidebarData.map((item, index) => (
              <SubMenu item={item} key={index} />
            ))}
          </div>
        </nav>
      </IconContext.Provider>
    );
  }
}