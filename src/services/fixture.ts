import { AxiosInstance } from "axios";
import { Api } from "./api";
import { AddStudent, Student, UpdateStudent } from "../redux/students/types";

const STUDENTS: Student[] = require("../fixtures/students.json");

export default {
  getStudents: () => {
    return Promise.resolve({
      ok: true,
      data: require("../fixtures/students.json"),
    });
  },
  addStudent: (student: AddStudent) => {
    if (student.name === "john") {
      return Promise.resolve({
        ok: false,
        data: { message: "Not able to add user" },
      });
    }
    return Promise.resolve({
      ok: true,
      data: { id: "5f51126ee6a98f7b424edd51", ...student },
    });
  },
  updateStudent: (student: UpdateStudent) => {
    if (student.name === "john") {
      return Promise.resolve({
        ok: false,
        data: { message: "Not able to update user" },
      });
    }
    return Promise.resolve({
      ok: true,
      data: { ...STUDENTS.find(st => st.id === student.id), ...student },
    });
  },
  deleteStudent: (id: string) => {
    if (id === "99") {
      return Promise.resolve({
        ok: false,
        data: { message: `User has not been deleted` },
      });
    }
    return Promise.resolve({
      ok: true,
      data: { message: `User has been deleted` },
    });
  },
  axiosInstance: (): AxiosInstance => {
    return {} as AxiosInstance;
  },
} as Api;

// export const FixtureError = {
//   getStudents: () => {
//     return Promise.resolve({
//       ok: false,
//       data: { message: "api failure" },
//     } as ApiResponse<StudentMessage>);
//   },
//   addStudent: (student: AddStudent): ApiErrorResponse<StudentMessage> => {
//     return Promise.resolve({
//       ok: false,
//       data: { message: `error on add user: ${student.name}` },
//     } as ApiErrorResponse<StudentMessage>);
//   },
//   updateStudent: (student: UpdateStudent): ApiErrorResponse<StudentMessage> => {
//     return Promise.resolve({
//       ok: false,
//       data: { message: `error on add user: ${student.name}` },
//     } as ApiErrorResponse<StudentMessage>);
//   },
//   deleteStudent: (id: string): ApiErrorResponse<StudentMessage> => {
//     return Promise.resolve({
//       ok: false,
//       data: { message: `User has not been deleted` },
//     } as ApiErrorResponse<StudentMessage>);
//   },
//   axiosInstance: (): AxiosInstance => {
//     return {} as AxiosInstance;
//   },
// } as Api;
