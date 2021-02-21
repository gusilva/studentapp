import { Reducer } from "redux";
import { StudentState } from "./types";
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
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../index";

export const INITIAL_STATE: StudentState = {
  students: [],
  fetching: false,
};

export const StudentReducer: Reducer<StudentState> = (
  state: StudentState = INITIAL_STATE,
  { type, payload },
): StudentState => {
  switch (type) {
    case STUDENTS_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case STUDENTS_SUCCESS:
      return {
        fetching: false,
        students: payload,
      };
    case STUDENTS_ADD_REQUEST:
      return {
        ...state,
        fetching: true,
        payload: payload,
      };
    case STUDENTS_ADD_SUCCESS:
      return {
        fetching: false,
        students: [...state.students, payload],
      };
    case STUDENTS_UPDATE_REQUEST:
      return {
        ...state,
        fetching: true,
        payload: payload,
      };
    case STUDENTS_UPDATE_SUCCESS:
      return {
        ...state,
        fetching: false,
        students: [
          ...state.students.map((student) => {
            if (student.id === payload.id) {
              return { ...student, ...payload };
            }
            return student;
          }),
        ],
      };
    case STUDENTS_DEL_REQUEST:
      return {
        ...state,
        fetching: true,
        payload: payload,
      };
    case STUDENTS_DEL_SUCCESS:
      return {
        ...state,
        fetching: false,
        students: [...state.students.filter((student) => student.id !== payload)],
      };
    default:
      return { ...state };
  }
};

export const useStudentsSelector: TypedUseSelectorHook<RootState> = useSelector;
