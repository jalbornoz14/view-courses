import { serviceApi } from "@/services/axios";

class CoursesService {
  async getCourses() {
    try {
      const { data, status } = await serviceApi.get("/courses");
      return { data, status };
    } catch (error) {
      return { status: error.response.status, data: error.response.data };
    }
  }

  async getCourseById(id) {
    try {
      const { data, status } = await serviceApi.get(`/courses/${id}`);
      return { data, status };
    } catch (error) {
      return { status: error.response.status, data: error.response.data };
    }
  }

  async createCourse(course) {
    try {
      const { data, status } = await serviceApi.post("/courses", course);
      return { data, status };
    } catch (error) {
      return { status: error.response.status, data: error.response.data };
    }
  }

  async updateCourse(id, course) {
    try {
      const { data, status } = await serviceApi.put(`/courses/${id}`, course);
      return { data, status };
    } catch (error) {
      return { status: error.response.status, data: error.response.data };
    }
  }

  async deleteCourse(id) {
    try {
      const { data, status } = await serviceApi.delete(`/courses/${id}`);
      return { data, status };
    } catch (error) {
      return { status: error.response.status, data: error.response.data };
    }
  }
}

export default new CoursesService();
