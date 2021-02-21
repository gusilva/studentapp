import React from "react";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useStyles } from "./student-form.presets";
import { ButtonGroup } from "../button-group";
import { AddStudent, Actions, UpdateStudent } from "../../redux/students/types";

interface StudentFormProps {
  onClose?: () => void;
  onSubmit(
    student: UpdateStudent | AddStudent,
  ): Actions["StudentsAddRequest"] | Actions["StudentsUpdateRequest"];
  vertical?: boolean;
  student?: UpdateStudent | AddStudent;
  hideCloseButton?: boolean;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  hideCloseButton,
  onClose,
  onSubmit,
  vertical = false,
  student,
}: StudentFormProps) => {
  const classes = useStyles();
  const [name, setName] = React.useState(student?.name ?? ' ');
  const [surname, setSurname] = React.useState(student?.surname ?? ' ');
  const [patronymic, setPatronymic] = React.useState(student?.patronymic || "");
  const dispatch = useDispatch();

  const onAddHandler = () => {
    if (name && surname) {
      onSubmit && dispatch(onSubmit({ ...student, name, surname, patronymic }));
      onClose && onClose();
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value.trim());
  };

  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value.trim());
  };

  const handlePatronymicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPatronymic(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={vertical ? classes.vertical : classes.horizontal}>
        <TextField
          error={!name}
          className={classes.margin}
          id="name-size-normal"
          label="Name"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          error={!surname}
          className={classes.margin}
          id="surname-size-normal"
          label="Surname"
          variant="outlined"
          value={surname}
          onChange={handleSurnameChange}
        />
        <TextField
          className={classes.margin}
          id="patronymic-size-normal"
          label="Patronymic"
          variant="outlined"
          value={patronymic}
          onChange={handlePatronymicChange}
        />
        <div className={classes.row}>
          <ButtonGroup onCancel={hideCloseButton ? undefined : onClose} onSubmit={onAddHandler} />
        </div>
      </div>
    </form>
  );
};
