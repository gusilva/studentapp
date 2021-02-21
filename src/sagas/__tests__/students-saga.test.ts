import Fixture from "../../services/fixture";
import { getStudents, addStudent, updateStudent, deleteStudent } from "../students-saga";
import { call, put } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
  addStudentsRequest,
  addStudentsSuccess,
  deleteStudentsRequest,
  deleteStudentsSuccess,
  studentsSuccess,
  updateStudentsRequest,
  updateStudentsSuccess,
} from "../../redux/students/actions";
import { ApiResponse } from "apisauce";
import { addNotification } from "../../redux/notification/actions";
import { Notification } from "../../redux/notification/types";
import { Api } from "../../services/api";

const stepper = (fn: SagaIterator) => (mock?: any) => fn.next(mock).value;

describe("Testing student middleware - get all students", () => {
  test("should first call the api", () => {
    const step = stepper(getStudents(Fixture));

    expect(step()).toEqual(call(Fixture.getStudents));
  });

  test("should return a list of students", async () => {
    const response = await Fixture.getStudents();
    const step = stepper(getStudents(Fixture));
    step();
    const stepResponse = step(response);

    expect(stepResponse).toEqual(put(studentsSuccess(response.data ?? [])));
  });
});

describe("Testing student middleware - add student", () => {
  const student = {
    name: "name 3",
    surname: "surname 3",
    patronymic: "patronymic 3",
  };

  test("should first call the add student api", () => {
    const step = stepper(addStudent(Fixture, addStudentsRequest(student)));
    expect(step()).toEqual(call(Fixture.addStudent, student));
  });

  test("should add student to if the request succeed", async () => {
    const response = await Fixture.addStudent(student);
    const msg: Notification = { message: "Student Added", type: "success" };
    const step = stepper(addStudent(Fixture, addStudentsRequest(student)));
    step();
    const stepResponse = step(response);

    expect(response.data).toBeTruthy();
    response.data && expect(stepResponse).toEqual(put(addStudentsSuccess(response.data)));
    expect(step(stepResponse)).toEqual(put(addNotification(msg)));

  });

  test("should fail", async () => {
    student.name = 'john';
    const response = await Fixture.addStudent(student);
    const step = stepper(addStudent(Fixture, addStudentsRequest(student)));
    step();
    expect(step(response)).toEqual(
      put(addNotification({ message: "Not able to add user", type: "error" })),
    );
  });
});

describe("Testing student middleware - update student", () => {
  const student = {
    id: "5f51126ee6a98f7b424edd51",
    name: "name 3",
  };

  test("should first call the update student api", () => {
    const step = stepper(updateStudent(Fixture, updateStudentsRequest(student)));
    expect(step()).toEqual(call(Fixture.updateStudent, student));
  });

  test("should update student if the request succeed", async () => {
    const response = await Fixture.updateStudent(student);
    const step = stepper(updateStudent(Fixture, updateStudentsRequest(student)));
    step();
    const stepResponse = step(response);
    expect(response.data).toBeTruthy();
    const msg: Notification = { message: "Student Updated", type: "success" };
    response.data && expect(stepResponse).toEqual(put(updateStudentsSuccess(response.data)));
    expect(step(stepResponse)).toEqual(put(addNotification(msg)));
  });

  test("should fail", async () => {
    student.name = 'john';
    const response = await Fixture.updateStudent(student);
    const step = stepper(updateStudent(Fixture, updateStudentsRequest(student)));
    const msg: Notification = { message: "Not able to update user", type: "error" }
    step();
    expect(step(response)).toEqual(put(addNotification(msg)),);
  });
});

describe("Testing student middleware - delete student", () => {
  test("should first call the delete student api", () => {
    const step = stepper(deleteStudent(Fixture, deleteStudentsRequest("5f51126ee6a98f7b424edd51")));
    expect(step()).toEqual(call(Fixture.deleteStudent, "5f51126ee6a98f7b424edd51"));
  });

  test("should delete student if the request succeed", async () => {
    const response = await Fixture.deleteStudent("5f51126ee6a98f7b424edd51");
    const step = stepper(deleteStudent(Fixture, deleteStudentsRequest("5f51126ee6a98f7b424edd51")));
    step();
    const stepResponse = step(response);
    const msg: Notification = { message: "Student Deleted", type: "success" };
    expect(stepResponse).toEqual(put(deleteStudentsSuccess("5f51126ee6a98f7b424edd51")));
    expect(step(stepResponse)).toEqual(put(addNotification(msg)));
    expect(response.data).toBeTruthy();
  });

  test("should fail", async () => {
    const response = await Fixture.deleteStudent("99");
    const step = stepper(deleteStudent(Fixture, deleteStudentsRequest("99")));
    step();
    expect(step(response)).toEqual(
      put(addNotification({ message: "User has not been deleted", type: "error" })),
    );
  });
});
