import { Api, StudentMessage } from "../services/api";
import { call, put } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { ApiResponse } from "apisauce";
import {
  addStudentsSuccess,
  deleteStudentsSuccess,
  studentsSuccess,
  updateStudentsSuccess,
} from "../redux/students/actions";
import { Actions } from "../redux/students/types";
import { addNotification } from "../redux/notification/actions";
import { Notification } from "../redux/notification/types";

export function * getStudents(api: Api): SagaIterator {
  const response = yield call(api.getStudents);

  if (response.ok && response.data) {
    const students = response.data;
    yield put(studentsSuccess(students));
  } else {
    yield put(addNotification(error(response)));
  }
}

export function * addStudent(api: Api, action: Actions["StudentsAddRequest"]): SagaIterator {
  const { payload } = action;
  const response = yield call(api.addStudent, payload);
  if (response.ok && response.data) {
    yield put(addStudentsSuccess(response.data));
    yield put(addNotification(success("Student Added")));
  } else {
    yield put(addNotification(error(response)));
  }
}

export function * updateStudent(api: Api, action: Actions["StudentsUpdateRequest"]): SagaIterator {
  const { payload } = action;
  const response = yield call(api.updateStudent, payload);
  if (response.ok && response.data) {
    yield put(updateStudentsSuccess(response.data));
    yield put(addNotification(success("Student Updated")));
  } else {
    yield put(addNotification(error(response)));
  }
}

export function * deleteStudent(api: Api, action: Actions["StudentsDeleteRequest"]): SagaIterator {
  const { payload } = action;
  const response = yield call(api.deleteStudent, payload);
  if (response.ok) {
    yield put(deleteStudentsSuccess(payload));
    yield put(addNotification(success("Student Deleted")));
  } else {
    yield put(addNotification(error(response)));
  }
}

function success(message: string): Notification {
  return {
    message,
    type: "success",
  };
}

function error(res: ApiResponse<StudentMessage>): Notification {
  return {
    message: res.data?.message ? res.data.message : `${res.originalError?.message}`,
    type: "error",
  };
}
