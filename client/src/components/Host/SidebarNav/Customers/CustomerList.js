import React, { useReducer } from "react";
import {
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
} from "reactstrap";
import "../../../../App.css";

const initialState = {
  modal: false,
  user: { customer_name: "customer not selected" },
};

function reducer(state, action) {
  console.log(state);
  switch (action.type) {
    case "open":
      return {
        modal: (state.modal = true),
        user: action.payload,
      };
    case "close":
      return {
        modal: (state.modal = false),
        user: action.payload,
      };
    default:
      throw new Error();
  }
}

const CustomerList = ({ customers, deleteCustomer }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleClick = (customer_id) => {
    deleteCustomer(customer_id);
    dispatch({ type: "close", payload: "NO_NAME" });
  };
  return (
    <>
      <ListGroup>
        {customers.map((customer) => (
          <ListGroupItem
            key={customer.customer_id}
            style={{ backgroundColor: "#111111" }}
            disabled={customer.active === true ? true : false}
          >
            <h5 className="text-white">{customer.customer_name}</h5>

            <span className="text-dark">{customer.customer_phone}</span>
            {customer.active === true ? (
              <small className="text-success float-right">Seated</small>
            ) : (
              <small
                className="text-danger float-right customer_removal_form"
                onClick={() => dispatch({ type: "open", payload: customer })}
              >
                Delete Customer
              </small>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
      <Modal isOpen={state.modal}>
        <ModalHeader
          toggle={() => dispatch({ type: "close", payload: "NO_NAME" })}
        >
          Delete Customer
        </ModalHeader>
        <ModalBody>
          <p>
            Are you sure you would like to delete customer{" "}
            {state.user.customer_name}
          </p>
          <Row className="float-right">
            <Button
              className="m-1"
              color="secondary"
              onClick={() => dispatch({ type: "close", payload: "NO_NAME" })}
            >
              Cancel
            </Button>
            <Button
              className="m-1"
              color="danger"
              onClick={() => handleClick(state.user.customer_id)}
            >
              Delete
            </Button>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CustomerList;
