import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import { authActions } from "./store/actions/actions";
import { Component, lazy, Suspense } from "react";
import Spinner from "./components/UI/Spinner/Spinner";

const asyncCheckout = lazy(() => import("./containers/Checkout/Checkout"));
const asyncOrders = lazy(() => import("./containers/Orders/Orders"));
const asyncAuth = lazy(() => import("./containers/Auth/Auth"));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </>
      );
    }
    return (
      <div>
        <Layout>
          <Suspense fallback={<Spinner />}>
            <Switch>{routes}</Switch>
          </Suspense>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignup: () => dispatch(authActions.authCheckState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
