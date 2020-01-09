import * as subjectActions from "./subjectActions";
import * as types from "./actionTypes";
import { subjects } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Subjects Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_SUBJECTS_SUCCESS when loading subjects", () => {
      fetchMock.mock("*", {
        body: subjects,
        headers: { "content-type": "application/json" }
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_SUBJECTS_SUCCESS, subjects }
      ];

      const store = mockStore({ subjects: [] });
      return store.dispatch(subjectActions.loadSubjects()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("createSubjectSuccess", () => {
  it("should create a CREATE_SUBJECT_SUCCESS action", () => {
    //arrange
    const subject = subjects[0];
    const expectedAction = {
      type: types.CREATE_SUBJECT_SUCCESS,
      subject
    };

    //act
    const action = subjectActions.createSubjectSuccess(subject);

    //assert
    expect(action).toEqual(expectedAction);
  });
});
