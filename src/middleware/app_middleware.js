import appFactory from './app_factory';

export default () => store => {
	return next => action => {
		const { getState, dispatch } = store;
		if (typeof action === 'function') {
			const { name, actionCreator, args, reducer } = action();
			const reduce = (type, ...args) => {
				dispatch({
					type: '@@reduce',
					payload: {
						name,
						type,
						reducer,
						payload: args
					}
				});
			};

			actionCreator(...args)({
				currentApp: {
					name
				},
				store,
				reduce,
				getState: () => getState()[name]
			});
		} else if (action.type && action.type === '@@loadApp') {
			try {
				const { names = [] } = action.payload;
				for (let i = 0; i < names.length; i++) {
					let name = names[i];
					let appInfo = appFactory.getApp(name);
					appInfo.load((component, action, reducer) => {
						return next({
							type: '@@loadAppReal',
							payload: {
								name,
								appInfo,
								component,
								action,
								reducer
							}
						});
					});
				}
			} catch (e) {
				console.error(e);
				return next(action);
			}
		} else {
			return next(action);
		}
	};
};
