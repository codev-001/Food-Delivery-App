import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../components/Context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const PlaceOrder = () => {
  const [method, setMethod] = useState("");
  const { token, cartItems, url, setCartItems, getTotalCartAmount, food_list } =
    useContext(StoreContext);

  const [formdata, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        if (cartItems[items] > 0) {
          const itemsInfo = structuredClone(
            food_list.find((list) => list._id === items)
          );
          if (itemsInfo) {
            itemsInfo.quantity = cartItems[items];
            orderItems.push(itemsInfo);
          }
        }
      }

      let orderData = {
        address: formdata,
        item: orderItems,
        amount: getTotalCartAmount() + 2,
      };
      console.log(orderData);
      const response = await axios.post(
        url + "/api/order/place",
         orderData ,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        setCartItems({});
        navigate("/");
      } else {
        console.log(response.data.message);
      }

      console.log(orderItems);
    } catch (error) {}
  };

  return (
    <form onSubmit={onSubmitHandler} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formdata.firstName}
            type="text"
            placeholder="First Name:"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formdata.lastName}
            type="text"
            placeholder="Last Name:"
            required
          />
        </div>
        <input
          type="email"
          onChange={onChangeHandler}
          name="email"
          value={formdata.email}
          placeholder="Email Address:"
          required
        />
        <input
          type="text"
          onChange={onChangeHandler}
          name="street"
          value={formdata.street}
          placeholder="street"
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            onChange={onChangeHandler}
            name="city"
            value={formdata.city}
            placeholder="City:"
            required
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name="state"
            value={formdata.state}
            placeholder="State:"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            onChange={onChangeHandler}
            name="zipcode"
            value={formdata.zipcode}
            placeholder="Zip Code:"
            required
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name="country"
            value={formdata.country}
            placeholder="Country:"
            required
          />
        </div>
        <input
          type="text"
          onChange={onChangeHandler}
          name="phone"
          value={formdata.phone}
          placeholder="Contact:"
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
            <div className="payment-methods">
              <h2>PAYMENT METHODS:</h2>
              <div className="cod-delivery-container">
                <div className="cod-delivery">
                  <p className={method === "cod" ? "activated" : ""}></p>
                  <p className="cod" onClick={() => setMethod("cod")}>
                    CASH ON DELIVERY
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button type="submit">PLACE ORDER</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
