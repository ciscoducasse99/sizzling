import React, { Component } from "react";
import Div100vh from "react-div-100vh";
import SidebarNav from "../Host/SidebarNav/index";
import Main from "./Main";

import {
  getAllTables,
  getAllSeatings,
  putSeatingToBooth,
  deleteSeatingFromBooth,
  deleteUnseatedSeating
} from "../../actions/tableActions";
import {
  getAllCustomers,
  postCustomer,
  deleteCustomer,
} from "../../actions/customerActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Host extends Component {
  constructor(){
    super();

    this.state={
      windowWidth:0
    }

    window.addEventListener("resize", this.update);
  }

  // Loading in data from apis and the store
  componentDidMount() {
    this.props.getAllTables();
    this.props.getAllCustomers();
    this.props.getAllSeatings();

    this.update();
  }

  update = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
  };
  render() {
    return (
      <>
      {this.state.windowWidth < 550 ? (
        <div
          className="d-flex container justify-content-center align-items-center"
          style={{ height: window.innerHeight }}
        >
          <div className="text-center">
          <i className="fa fa-exclamation-triangle fa-4x mb-3" />
          <h6>
            This page is meant to be a replication of a tablet/desktop app. Please
            revisit on a tablet or computer.
          </h6>
          </div>
        </div>
      ) : (
      <Div100vh className="row no-gutters">
        <Main booths={this.props.booths.booths} 
          deleteSeating={this.props.deleteSeatingFromBooth}/>
        <SidebarNav
          booths={this.props.booths.booths}
          customers={this.props.customers.customers}
          postCustomers={this.props.postCustomer}
          deleteCustomer={this.props.deleteCustomer}
          deleteSeating={this.props.deleteUnseatedSeating}
          seatings={this.props.seatings}
          putSeatingToBooth={this.props.putSeatingToBooth}
        />
      </Div100vh>
      )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllCustomers,
      getAllSeatings,
      getAllTables,
      postCustomer,
      deleteCustomer,
      putSeatingToBooth,
      deleteSeatingFromBooth,
      deleteUnseatedSeating

    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  booths: state.booths,
  customers: state.customers,
  seatings: state.seatings,
});

export default connect(mapStateToProps, mapDispatchToProps)(Host);
