import React from "react";
import App from "./components/containers/AppContainer";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

class Root extends React.Component {
  state = { hasError: undefined };

  /*
  componentDidCatch(err, info) {
    this.setState({ hasError: true });
  }
  */

  render() {
    const { store } = this.props;

    /*
    if (this.state.hasError) {
         return <h1>Error</h1>;
    }
    */

    return (
      <Provider store={store}>
        <BrowserRouter>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
