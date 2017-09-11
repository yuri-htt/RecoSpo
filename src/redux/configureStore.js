import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './modules/reducer';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk, logger)
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = reducer.default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
