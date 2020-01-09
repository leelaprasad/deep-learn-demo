import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function subjectReducer(state = initialState.subjects, action) {
  switch (action.type) {
    case types.CREATE_SUBJECT_SUCCESS:
      return [...state, { ...action.subject }];
    case types.UPDATE_SUBJECT_SUCCESS:
      return state.map(subject =>
        subject.id === action.subject.id ? action.subject : subject
      );
    case types.LOAD_SUBJECTS_SUCCESS:
      return action.subjects;
    case types.DELETE_SUBJECT_OPTIMISTIC:
      return state.filter(subject => subject.id !== action.subject.id);
    default:
      return state;
  }
}
