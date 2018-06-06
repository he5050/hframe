import React from "react";
import PropTypes from "prop-types";
import factoryApp from "./factory_app";

export default class LoaderApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      CurrentComponent: null
    };
	}

  currentComponent(props) {
    let appInfo = factoryApp.getApp(props.name);
    appInfo.load(component => {
      this.setState({ CurrentComponent: component });
    });
  }

  componentWillMount() {
    this.currentComponent(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.name !== nextProps.name) {
      this.setState({ CurrentComponent: null });
      this.currentComponent(nextProps);
    }
  }

  render() {
    const { CurrentComponent } = this.state;
    if (!CurrentComponent) {
      return null;
    }

    return (
      <CurrentComponent {...this.props} />
    );
  }
}

LoaderApp.propTypes = {
  name: PropTypes.string.isRequired
};

LoaderApp.defaultProps = {
};
