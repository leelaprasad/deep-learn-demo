import { combineReducers } from "redux";
import subjects from "./subjectReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  subjects,
  authors,
  apiCallsInProgress
});

export default rootReducer;
