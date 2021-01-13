import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";
import { Component } from "react";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <>
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
