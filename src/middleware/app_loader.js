import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseComponent from './base_component';
import * as actions from './com_action';

/**
 * 
 * @class AppLoader
 * @extends {BaseComponent('系统')}
 */
class AppLoader extends BaseComponent('系统') {
	constructor(props, context) {
		super(props, context);
	}

	componentWillMount() {
		const { name, payload } = this.props;
		if (!payload['@@require']) {
			this.props.loadApp(name);
		}
	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
		const { name, payload } = nextProps;

		if (!payload['@@require']) {
			this.props.loadApp(name, this.props.name);
		} else if (this.props.name != nextProps.name) {
			this.props.clearAppState(this.props.name);
		}
	}

	//cxb效率优化点，由主动更新变更为状态比较更新?
	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	render() {
		const { name, payload, ...others }=this.props;
		if (!payload['@@require']) {
			return null;
		}

		const ReduxConnector = payload['@@require'].container;
		if (!ReduxConnector) {
			return null;
		}
		
		return (
			<ReduxConnector store={this.context.store} payload={payload} key={name} {...others}/>
		);
	}
}

AppLoader.contextTypes = {
	store: PropTypes.object
};

export default connect(
	(state, props) => {
		const payload = state[props.name];
		return {
			payload: payload||{}
		};
	},
	dispatch => ({ ...bindActionCreators({ ...actions }, dispatch) }),
	null, 
	{
		withRef: true,
		pure: true
	}
)(AppLoader);
