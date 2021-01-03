import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingridientSummary = Object.keys(props.ingridients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ testTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingridients[igKey]}
      </li>
    );
  });
  return (
    <>
      <h3>Your Order</h3>
      <p>Delicious burger with the following ingridients:</p>
      <ul>{ingridientSummary}</ul>
      <p>
        <strong>Total Price: ${props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button buttonType="Danger" clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button buttonType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </>
  );
};

export default OrderSummary;
