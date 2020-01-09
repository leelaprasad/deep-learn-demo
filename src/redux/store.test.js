import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as subjectActions from "./actions/subjectActions";

it("Should handle creating subjects", function() {
  // arrange
  const store = createStore(rootReducer, initialState);
  const subject = {
    subjectName: "Test Subject"
  };

  // act
  const action = subjectActions.createSubjectSuccess(subject);
  store.dispatch(action);

  // assert
  const createdSubject = store.getState().subjects[0];
  expect(createdSubject).toEqual(subject);
});
