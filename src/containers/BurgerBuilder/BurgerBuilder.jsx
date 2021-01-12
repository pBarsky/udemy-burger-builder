import { Component } from "react";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axios
    //   .get("/ingridients.json")
    //   .then((response) => this.setState({ ingridients: response.data }))
    //   .catch((error) => this.setState({ error: error }));
  }

  updatePurchaseState = (ingridients) => {
    const sum = Object.keys(ingridients).reduce(
      (acc, curr) => acc + ingridients[curr],
      0
    );
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ingridients,
    };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingridients cannot be loaded.</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingridients) {
      orderSummary = (
        <OrderSummary
          ingridients={this.props.ingridients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );

      burger = (
        <>
          <Burger ingridients={this.props.ingridients} />
          <BuildControls
            ingridientAdded={this.props.onIngridientAdded}
            ingridientRemoved={this.props.onIngridientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ingridients)}
            price={this.props.totalPrice}
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
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ingridients: state.ingridients,
  totalPrice: state.totalPrice,
});

const mapDispatchToProps = (dispatch) => ({
  onIngridientAdded: (ingridientName) =>
    dispatch({
      type: actionTypes.ADD_INGRIDIENT,
      payload: { ingridientName: ingridientName },
    }),
  onIngridientRemoved: (ingridientName) =>
    dispatch({
      type: actionTypes.REMOVE_INGRIDIENT,
      payload: { ingridientName: ingridientName },
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
