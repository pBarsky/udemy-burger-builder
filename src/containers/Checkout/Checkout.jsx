import { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
  checkoutCanceledHandler = () => {
    this.props.history.push("/");
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

    const summary = !this.props.ingridients ? (
      <Redirect t="/" />
    ) : (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingridients={this.props.ingridients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    );
    return summary;
  }
}
const mapStateToProps = (state) => ({
  ingridients: state.burgerBuilder.ingridients,
  purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);
