import React, { useState } from "react";
import { TabPane, TabContent, Nav, NavItem, NavLink} from "reactstrap";
import "../../../App.css"

import Groups from "./Groups/Groups";
import Customers from "./Customers/Customers";


const SidebarNav = props => {

  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const navItems = [
    {
      tab: "1",
      icon: "fas fa-chair fa-lg",
      tabName: "Current Groups"
    },
    {
      tab: "2",
      icon: "fas fa-users fa-lg",
      tabName: "All Customers"
    }
  ];


  return (
    <div className="col-lg-3 border-left border-secondary">
      <Nav
        pills
        justified
        className="bg-light border-bottom border-secondary nav-hover"
      >
        {navItems.map((item, i) => (
          <NavItem key={i} >
            <NavLink
              onClick={() => toggle(item.tab)}
              className={activeTab === item.tab ? "text-white" : ""}
            >
                <i className={item.icon} />
                <br />
                <span className="small">{item.tabName}</span>
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <TabContent activeTab={activeTab} className="bg-light">
    
        <TabPane tabId="1" style={{height:'calc(100vh - 65px)'}}>
          <Groups seatings={props.seatings} booths={props.booths} putSeatingToBooth={props.putSeatingToBooth} deleteSeating={props.deleteSeating}/>
        </TabPane>
        <TabPane tabId="2" style={{height:'calc(100vh - 65px)'}}>
          <Customers customers={props.customers} deleteCustomer={props.deleteCustomer} postCustomer={props.postCustomer} />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default SidebarNav;
