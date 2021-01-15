import { Component } from "react";
import { connect } from "react-redux";
import axios from "../../../axios-orders";

import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import { orderActions } from "../../../store/actions/actions";
import { updateObject, checkValidity } from "../../../shared/utility";
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Name" },
        label: "Your Name",
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        errors: [],
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Address" },
        label: "Your Address",
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        errors: [],
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "ZIP code" },
        label: "Your ZIP code",
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        errors: [],
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Country" },
        label: "Your Country",
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        errors: [],
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: { type: "email", placeholder: "E-mail" },
        label: "Your E-mail",
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        errors: [],
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "fastest" },
            { value: "cheapest", displayValue: "cheapest" },
          ],
        },
        valid: true,
        errors: [],
        touched: false,
        value: "fastest",
        label: "Delivery method",
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingridients: this.props.ingridients,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = ({ target }, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        value: target.value,
        valid: checkValidity(
          target.value,
          this.state.orderForm[inputIdentifier].validation,
          this.state.orderForm[inputIdentifier].errors
        ),
        touched: true,
      }
    );
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (const id in updatedOrderForm) {
      formIsValid &= updatedOrderForm[id].valid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = Object.keys(this.state.orderForm).map((key) => {
      return {
        id: key,
        config: this.state.orderForm[key],
      };
    });
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            label={formElement.config.label}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            errors={formElement.config.errors}
          />
        ))}
        <Button buttonType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>
          Enter your <em>contact data</em>
        </h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ingridients: state.burgerBuilder.ingridients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  onOrderBurger: (orderData, token) =>
    dispatch(orderActions.purchaseBurger(orderData, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
