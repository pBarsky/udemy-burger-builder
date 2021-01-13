import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import { authActions } from "../../store/actions/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../shared/utility";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: { type: "email", placeholder: "Mail address" },
        label: "Email",
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: { type: "password", placeholder: "Password" },
        label: "Password",
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => ({
      isSignUp: !prevState.isSignUp,
    }));
  };

  inputChangedHandler = ({ target }, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: target.value,
        valid: checkValidity(target.value, this.state[controlName].validation),
        touched: true,
      }),
    });

    let formIsValid = true;
    for (const id in updatedControls) {
      formIsValid &= updatedControls[id].valid;
    }

    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  render() {
    const formElementsArray = Object.keys(this.state.controls).map((key) => {
      return {
        id: key,
        config: this.state.controls[key],
      };
    });

    const form = !this.props.loading ? (
      formElementsArray.map((formElement) => (
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
        />
      ))
    ) : (
      <Spinner />
    );

    return (
      <div className={classes.Auth}>
        {this.props.isAuthenticated ? (
          <Redirect to={this.props.authRedirectPath} />
        ) : null}
        <form onSubmit={this.submitHandler}>
          {this.props.error ? <p>{this.props.error.message}</p> : null}
          {form}
          <Button
            type="submit"
            disabled={!this.state.formIsValid}
            buttonType="Success"
          >
            Submit
          </Button>
          <Button
            type="button"
            buttonType="Danger"
            clicked={this.switchAuthModeHandler}
          >
            Switch to {!this.state.isSignUp ? "Sign up" : "Log in"}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignedUp) =>
    dispatch(authActions.auth(email, password, isSignedUp)),
  onSetAuthRedirectPath: () => dispatch(authActions.setAuthRedirectPath("/")),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
