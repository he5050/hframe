export function loadApp(name) {
	return {
		type: '@@loadApp',
		payload: {
			names: [name]
		}
	};
}

export function clearAppState(name) {
	return {
		type: '@@clearAppState',
		payload: {
			name
		}
	};
}
