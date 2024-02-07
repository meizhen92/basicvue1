/* eslint-disable */
import axios from "axios";

const SearchMovieModule = {
  name: "SearchMovieModule",
  namespaced: true,
  state: () => ({
    selMovieInfo: {},
  }),
  mutations: {
    selMovie(state, data) {
      state.selMovieInfo = data;
    },
  },
  actions: {
    searchMovie(context, param) {
      console.log("searchMovie param check:", param);
      axios
        .post("/searchMovie", { movieNm: param })
        .then((res) => {
          console.log("searchMovie axios suc", res.data.selMovie);
          context.commit("selMovie", res.data.selMovie);
        })
        .catch((error) => {
          console.log("axios fail", error);
        });
    },
  },
};

export default SearchMovieModule;
