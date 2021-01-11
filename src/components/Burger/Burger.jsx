import PropTypes from "prop-types";

import classes from "./Burger.module.css";
import BurgerIngridient from "./BurgerIngridient/BurgerIngridient";
const Burger = (props) => {
  let ingridients = Object.keys(props.ingridients)
    .map((ingridientKey) =>
      [...Array(props.ingridients[ingridientKey])].map((_, idx) => (
        <BurgerIngridient key={ingridientKey + idx} type={ingridientKey} />
      ))
    )
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (ingridients.length === 0) {
    ingridients = <p>Please start adding ingridients. 😏</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngridient type="bread-top" />
      {ingridients}
      <BurgerIngridient type="bread-bottom" />
    </div>
  );
};
Burger.propTypes = {
  ingridients: PropTypes.object.isRequired,
};
export default Burger;
