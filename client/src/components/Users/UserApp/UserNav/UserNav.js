import React from "react";
import { Navbar, ListGroup, ListGroupItem, Nav, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./UserNav.scss";

const UserNav = (props) => {
  const links = [
    {
      name: "Search",
      icon: "fa fa-search mr-3 fa-lg text-white",
      disabled: true,
      link: "#",
    },
    {
      name: "Settings",
      icon: "fa fa-cog mr-3 fa-lg text-white",
      disabled: true,
      link: "#",
    },
    {
      name: "Past Orders",
      icon: "fa fa-list-ul mr-3 fa-lg text-white",
      disabled: true,
      link: '#',
    },
    {
      name: "Plan Event",
      icon: "fa fa-calendar mr-3 fa-lg text-white",
      disabled: true,
      link: "#",
    },
    {
      name: "Saved Plates",
      icon: "fa fa-bookmark mr-3 fa-lg text-white",
      disabled: true,
      link: '#',
    },
    {
      name: "Home (App Reset)",
      icon: "fa fa-home fa-lg mr-3 text-white",
      disabled: false,
      link: "/",
    },
  ];
  return (
    <div className={props.isOpen === true ? "d-block" : "d-none"}>
      <Nav className="user-nav" vertical>
        <Navbar light>
          <h5>Welcome, {props.name}</h5>
          <Button close={true} onClick={() => props.handleClick()} />
        </Navbar>
        <ListGroup>
          {links.map((link) => (
            <ListGroupItem
              key={link.name}
              disabled={link.disabled}
              
            >
              <Link to={link.link} className="text-dark">
                <i className={link.icon} />
                {link.name}
              </Link>
            </ListGroupItem>
          ))}
        </ListGroup>
        <small className="lead container fixed-bottom">
          *All of these links except the Home link just because this was
          intended to be prototype.*
        </small>
      </Nav>
    </div>
  );
};

export default UserNav;
