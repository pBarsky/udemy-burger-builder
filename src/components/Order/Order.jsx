import classes from "./Order.module.css";

const Order = (props) => {
  const ingridients = Object.keys(props.ingridients).map((ingridientName) => {
    return { name: ingridientName, amount: props.ingridients[ingridientName] };
  });

  const ingridientOutput = ingridients.map((ingridient) => (
    <span
      key={ingridient.name}
      style={{
        textTransform: "capitalize",
        display: "inline-block",
        margin: "0 8px",
        border: "1px solid gray",
        padding: "5px",
      }}
    >
      {ingridient.name} ({ingridient.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingridients: {ingridientOutput}</p>
      <p>
        Price: <strong>USD {parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
