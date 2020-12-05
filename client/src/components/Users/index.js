import React, { Component } from "react";
import { getAllCustomers } from "../../actions/customerActions";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

class Users extends Component {
  componentDidMount() {
    this.props.getAllCustomers()
  }
  render() {
    const { customers } = this.props.customers;
    const filteredCustomers =  customers.filter(customer=> customer.active !== false)
    const customerListing = filteredCustomers.map(customer => (
      <div key={customer.customer_id} className="col-8 mx-auto m-2 border border-secondary border-rounded">
        <Link
          to={`users/${customer.customer_id}/confirm-location`}
        >
          <p>Customer ID: {customer.customer_id}</p>
          <p>Name: {customer.customer_name}</p>
          <p>Phone: {customer.customer_phone}</p>
        </Link>
      </div>
    ));

    return (
      <Container className="mx-auto">
        <div className="row">{customerListing}</div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  customers: state.customers
});

export default connect(mapStateToProps, {getAllCustomers})(Users);
