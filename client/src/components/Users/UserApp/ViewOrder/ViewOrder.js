import React from "react";
import "./ViewOrder.scss";
import { Navbar, Media, Button, Modal, ModalBody, Spinner } from "reactstrap";


const ViewOrder = ({
  orderItems,
  toggleViewOrder,
  clearCart,
  removeItem,
  postOrder,
  user,
  modal_logo,
  modal_message
}) => {
  const [payment, setPayment] = React.useState(null);
  const [subtotal, setSubtotal] = React.useState(0);
  const [modal, setModal] = React.useState(false);

  React.useEffect(() => {
    var orderArray = [];
    orderItems.forEach((item) => {
      orderArray.push(item.food_price);
    });
    setSubtotal(
      orderArray.reduce((sum, current) => sum + current, 0).toFixed(2)
    );
  }, [orderItems]);

  const getTotal = (st, fee) => {
    return st + fee;
  };

  const togglePayment = (cardName) => {
    if (payment === null || payment !== cardName) {
      setPayment(cardName);
    } else if (payment === cardName) {
      setPayment(null);
    }
  };

  const handleOrder = () => {
    setModal(!modal)
    const foodIds = orderItems.map((item) => item.food_id);
    const userId = user.customer_id;
    const order = {
      order_ids: foodIds,
      user_id: userId,
    };
    postOrder(order);
  };

  const order = orderItems.map((item) => (
    <Media
      key={item.food_id}
      className="border border-secondary rounded p-2 mb-2"
    >
      <Media body>
        <Media className="text-white">
          <h5 className="mb-0">{item.food_name}</h5>
        </Media>
        <h6 className="text-secondary">{item.food_type}</h6>

        <div className="d-flex flex-row justify-content-between">
          <p className="mb-0">{item.food_display_price}</p>

          <p className="text-danger mb-0" onClick={() => removeItem(item)}>
            Remove Item
          </p>
        </div>
      </Media>
    </Media>
  ));

  const paymentOptions = [
    {
      img: "https://cdn3.iconfinder.com/data/icons/inficons/512/apple.png",
      name: "Apple Pay",
    },
    {
      img:
        "https://banner2.cleanpng.com/20180718/obx/kisspng-computer-icons-logo-icon-design-paypal-logo-5b4ff3acea79a0.0709347115319663809604.jpg",
      name: "Paypal",
    },
    {
      img:
        "https://lh3.googleusercontent.com/lC3ox9jJiXhgFvt_EkYMbbpz-ygpgWkCSvhZdUPxi7PAqEBDHoinhjiVUl-QbYV58WAp",
      name: "Zelle",
    },
    {
      img:
        "https://w7.pngwing.com/pngs/42/677/png-transparent-credit-card-computer-icons-visa-payment-card-icon-free-s-credit-card-angle-text-rectangle.png",
      name: "Credit Card",
    },
  ];

  return (
    <>
      <div className="container">
        <div>
          <Navbar className="pb-0">
            <i
              onClick={() => toggleViewOrder()}
              className="ml-auto my-2 fa fa-close fa-lg"
            />
          </Navbar>
          <h5 className="my-2 font-weight-bold">Your Cart</h5>
          {orderItems.length === 0 ? (
            <h6 className="text-center text-secondary my-4">
              Add items to cart to order
            </h6>
          ) : (
            <div className="my-4">{order}</div>
          )}
        </div>
        <div className={orderItems.length > 0 ? "d-block" : "d-none"}>
          <div>
            <h5 className="font-weight-bold ">Payment Options (Select One)</h5>
            <div className="row my-4">
              {paymentOptions.map((option) => (
                <div
                  className="col-3 text-center"
                  key={option.name}
                  onClick={() => togglePayment(option.name)}
                >
                  <img
                    className="rounded-circle mb-2"
                    src={option.img}
                    alt={option.name}
                    style={{
                      height: "45px",
                      width: "45px",
                    }}
                  />
                  <br />
                  <small
                    className={
                      payment === option.name
                        ? "text-success"
                        : "text-secondary"
                    }
                  >
                    {option.name}
                  </small>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="row m-0 p-0">
              <h6 className="font-weight-bold mr-auto">Subtotal</h6>
              <p className="ml-auto">${subtotal}</p>
            </div>
            <div className="row m-0 p-0">
              <h6 className="font-weight-bold mr-auto">Service Charge</h6>
              <p className="ml-auto">{"$1.25"}</p>
            </div>
            <div className="row m-0 p-0">
              <h6 className="font-weight-bold mr-auto">Total</h6>
              <p className="ml-auto">
                ${getTotal(parseFloat(subtotal), parseFloat(1.25))}
              </p>
            </div>
          </div>
          <Button
            className="rounded-pill container-fluid border-white mb-2"
            disabled={payment !== null && orderItems.length > 0 ? false : true}
            size="lg"
            style={{ background: "white", color: "black" }}
            onClick={() => handleOrder()}
          >
            Place Order
          </Button>
        </div>
      </div>
      <Modal
        isOpen={modal}
        centered
        fade={false}
        size='sm'
      >
        <ModalBody className="text-center">
          {modal_logo === null ? <Spinner color="dark" /> : <i className={modal_logo}/>}
          {modal_message === null ? <h5>Placing Order</h5> : <h5>{modal_message}</h5>}
          
          <Button
          onClick={() => clearCart()}
          color={'secondary'}
          className="rounded-pill text-center mt-3"
          >Go Home</Button>
        
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewOrder;
