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

export interface Student {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
}

export interface AddStudent {
  name?: string;
  surname?: string;
  patronymic?: string;
}

export interface UpdateStudent {
  id: string;
  name?: string;
  surname?: string;
  patronymic?: string;
}

interface StudentsRequestAction {
  type: typeof STUDENTS_REQUEST;
}

interface StudentsSuccessAction {
  type: typeof STUDENTS_SUCCESS;
  payload: Student[];
}

interface StudentsAddRequestAction {
  type: typeof STUDENTS_ADD_REQUEST;
  payload: AddStudent;
}

interface StudentsAddSuccessAction {
  type: typeof STUDENTS_ADD_SUCCESS;
  payload: Student;
}

interface StudentsUpdateRequestAction {
  type: typeof STUDENTS_UPDATE_REQUEST;
  payload: UpdateStudent;
}

interface StudentsUpdateSuccessAction {
  type: typeof STUDENTS_UPDATE_SUCCESS;
  payload: Student;
}

interface StudentsDeleteRequestAction {
  type: typeof STUDENTS_DEL_REQUEST;
  payload: string;
}

interface StudentsDeleteSuccessAction {
  type: typeof STUDENTS_DEL_SUCCESS;
  payload: string;
}

export interface StudentState {
  students: Student[];
  fetching?: boolean;
  payload?: Student | AddStudent | UpdateStudent | Student[];
}

export interface Actions {
  StudentsRequest: StudentsRequestAction;
  StudentsSuccess: StudentsSuccessAction;
  StudentsAddRequest: StudentsAddRequestAction;
  StudentsAddSuccess: StudentsAddSuccessAction;
  StudentsUpdateRequest: StudentsUpdateRequestAction;
  StudentsUpdateSuccess: StudentsUpdateSuccessAction;
  StudentsDeleteRequest: StudentsDeleteRequestAction;
  StudentsDeleteSuccess: StudentsDeleteSuccessAction;
}
