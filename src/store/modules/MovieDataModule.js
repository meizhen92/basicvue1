/* eslint-disable */
import axios from "axios";

const MovieDataModule = {
  name: "movieDataModule",
  namespaced: true,
  state: () => ({
    movieInfo: {},
  }),
  getters: {},
  mutations: {
    setMovieData(state, data) {
      state.movieInfo = data;
    },
  },
  actions: {
    movieData(context) {
      axios
        .post("/movieData")
        .then((res) => {
          console.log("movieData axios suc", res.data);
          setTimeout(() => {
            context.commit("setMovieData", res.data.movieData);
          }, 1000);
        })
        .catch((error) => {
          console.log("axios fail", error);
        });
    },
  },
};

export default MovieDataModule;
