import { Component } from "react";
import axios from "../../axios-orders";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/ingridients.json")
      .then((response) => this.setState({ ingridients: response.data }))
      .catch((error) => this.setState({ error: error }));
  }

  updatePurchaseState = (ingridients) => {
    const sum = Object.keys(ingridients).reduce(
      (acc, curr) => acc + ingridients[curr],
      0
    );
    this.setState({ purchasable: sum > 0 });
  };

  addIngridientHandler = (type) => {
    const oldCount = this.state.ingridients[type];
    const updatedCount = oldCount + 1;
    const updatedIngridients = {
      ...this.state.ingridients,
    };
    updatedIngridients[type] = updatedCount;
    const priceAddition = INGRIDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingridients: updatedIngridients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngridients);
  };

  removeIngridientHandler = (type) => {
    const oldCount = this.state.ingridients[type];
    const updatedCount = oldCount - 1;
    if (updatedCount < 0) {
      return;
    }
    const updatedIngridients = {
      ...this.state.ingridients,
    };
    updatedIngridients[type] = updatedCount;
    const priceSubstraction = INGRIDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceSubstraction;
    this.setState({ ingridients: updatedIngridients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngridients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purhcaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purhcaseContinueHandler = () => {
    const queyrParams = Object.entries(this.state.ingridients).map(
      ([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
    );
    queyrParams.push(`price=${this.state.totalPrice}`);
    const queryString = queyrParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: queryString,
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingridients,
    };
    // Object.keys(disabledInfo).forEach(
    //   (key) => (disabledInfo[key] = disabledInfo[key] <= 0)
    // );
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingridients cannot be loaded.</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingridients) {
      orderSummary = (
        <OrderSummary
          ingridients={this.state.ingridients}
          purchaseCanceled={this.purhcaseCancelHandler}
          purchaseContinued={this.purhcaseContinueHandler}
          price={this.state.totalPrice}
        />
      );

      burger = (
        <>
          <Burger ingridients={this.state.ingridients} />
          <BuildControls
            ingridientAdded={this.addIngridientHandler}
            ingridientRemoved={this.removeIngridientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </>
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purhcaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
