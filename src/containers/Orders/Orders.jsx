import React, { Component } from "react";
import axios from "../../axios-orders";

import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import { orderActions } from "../../store/actions/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      if (this.props.orders.length > 0) {
        orders = this.props.orders.map((order) => (
          <Order
            ingridients={order.ingridients}
            price={order.price}
            key={order.id}
          />
        ));
      } else {
        orders = (
          <div style={{ margin: "20px", textAlign: "center" }}>
            <h2>You do not have any orders yet.</h2>
            <h2>
              Please make an order &nbsp;
              <Link
                to="/"
                style={{
                  color: "#40a4c8",
                  fontWeight: "bold",
                  fontSize: "1.2em",
                }}
              >
                <em>Here</em>
              </Link>
            </h2>
          </div>
        );
      }
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: (token, userId) =>
    dispatch(orderActions.fetchOrders(token, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
