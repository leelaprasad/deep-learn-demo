import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const SubjectForm = ({
  subject,
  authors,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  const classes = useStyles();

  return (
    <form onSubmit={onSave} noValidate>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <div>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  required
                  id="subject-name"
                  name="subjectName"
                  label="Subject Name"
                  value={subject.subjectName}
                  onChange={onChange}
                  error={errors.subjectName}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="authors">Add Assigness</InputLabel>

                <Select
                  name="selectedAuthors"
                  labelId="authors"
                  id="authors"
                  multiple
                  value={subject.selectedAuthors}
                  onChange={onChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div>
                      {selected.map(value => (
                        <Chip key={value} label={value} />
                      ))}
                    </div>
                  )}
                >
                  {authors.map(author => (
                    <MenuItem key={author.id} value={author.name}>
                      {author.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl variant="outlined" className={classes.formControl}>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </form>
  );
};

SubjectForm.propTypes = {
  authors: PropTypes.array.isRequired,
  subject: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default SubjectForm;
