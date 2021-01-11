import React, { Component } from "react";
import axios from "../../axios-orders";

import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = Object.keys(res.data).map((key) => {
          return { ...res.data[key], id: key };
        });
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => this.setState({ loading: false }));
  }

  render() {
    const orders = !this.state.loading ? (
      this.state.orders.map((order) => (
        <Order
          ingridients={order.ingridients}
          price={order.price}
          key={order.id}
        />
      ))
    ) : (
      <Spinner />
    );
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
