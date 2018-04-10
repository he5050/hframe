'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadApp = loadApp;
exports.clearAppState = clearAppState;
function loadApp(name) {
	return {
		type: '@@loadApp',
		payload: {
			names: [name]
		}
	};
}

function clearAppState(name) {
	return {
		type: '@@clearAppState',
		payload: {
			name: name
		}
	};
}