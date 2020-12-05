import React from "react";
import { connect } from "react-redux";
import { getCustomerInfo, getMenu } from "../../../actions/customerActions";
import { postNewOrder } from "../../../actions/orderActions";
import { Spinner } from "reactstrap";

import UserApp from "./UserApp";
import "./index.scss";

class User extends React.Component {
  componentDidMount() {
    const {
      params: { customer_id },
    } = this.props.match;

    this.props.getCustomerInfo(customer_id);
    this.props.getMenu();
  }

  render() {
    const sortedMenu = this.props.menu.reduce((foodTypes, menuItem) => {
      if (foodTypes.hasOwnProperty(menuItem.food_type)) {
        foodTypes[menuItem.food_type].push(menuItem);
      } else {
        foodTypes[menuItem.food_type] = [menuItem];
      }
      return foodTypes;
    }, {});

    const filteredMainMenu = Object.fromEntries(
      Object.entries(sortedMenu).filter(
        ([key]) => key !== "Sides" && key !== "Beverages"
      )
    );

    const filteredSideMenu = Object.fromEntries(
      Object.entries(sortedMenu).filter(
        ([key]) => key === "Sides" || key === "Beverages"
      )
    );
    return (
      <div>
        {this.props.user === null ? (
          <div className="text-center mt-5 align-items-center">
            <Spinner style={{ width: "1.5rem", height: "1.5rem" }} />
            <h5 className="mt-1 lead">Please wait</h5>
          </div>
        ) : (
          <UserApp
            user={this.props.user}
            menu={filteredMainMenu}
            sides={filteredSideMenu}
            postOrder={this.props.postNewOrder}
            orderStatus={this.props.serverStatus}
            modal_logo={this.props.modal_logo}
            modal_message={this.props.modal_message}
          />
        )}
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  menu: state.menu.menu,
  user: state.customers.user,
  status:state.orders.serverStatus,
  modal_logo:state.orders.modal_logo,
  modal_message:state.orders.modal_message
});

export default connect(mapStateToProps, {getCustomerInfo, getMenu, postNewOrder})(User);
