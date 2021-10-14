import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"
import FeedReducer from './reducers/Feed';

const composeEnhancers = null || compose;
const rootReducer = combineReducers({
  FeedReducer: FeedReducer,
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk))
);

export default store