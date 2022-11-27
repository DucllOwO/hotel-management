import { Button, Result } from "antd";
import React from "react";
import { withRouter } from "../../withRouter";

class ErrorBoundary extends React.Component {
  state = { hasError: false, click: false };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log({ error, errorInfo });
  }

  render() {
    // if (this.state.click) {
    //   return <Navigate to="/admin" replace={true}></Navigate>;
    // }

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <Result
            status="500"
            subTitle="Sorry, something went wrong."
            extra={
              <Button
                type="primary"
                onClick={(e) => {
                  this.setState({ hasError: false });
                  this.props.navigate("/admin");
                }}
              >
                Back Home
              </Button>
            }
          />
        </>
      );
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
