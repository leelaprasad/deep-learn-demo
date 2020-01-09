import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadSubjects, saveSubject } from "../../redux/actions/subjectActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import SubjectForm from "./SubjectForm";
import { newSubject } from "../../../tools/mockData";
import { toast } from "react-toastify";

export function ManageSubjectPage({
  subjects,
  authors,
  loadAuthors,
  loadSubjects,
  saveSubject,
  ...props
}) {
  const [subject, setSubject] = useState({ ...props.subject });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (subjects.length === 0) {
      loadSubjects().catch(error => {
        alert("Loading subjects failed" + error);
      });
    } else {
      setSubject({ ...props.subject });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.subject]);

  function handleChange(event) {
    const { name, value } = event.target;
    setSubject(prevSubject => ({
      ...prevSubject,
      [name]: name === "Id" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { subjectName } = subject;
    const errors = {};

    if (!subjectName) errors.subjectName = "Subject Name is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveSubject(subject)
      .then(() => {
        setSaving(false);
        setSubject(newSubject);
        toast.success("Subject saved.");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    <SubjectForm
      subject={subject}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageSubjectPage.propTypes = {
  subject: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  subjects: PropTypes.array.isRequired,
  loadSubjects: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveSubject: PropTypes.func.isRequired
};

export function getSubjectBySlug(subjects, slug) {
  return subjects.find(subject => subject.slug === slug) || null;
}

function mapStateToProps(state) {
  return {
    newSubject,
    subjects: state.subjects,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadSubjects,
  loadAuthors,
  saveSubject
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSubjectPage);
