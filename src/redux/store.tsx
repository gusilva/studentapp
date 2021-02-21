import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./index";
import rootSaga from "../sagas/";

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const enhancers = [applyMiddleware(sagaMiddleware)];
  enhancers.push(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  );

  const store = createStore(rootReducer, compose(...enhancers));

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
