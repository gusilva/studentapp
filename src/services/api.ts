import { ApiResponse, create } from "apisauce";
import { AddStudent, Student, UpdateStudent } from "../redux/students/types";

export interface Api {
  getStudents: () => Promise<ApiResponse<Student[]>>;
  addStudent: (student: AddStudent) => Promise<ApiResponse<Student>>;
  updateStudent: (student: UpdateStudent) => Promise<ApiResponse<Student>>;
  deleteStudent: (id: string) => Promise<ApiResponse<StudentMessage>>;
  axiosInstance: any;
}

export interface StudentMessage {
  message?: string;
}

export const createApi = (baseURL = "http://localhost:3001"): Api => {
  const api = create({
    baseURL,
    headers: {
      "Coche-Control": "no-cache",
      Accept: "application/json",
    },
    timeout: 5000,
  });

  const getStudents = () => api.get<Student[]>("students");
  const addStudent = (student: AddStudent) => api.post<Student>("students", student);
  const updateStudent = (student: UpdateStudent) => {
    const { id, ...rest } = student;
    return api.put<Student>(`students/${id}`, rest);
  };
  const deleteStudent = (id: string) => api.delete<StudentMessage>(`students/${id}`);

  return {
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    axiosInstance: api.axiosInstance,
  };
};

export default { createApi };
