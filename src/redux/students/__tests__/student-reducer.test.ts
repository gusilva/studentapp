import { INITIAL_STATE, StudentReducer } from "../reducer";
import {
  addStudentsRequest,
  addStudentsSuccess,
  deleteStudentsRequest,
  deleteStudentsSuccess,
  studentsRequest,
  studentsSuccess,
  updateStudentsRequest,
  updateStudentsSuccess,
} from "../actions";
import { Student } from "../types";

const STUDENTS: Student[] = require("../../../fixtures/students.json");
const STUDENT: Student = require("../../../fixtures/student.json");

describe("Testing student api - retrieve all students", () => {
  test("students request", () => {
    const state = StudentReducer(INITIAL_STATE, studentsRequest());

    expect(state.fetching).toBe(true);
    expect(state.students).toEqual([]);
  });

  test("should set students on success", () => {
    const state = StudentReducer(
      { ...INITIAL_STATE, students: [], fetching: true },
      studentsSuccess(STUDENTS),
    );

    expect(state.fetching).toBe(false);
    expect(state.students).toEqual(STUDENTS);
  });
});

describe("Testing student api - add student", () => {
  test("students add request", () => {
    const student = {
      name: "name 3",
      surname: "surname 3",
      patronymic: "patronymic 3",
    };
    const state = StudentReducer(INITIAL_STATE, addStudentsRequest(student));

    expect(state.fetching).toBe(true);
    expect(state.payload).toEqual(student);
  });

  test("should add students on success", () => {
    const state = StudentReducer(
      { ...INITIAL_STATE, fetching: true, students: STUDENTS },
      addStudentsSuccess(STUDENT),
    );

    expect(state.fetching).toBe(false);
    expect(state.students.length).toEqual(3);
    expect(state.students[2]).toEqual(STUDENT);
  });
});

describe("Testing student api - update student", () => {
  test("students update request", () => {
    const student = {
      id: "5f5dbd880a43ee0c6a1f14a1",
      name: "name 3",
    };
    const state = StudentReducer(INITIAL_STATE, updateStudentsRequest(student));

    expect(state.fetching).toBe(true);
    expect(state.payload).toEqual(student);
  });

  test("should update students on success", () => {
    const student = {
      id: "5f5dbd880a43ee0c6a1f14a1",
      name: "name 3",
      surname: "surname 2",
      patronymic: "patronymic 2",
    };
    const state = StudentReducer(
      { ...INITIAL_STATE, fetching: true, students: STUDENTS },
      updateStudentsSuccess(student),
    );

    expect(state.fetching).toBe(false);
    expect(state.students.length).toEqual(2);
    expect(state.students[1]).toEqual(student);
  });
});

describe("Testing student api - delete student", () => {
  test("students delete request", () => {
    const state = StudentReducer(INITIAL_STATE, deleteStudentsRequest("5f5dbd880a43ee0c6a1f14a1"));

    expect(state.fetching).toBe(true);
    expect(state.payload).toEqual("5f5dbd880a43ee0c6a1f14a1");
  });

  test("should delete student on success", () => {
    const state = StudentReducer(
      { ...INITIAL_STATE, fetching: true, students: STUDENTS },
      deleteStudentsSuccess("5f5dbd880a43ee0c6a1f14a1"),
    );

    expect(state.fetching).toBe(false);
    expect(state.students.length).toEqual(1);
    expect(state.students[0].id).toEqual("5f51126ee6a98f7b424edd51");
  });
});
