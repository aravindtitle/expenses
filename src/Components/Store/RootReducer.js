import { combineReducers } from "redux";
import authReducer from "./authReducer";
import expensesReducer from "./expensesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
});

export default rootReducer;
