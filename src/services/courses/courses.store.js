import coursesService from "./courses.service";

const state = {
  courses: [],
  course: null,
  error: null,
  loading: false,
};

const getters = {
  courses: (state) => state.courses,
  course: (state) => state.course,
  error: (state) => state.error,
  loading: (state) => state.loading,
};

const actions = {
  async A_GET_COURSES({ commit }) {
    const { data, status } = await coursesService.getCourses();
    return { data, status };
  },
  async A_GET_COURSE_BY_ID({ commit }, id) {
    commit("setLoading", true);
    const { data, status } = await coursesService.getCourseById(id);
    if (status === 200) {
      commit("setCourse", data);
      commit("setError", null);
    } else {
      commit("setError", data.message);
    }
    commit("setLoading", false);
  },
  async A_CREATE_COURSE({ commit }, course) {
    commit("setLoading", true);
    const { data, status } = await coursesService.createCourse(course);
    if (status === 201) {
      commit("setCourse", data);
      commit("setError", null);
    } else {
      commit("setError", data.message);
    }
    commit("setLoading", false);
  },
  async A_UPDATE_COURSE({ commit }, { id, course }) {
    commit("setLoading", true);
    const { data, status } = await coursesService.updateCourse(id, course);
    if (status === 200) {
      commit("setCourse", data);
      commit("setError", null);
    } else {
      commit("setError", data.message);
    }
    commit("setLoading", false);
  },
  async A_DELETE_COURSE({ commit }, id) {
    commit("setLoading", true);
    const { status } = await coursesService.deleteCourse(id);
    if (status === 204) {
      commit("setCourse", null);
      commit("setError", null);
    } else {
      commit("setError", data.message);
    }
    commit("setLoading", false);
  },
};

const mutations = {
  setCourses(state, courses) {
    state.courses = courses;
  },
  setCourse(state, course) {
    state.course = course;
  },
  setError(state, error) {
    state.error = error;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
