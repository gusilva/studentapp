import Fixtures from "../services/fixture";
import { createApi } from "../services/api";
import { takeLatest, all } from "redux-saga/effects";
import { addStudent, deleteStudent, getStudents, updateStudent } from "./students-saga";
import {
  STUDENTS_ADD_REQUEST,
  STUDENTS_DEL_REQUEST,
  STUDENTS_REQUEST,
  STUDENTS_UPDATE_REQUEST,
} from "../redux/students/constants";

const api = process.env.REACT_APP_DATA === 'fixture' ? Fixtures : createApi();

export default function * root() {
  yield all([
    takeLatest(STUDENTS_REQUEST, getStudents, api),
    takeLatest(STUDENTS_ADD_REQUEST, addStudent, api),
    takeLatest(STUDENTS_UPDATE_REQUEST, updateStudent, api),
    takeLatest(STUDENTS_DEL_REQUEST, deleteStudent, api),
  ]);
}
