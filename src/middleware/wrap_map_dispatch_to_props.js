import { bindActionCreators } from 'redux';

function wrapAction(actionCreator, reducer, name) {
	return (...args) => {
		return function () {
			return {
				name,
				actionCreator,
				reducer,
				args
			};
		};
	};
}


export default function wrapMapDispatchToProps(name, actionCreators, reducer) {
	const wrapActionCreators = {};
	const keys = Object.keys(actionCreators);

	for (let i = 0; i < keys.length; i++) {
		let key = keys[i];
		wrapActionCreators[key] = wrapAction(actionCreators[key], reducer, name);
	}

	return dispatch => {
		return {
			...bindActionCreators(wrapActionCreators, dispatch),
		};
	};
}
