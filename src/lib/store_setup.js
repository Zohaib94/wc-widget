import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import fixtures from '../reducers/fixtures';

//USE LOGGER ONLY IN DEV ENVIRONMENT
const loggerMiddleWare = createLogger({predicate: (getState, action) => process.env.NODE_ENV === `development` });

//WHEN STORE IS CREATED, ALSO ADD CONFIGURATION FOR REDUX LOGGER 
//AND THUNK FOR ASYNC REQUEST AND PROMISE RESPONSES
var configureStore = (initialState) => {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleWare,
    )
  );

  let rootReducer = combineReducers({fixtures});

  return createStore(rootReducer, initialState, enhancer);
}

//CONFIGURE STORE WITH AN EMPTY INITIAL STATE
const store = configureStore({ 
  fixtures: [],
  load_fixtures_failure: false,
  load_fixtures_initialize: false,
  load_fixtures: false,
  world_cup_ended: false
});

//EXPORT THE STORE SO WE CAN USE IT IN PROVIDER COMPONENT
export {store};
