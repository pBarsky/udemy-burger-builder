import { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

const WithErrorHandler = (WrappedComponent, axiosInstance) => {
  return class extends Component {
    state = {
      error: null,
    };

    requestInterceptor = null;
    responseInterceptor = null;

    componentWillUnmount() {
      axiosInstance.interceptors.response.eject(this.responseInterceptor);
      axiosInstance.interceptors.request.eject(this.requestInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      this.requestInterceptor = axiosInstance.interceptors.request.use(
        (config) => {
          this.setState({ error: null });
          return config;
        }
      );
      this.responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
          return Promise.reject(error);
        }
      );
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            Something didn't work.{" "}
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default WithErrorHandler;
