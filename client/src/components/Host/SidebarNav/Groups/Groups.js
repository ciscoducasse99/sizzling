import React from "react";
import {
  Badge,
  Button,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Spinner,
} from "reactstrap";

const Groups = ({ seatings, booths, putSeatingToBooth, deleteSeating }) => {
  const unseatedListings = seatings.seatings.filter(
    (seating) => seating.booth_id === null
  );
  const seatedListings = seatings.seatings.filter(
    (seating) => seating.booth_id !== null
  );
  const [modal, setModal] = React.useState(false);
  const [nestedModal, setNestedmodal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);

  const handleEditSeating = (seating) => {
    setModalContent(seating);
    setModal(!modal);
  };

  const setSeatingToBooth = (booth_id, seatings) => {
    const data = {
      boothId: booth_id,
      seatingId: seatings.seatings_id,
      customers: seatings.customers,
    };

    putSeatingToBooth(data);
    setNestedmodal(!nestedModal);
    setModalContent(null);
    setModal(!modal);
  };
  return (
    <>
      <div className="h-100">
        <div className="h-50 border-bottom container">
          <div className="py-2">
            <span className="font-weight-bold text-white">
              Unseated
              <Badge color="secondary" className="mx-1 small align-center" pill>
                {unseatedListings.length}
              </Badge>
            </span>
          </div>

          <div
            className="w-100 rounded"
            style={{ overflowY: "auto", height: "85%" }}
          >
            <ListGroup>
              {unseatedListings.map((seating) => (
                <ListGroupItem
                  key={seating.seatings_id}
                  style={{ backgroundColor: "#111111" }}
                  className="my-1 p-0 d-flex flex-row align-items-center justify-content-between rounded"
                >
                  <h6 className="m-1">Seating ID: {seating.seatings_id}</h6>

                  <div>
                    <button
                      className="btn btn-outline-secondary rounded-pill m-1"
                      onClick={() => handleEditSeating(seating)}
                    >
                      Edit Booth
                    </button>
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </div>
        <div className="h-50 container">
          <div className="py-2">
            <span className="font-weight-bold text-white">
              Seated
              <Badge color="secondary" className="mx-1 small align-center" pill>
                {seatedListings.length}
              </Badge>
            </span>
          </div>
          <div
            className="w-100 rounded"
            style={{ overflowY: "auto", height: "85%" }}
          >
            <ListGroup>
              {seatedListings.map((seating) => (
                <ListGroupItem
                  key={seating.seatings_id}
                  style={{ backgroundColor: "#111111" }}
                  className="my-1 rounded"
                >
                  <span>Seating ID: {seating.seatings_id}</span>{" "}
                  <small className="float-right">
                    Booth:{" "}
                    <span className="text-success">{seating.booth_id}</span>
                  </small>
                  <ul>
                    {seating.customers.map((customer) => (
                      <li key={customer.customer_id}>
                        {customer.customer_name}
                        <ul>
                          <li>Phone: {customer.customer_phone}</li>
                          <li>Customer ID: {customer.customer_id}</li>
                        </ul>
                      </li>
                    ))}
                  </ul>
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </div>
      </div>
      <Modal isOpen={modal}>
        <ModalHeader
          toggle={() => {
            setModalContent(null);
            setModal(!modal);
          }}
        >
          Edit Seating
        </ModalHeader>
        <ModalBody>
          {modalContent === null ? (
            <div className="mt-5 text-center mx-auto">
              <Spinner color={"secondary"} />
              <br />
              <small>Please wait</small>
            </div>
          ) : (
            <div>
              <div className="d-flex flex-row justify-content-between mb-3">
                <h6> Seating ID: {modalContent.seatings_id}</h6>
                {modalContent.active === false ? (
                  <h6 className="ml-auto text-danger">Not Seated</h6>
                ) : (
                  <h6 className="ml-auto text-success">Seated</h6>
                )}
              </div>
              <div className="row">
                {modalContent.customers.map((customer) => (
                  <div
                    key={customer.customer_id}
                    className="col-5 text-center mx-auto"
                  >
                    <i className="fa fa-user fa-4x" />
                    <h6 className="m-0 pt-2 text-center">
                      {customer.customer_name}
                    </h6>
                    <small className="text-center">
                      {customer.customer_phone}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter className="d-flex flex-row justify-content-between">
          <Button
            color="danger"
            className="rounded-pill"
            outline
            onClick={() => {
              deleteSeating(modalContent);
              setModalContent(null);
              setModal(!modal);
            }}
          >
            Delete Seating
          </Button>
          <Button
            color="primary"
            className="rounded-pill"
            outline
            onClick={() => setNestedmodal(!nestedModal)}
          >
            Add Seating To Booth
          </Button>
        </ModalFooter>
        <Modal isOpen={nestedModal}>
          <ModalHeader
            className="p-3 m-0"
            toggle={() => setNestedmodal(!nestedModal)}
          >
            Click Booth To Seat Customers
          </ModalHeader>
          <ModalBody className="container">
            {booths.length === 0 ? null : (
              <div className="row mx-auto">
                {booths[0].map((booth) => (
                  <Button
                    key={booth.booth_id}
                    outline
                    className="col-2 p-1 m-1"
                    color={
                      booth.current_seating !== null ? "danger" : "success"
                    }
                    disabled={booth.current_seating !== null ? true : false}
                    onClick={() =>
                      setSeatingToBooth(booth.booth_id, modalContent)
                    }
                  >
                    {booth.booth_id}
                  </Button>
                ))}
              </div>
            )}
          </ModalBody>
        </Modal>
      </Modal>
    </>
  );
};

export default Groups;
