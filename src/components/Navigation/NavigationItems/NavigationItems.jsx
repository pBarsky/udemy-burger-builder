import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem exact link="/">
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {!props.isAuthenticated ? (
        <NavigationItem link="/auth">Log in</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Log out</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
