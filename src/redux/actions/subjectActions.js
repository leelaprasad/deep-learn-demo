import * as types from "./actionTypes";
import * as subjectApi from "../../api/subjectApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadSubjectSuccess(subjects) {
  return { type: types.LOAD_SUBJECTS_SUCCESS, subjects };
}

export function createSubjectSuccess(subject) {
  return { type: types.CREATE_SUBJECT_SUCCESS, subject };
}

export function updateSubjectSuccess(subject) {
  return { type: types.UPDATE_SUBJECT_SUCCESS, subject };
}

export function deleteSubjectOptimistic(subject) {
  return { type: types.DELETE_SUBJECT_OPTIMISTIC, subject };
}

export function loadSubjects() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return subjectApi
      .getSubjects()
      .then(subjects => {
        dispatch(loadSubjectSuccess(subjects));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveSubject(subject) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    // dispatch(beginApiCall());
    return subjectApi
      .saveSubject(subject)
      .then(savedSubject => {
        subject.id
          ? dispatch(updateSubjectSuccess(savedSubject))
          : dispatch(createSubjectSuccess(savedSubject));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteSubject(subject) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteSubjectOptimistic(subject));
    return subjectApi.deleteSubject(subject.id);
  };
}
