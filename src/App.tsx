import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { StudentForm, Nav, StudentList, Notify } from "./components";
import { useModal } from "./hooks/useModal";
import { addStudentsRequest, studentsRequest } from "./redux/students/actions";
import { useDispatch } from "react-redux";
import { useStudentsSelector } from "./redux/students/reducer";
import { debounce } from "lodash";

function App() {
  const { show, hide, RenderModal } = useModal();
  const { students } = useStudentsSelector((state) => state.students);
  const [data, setData] = useState(students);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(studentsRequest());
  }, []);

  useEffect(() => {
    setData(students);
  }, [students]);

  const searchFilter = debounce((value: string) => {
    if (value) {
      setData(students.filter(student => student.name.toLowerCase().includes(value.toLowerCase())));
    } else {
      setData(students);
    }
  }, 300);

  return (
    <>
      <Nav onAdd={show} search={searchFilter}/>
      <Container maxWidth="lg">
        <StudentList students={data} />
      </Container>
      <RenderModal>
        <StudentForm onClose={hide} onSubmit={addStudentsRequest} vertical />
      </RenderModal>
      <Notify />
    </>
  );
}

export default App;
