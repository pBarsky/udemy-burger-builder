import PropTypes from "prop-types";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>
        We hope it tastes <em>excellent.</em>
      </h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingridients={props.ingridients} />
      </div>
      <Button buttonType="Danger" clicked={props.checkoutCanceled}>
        CANCEL
      </Button>
      <Button buttonType="Success" clicked={props.checkoutContinued}>
        Continue
      </Button>
    </div>
  );
};

CheckoutSummary.propTypes = {
  ingridients: PropTypes.object.isRequired,
  checkoutCanceled: PropTypes.func.isRequired,
  checkoutContinued: PropTypes.func.isRequired,
};

export default CheckoutSummary;
