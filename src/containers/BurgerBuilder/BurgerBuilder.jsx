import { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export class BurgerBuilder extends Component {
  state = {
    ingridients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

  updatePurchaseState = (ingridients) => {
    // const sum = Object.keys(ingridients)
    //   .map((key) => ingridients[key])
    //   .reduce((acc, curr) => acc + curr, 0);
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
    alert("You continue");
  };

  render() {
    const disabledInfo = {
      ...this.state.ingridients,
    };
    Object.keys(disabledInfo).forEach(
      (key) => (disabledInfo[key] = disabledInfo[key] <= 0)
    );
    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purhcaseCancelHandler}
        >
          <OrderSummary
            ingridients={this.state.ingridients}
            purchaseCanceled={this.purhcaseCancelHandler}
            purchaseContinued={this.purhcaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
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
  }
}

export default BurgerBuilder;
