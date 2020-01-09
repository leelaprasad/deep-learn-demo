import subjectReducer from "./subjectReducer";
import * as actions from "../actions/subjectActions";

it("should add subject when passed CREATE_SUBJECT_SUCCESS", () => {
  // arrange
  const initialState = [
    {
      subjectName: "A"
    },
    {
      subjectName: "B"
    }
  ];

  const newSubject = {
    subjectName: "C"
  };

  const action = actions.createSubjectSuccess(newSubject);

  // act
  const newState = subjectReducer(initialState, action);

  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");
});

it("should update subject when passed UPDATE_SUBJECT_SUCCESS", () => {
  // arrange
  const initialState = [
    { id: 1, title: "A" },
    { id: 2, title: "B" },
    { id: 3, title: "C" }
  ];

  const subject = { id: 2, subjectName: "New Title" };
  const action = actions.updateSubjectSuccess(subject);

  // act
  const newState = subjectReducer(initialState, action);
  const updatedSubject = newState.find(a => a.id == subject.id);
  const untouchedSubject = newState.find(a => a.id == 1);

  // assert
  expect(updatedSubject.subjectName).toEqual("New Title");
  expect(untouchedSubject.subjectName).toEqual("A");
  expect(newState.length).toEqual(3);
});
