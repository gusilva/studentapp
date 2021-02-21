import { Actions, AddStudent, Student, UpdateStudent } from "./types";
import {
  STUDENTS_ADD_REQUEST,
  STUDENTS_ADD_SUCCESS,
  STUDENTS_DEL_REQUEST,
  STUDENTS_DEL_SUCCESS,
  STUDENTS_REQUEST,
  STUDENTS_SUCCESS,
  STUDENTS_UPDATE_REQUEST,
  STUDENTS_UPDATE_SUCCESS,
} from "./constants";

export function studentsRequest(): Actions["StudentsRequest"] {
  return {
    type: STUDENTS_REQUEST,
  };
}

export function studentsSuccess(students: Student[]): Actions["StudentsSuccess"] {
  return {
    type: STUDENTS_SUCCESS,
    payload: students,
  };
}

export function addStudentsRequest(student: AddStudent): Actions["StudentsAddRequest"] {
  return {
    type: STUDENTS_ADD_REQUEST,
    payload: student,
  };
}

export function addStudentsSuccess(student: Student): Actions["StudentsAddSuccess"] {
  return {
    type: STUDENTS_ADD_SUCCESS,
    payload: student,
  };
}

export function updateStudentsRequest(student: UpdateStudent): Actions["StudentsUpdateRequest"] {
  return {
    type: STUDENTS_UPDATE_REQUEST,
    payload: student,
  };
}

export function updateStudentsSuccess(student: Student): Actions["StudentsUpdateSuccess"] {
  return {
    type: STUDENTS_UPDATE_SUCCESS,
    payload: student,
  };
}

export function deleteStudentsRequest(id: string): Actions["StudentsDeleteRequest"] {
  return {
    type: STUDENTS_DEL_REQUEST,
    payload: id,
  };
}

export function deleteStudentsSuccess(id: string): Actions["StudentsDeleteSuccess"] {
  return {
    type: STUDENTS_DEL_SUCCESS,
    payload: id,
  };
}
