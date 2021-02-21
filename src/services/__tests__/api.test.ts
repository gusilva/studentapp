import Api from "../api";
import MockAdapter from "axios-mock-adapter";
import { ApiResponse } from "apisauce";
import { AddStudent, Student, UpdateStudent } from "../../redux/students/types";

describe("Testing student api", () => {
  const api = Api.createApi();
  const mock = new MockAdapter(api.axiosInstance);

  test("should get a list of students", async () => {
    const response = require("../../fixtures/students.json");
    mock.onGet("students").reply(200, response);

    const result: ApiResponse<Student[]> = await api.getStudents();
    expect(result.ok).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data?.[0].name).toEqual("name 1");
  });

  test("should add a student", async () => {
    const apiResponse = require("../../fixtures/student.json");
    const data = {
      name: "name 3",
      surname: "surname 3",
      patronymic: "patronymic 3",
    } as AddStudent;

    mock.onPost("students", data).reply(200, apiResponse);

    const response = await api.addStudent(data);

    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ id: "5f6808bbf87c134b1cdfbd35", ...data });
  });

  test("should update a student", async () => {
    const request = { name: "name 3" } as UpdateStudent;
    const student = {
      id: "5f5dbd880a43ee0c6a1f14a1",
      name: "name 3",
      surname: "surname 2",
      patronymic: "patronymic 2",
    } as Student;

    mock.onPut("students/5f5dbd880a43ee0c6a1f14a1", request).reply(200, student);

    const response = await api.updateStudent({ ...request, id: "5f5dbd880a43ee0c6a1f14a1"});

    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(student);
  });

  test("should delete a student", async () => {
    const id = "5f51126ee6a98f7b424edd51";

    mock.onDelete("students/5f51126ee6a98f7b424edd51").reply(200, { message: "User has been deleted" });

    const response = await api.deleteStudent(id);

    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.data?.message).toEqual("User has been deleted");
  });
});
