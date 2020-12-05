import React from "react";
import store from "../../../store";
import {
  Navbar,
  Spinner,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Media,
} from "reactstrap";

import DisplayBooth from "./DisplayBooth";
import "../../../App.css";

const Main = ({ booths, deleteSeating }) => {
  const [modal, setModal] = React.useState(false);

  const [modalContent, setModalContent] = React.useState(null);

  const handleModal = (content) => {
    if (modalContent !== null) {
      setModalContent(null);
      setModal(!modal);
    }
    const seating = store.getState().seatings.seatings;

    const modalSeating = seating.find(
      (seating) => seating.seatings_id === content.seatings_id
    );
    console.log(modalSeating);
    setModalContent(modalSeating);
    setModal(!modal);
  };

  const total = (customers) => {
    const ordersTotal = [];

    customers.map((customer) => {
      customer.orders.map((order) => {
        order.items.map((item) => {
          ordersTotal.push(item.food_price);
        });
      });
    });

    return ordersTotal.reduce((sum, current) => sum + current, 0).toFixed(2);
  };
  console.log(modalContent);
  return (
    <>
      <div className="col-md-9 d-lg-block d-none overflow-hidden">
        <Navbar className="border-secondary border-bottom">
          <div>
            <i className="fas fa-circle text-success"></i>
            <li className="navbar-text mx-1">- Table available </li>
          </div>
          <div>
            <i className="fas fa-circle text-danger"></i>
            <li className="navbar-text mx-1">- Table unavailable </li>
          </div>
        </Navbar>

        <div className="container d-flex host-main-content justify-content-center align-items-center">
          {booths.length === 0 ? (
            <div className="mt-5 text-center">
              <Spinner color={"secondary"} />
              <br />
              <small>Please wait</small>
            </div>
          ) : (
            <div className="row justify-content-center ">
              {booths[0].map(({ booth_id, current_seating }) => (
                <DisplayBooth
                  key={booth_id}
                  current_seating={current_seating}
                  booth={booth_id}
                  handleModal={() => handleModal(current_seating)}
                  modal={modal}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {modalContent !== null && (
        <Modal isOpen={modal} centered size="lg">
          <ModalHeader
            toggle={() => {
              setModal(!modal);
              setModalContent(null);
            }}
          />
          <ModalBody className="p-0 m-0" style={{ height: "350px" }}>
            <div className="row no-gutters">
              <div className="col-md-8 ">
                <h5 className="m-2">Customers</h5>
                <div className="h-75 d-flex justify-content-center align-items-center ">
                  {modalContent.customers.map((customer) => (
                    <div
                      key={customer.customer_id}
                      className="text-center mx-3"
                    >
                      <i className="fa fa-user fa-4x" />
                      <br />
                      <h6 className="mb-0">{customer.customer_name}</h6>
                      <small>Customer ID: {customer.customer_id}</small>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-4 border-left border-secondary">
                <h5 className="m-2">Orders</h5>
                <div style={{ height: "305px" }}>
                  <div
                    className="w-100 p-2"
                    style={{ overflowY: "auto", height: "95%" }}
                  >
                    {modalContent.customers.map((customer) => (
                      <div key={customer.customer_id}>
                        {customer.orders.map((order) => (
                          <div
                            key={order.order_id}
                            className="border border-secondary rounded p-1 mb-2"
                          >
                            Order ID: {order.order_id}
                            {order.items.map((item) => (
                              <Media
                                key={item.food_id}
                                className="border border-secondary rounded m-1"
                                style={{ backgroundColor: "#111111" }}
                              >
                                <Media body className="p-1">
                                  <Media className="text-white">
                                    <h6 className="mb-0">{item.food_name}</h6>
                                  </Media>
                                  <h6 className="text-secondary">
                                    {item.food_type}
                                  </h6>

                                  <div className="d-flex flex-row justify-content-between">
                                    <p className="mb-0">
                                      {item.food_display_price}
                                    </p>
                                  </div>
                                </Media>
                              </Media>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="d-flex justify-content-between">
            <p className="float-left">
              Total: {modalContent === null ? 0 : total(modalContent.customers)}{" "}
            </p>
            <Button
              className="rounded-pill"
              onClick={() => {
                deleteSeating(modalContent);
                setModalContent(null);
                setModal(!modal);
              }}
            >
              Clear Booth
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default Main;
