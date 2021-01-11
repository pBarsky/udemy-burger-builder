import { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

export default class Checkout extends Component {
  state = {
    ingridients: {},
    totalPrice: 0,
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const ingridients = {};
    let price = 0;
    for (const param of params.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingridients[param[0]] = parseInt(param[1]);
      }
    }
    this.setState({ ingridients: ingridients, totalPrice: price });
  }

  checkoutCanceledHandler = () => {
    this.props.history.push("/");
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingridients={this.state.ingridients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={(props) => (
            <ContactData
              ingridients={this.state.ingridients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
