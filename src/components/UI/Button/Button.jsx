import classes from "./Button.module.css";
import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <button
      className={[classes.Button, classes[props.buttonType]].join(" ")}
      onClick={props.clicked}
      disabled={props.disabled}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  buttonType: PropTypes.oneOf(["Danger", "Success"]).isRequired,
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
