import React, { useState } from "react";
import {
  Avatar,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./student-list.presets";
import { useDispatch } from "react-redux";
import { deleteStudentsRequest, updateStudentsRequest } from "../../redux/students/actions";
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import { StudentForm } from "../student-form";
import { Student } from "../../redux/students/types";

interface StudentListProps {
  students: Student[];
}

export const StudentList: React.FC<StudentListProps> = ({ students = [] }: StudentListProps) => {
  const classes = useStyles();
  const [dense] = React.useState(false);
  const [secondary] = React.useState(false);
  const [index, setIndex] = useState('');
  const dispatch = useDispatch();

  const onDelHandler = (id?: string) => {
    if (id !== undefined) {
      dispatch(deleteStudentsRequest(id));
    }
  };

  const onEditHandler = (id?: string) => {
    if (id !== undefined) {
      setIndex(id);
    }
  };

  const onClose = () => {
    setIndex('');
  };

  const iconHandler = (id?: string) => {
    if (id !== undefined && id === index) {
      return (
        <IconButton onClick={onClose} edge="end" aria-label="delete">
          <CloseIcon />
        </IconButton>
      );
    }
    return (
      <IconButton onClick={() => onEditHandler(id)} edge="end" aria-label="delete">
        <EditIcon />
      </IconButton>
    );
  };

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        Add a new user
      </Typography>
      <div className={classes.demo}>
        <List dense={dense}>
          {students.map((student, idx) => (
            <React.Fragment key={idx}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${student.patronymic} ${student.name} ${student.surname}`}
                  secondary={secondary ? "Secondary text" : null}
                />
                <ListItemSecondaryAction>
                  {iconHandler(student.id)}
                  <IconButton
                    onClick={() => onDelHandler(student.id)}
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Collapse in={index === student.id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <StudentForm
                      student={student}
                      onClose={onClose}
                      onSubmit={updateStudentsRequest}
                      hideCloseButton
                    />
                  </ListItem>
                </List>
              </Collapse>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </div>
    </>
  );
};
