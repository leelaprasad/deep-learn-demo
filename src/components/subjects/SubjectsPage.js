import React from "react";
import { connect } from "react-redux";
import * as subjectActions from "../../redux/actions/subjectActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { newSubject } from "../../../tools/mockData";
import SubjectList from "./SubjectList";
import ManageSubjectPage from "./ManageSubjectPage";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class SubjectsPage extends React.Component {
  state = {
    redirectToAddSubjectPage: false
  };

  componentDidMount() {
    const { subjects, authors, actions } = this.props;

    if (subjects.length === 0) {
      actions.loadSubjects().catch(error => {
        alert("Loading subjects failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }

  handleDeleteSubject = async subject => {
    toast.success("Subject deleted");
    try {
      await this.props.actions.deleteSubject(subject);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <ManageSubjectPage subject={newSubject} />
            <br />
            <SubjectList
              onDeleteClick={this.handleDeleteSubject}
              subjects={this.props.subjects}
            />
          </>
        )}
      </>
    );
  }
}

SubjectsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  subjects: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    subjects:
      state.authors.length === 0
        ? []
        : state.subjects.map(subject => {
            return {
              ...subject
              // authorName: state.authors.find(a => a.id === subject.authorId)
              //   .name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadSubjects: bindActionCreators(subjectActions.loadSubjects, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteSubject: bindActionCreators(subjectActions.deleteSubject, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsPage);
