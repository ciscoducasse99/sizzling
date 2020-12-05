import React from "react";
import { Navbar, NavbarToggler } from "reactstrap";
import { CSSTransition } from "react-transition-group";

import MenuGroup from "./MenuGroup/MenuGroup";
import FoodModal from "./FoodModal/FoodModal";
import UserNav from "./UserNav/UserNav";
import Footer from "./Footer/Footer";
import ViewOrder from "./ViewOrder/ViewOrder";
import "./index.scss";

/*
  Next tasks are add scrolling/delete capablilites to Footer, add view order page (maybe use a reducer type function that
  lets keeps track of what page is calling new) render for page and be able to order ViewOrder view from ModalHead
  

  REMINDER: Its probably not a bad idea to document what each function is for.
*/

class UserApp extends React.Component {
  constructor() {
    super();

    //Eventually add an action that combines both mainOrders and sideOrders and thens through Redux
    this.state = {
      user: null,
      main_display: true,
      nav_display: false,
      modal_display: false,
      order_display: false,
      modalInfo: null,
      viewFoodModal: false,
      windowWidth: 0,
      order: [],
    };

    // Handling what Component gets used
    this.setModalView = this.setModalView.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleNav = this.handleNav.bind(this);

    //Handling ORDER main dishes
    this.toggleMainItem = this.toggleMainItem.bind(this);
    this.addMainItem = this.addMainItem.bind(this);
    this.removeMainItem = this.removeMainItem.bind(this);

    //handling ORDER side dishes
    this.addSideItem = this.addSideItem.bind(this);
    this.removeSideItem = this.removeSideItem.bind(this);

    //Handling ViewOrder Component
    this.toggleViewOrder = this.toggleViewOrder.bind(this);
    this.clearCart = this.clearCart.bind(this);
    window.addEventListener("resize", this.update);
  }

  componentDidMount() {
    this.setState({
      user: this.props.user,
    });
    this.update();
  }

  toggleViewOrder = () => {
    if (this.state.order_display) {
      this.setState({
        main_display: true,
        order_display: false,
      });
    } else {
      this.setState({
        order_display: true,
        main_display: false,
      });
    }
  };

  // Handling what gets displayed
  setModalView = (component) => {
    this.setState({
      modalInfo: component,
      modal_display: true,
      main_display: false,
      viewFoodModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalInfo: null,
      modal_display: false,
      main_display: true,
      viewFoodModal: false,
    });
  };

  handleNav = () => {
    if (this.state.nav_display === false) {
      this.setState({ main_display: false, nav_display: true });
    } else {
      this.setState({ main_display: true, nav_display: false });
    }
  };

  //MAIN ITEMS

  toggleMainItem = (mainItem) => {
    if (this.state.order.includes(mainItem)) {
      this.removeMainItem(mainItem);
    } else {
      this.addMainItem(mainItem);
    }
  };

  addMainItem = (mainItems) => {
    const newArray = this.state.order.concat(mainItems);
    this.setState({
      order: newArray,
      modalInfo: null,
      modal_display: false,
      main_display: true,
    });
  };

  removeMainItem = (mainItem) => {
    const mainArrayCopy = [...this.state.order];
    const filteredMainCopy = mainArrayCopy.filter((item) => item !== mainItem);
    this.setState({
      order: filteredMainCopy,
      modalInfo: null,
      modal_display: false,
      main_display: true,
    });
  };

  //SIDE ITEMS
  toggleSideItem = (sideItem) => {
    const orderCopy = [...this.state.order];
    if (orderCopy.include(sideItem)) {
      this.removeSideItem(sideItem);
    } else {
      this.addSideItem(sideItem);
    }
  };

  addSideItem = (sideItem) => {
    this.setState({
      order: [...this.state.order, sideItem],
    });
  };

  removeSideItem = (sideItem) => {
    const filteredSides = this.state.order.filter((item) => item !== sideItem);
    this.setState({ order: filteredSides });
  };

  //ORDER ITEMS

  removeItemFromOrder = (orderItem) => {
    const arrayCopy = [...this.state.order];
    const newCopy = arrayCopy.filter(
      (item) => item.food_id !== orderItem.food_id
    );

    this.setState({
      order: newCopy,
    });
  };

  clearCart = () => {
    this.setState({
      order: [],
      main_display: true,
      order_display: false,
    });
  };

  update = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
  };

  render() {
    return (
      <>
        {this.state.windowWidth > 800 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight }}
          >
            <div className="text-center">
            <i className="fa fa-exclamation-triangle fa-4x mb-3" />
            <h6>
              This page is meant to be a replication of a mobile app. Please
              revisit on a mobile device.
            </h6>
            </div>
          </div>
        ) : (
          <div>
            <UserNav
              isOpen={this.state.nav_display}
              handleClick={this.handleNav}
              name={this.props.user.customer_name}
            />

            <div
              className={
                this.state.main_display === true ? "d-block" : "d-none"
              }
            >
              <Navbar dark>
                <NavbarToggler
                  onClick={() => this.handleNav()}
                  className="border-0"
                />
                <i className="fa fa-user-circle-o fa-lg ml-auto" />
              </Navbar>
              <MenuGroup
                listing={this.props.menu}
                setModalItem={() => this.setModalView}
              />
              <Footer
                orderItems={this.state.order}
                toggleViewOrder={this.toggleViewOrder}
              />
            </div>

            <CSSTransition
              in={this.state.order_display}
              classNames="order-modal"
              timeout={150}
              unmountOnExit
            >
              <ViewOrder
                orderItems={this.state.order}
                toggleViewOrder={this.toggleViewOrder}
                clearCart={this.clearCart}
                removeItem={this.removeItemFromOrder}
                postOrder={this.props.postOrder}
                user={this.state.user}
                orderStatus={this.props.orderStatus}
                modal_logo={this.props.modal_logo}
                modal_message={this.props.modal_message}
              />
            </CSSTransition>

            <CSSTransition
              in={this.state.viewFoodModal}
              classNames="food-modal"
              appear
              timeout={150}
              unmountOnExit
            >
              <FoodModal
                closeModal={this.closeModal}
                item={this.state.modalInfo}
                sides={this.props.sides}
                order={this.state.order}
                addMainItem={this.addMainItem}
                removeMainItem={this.removeMainItem}
                toggleSideItem={this.toggleSideItem}
              />
            </CSSTransition>
          </div>
        )}
      </>
    );
  }
}

export default UserApp;
