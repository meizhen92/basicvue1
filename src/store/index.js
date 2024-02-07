import { createStore } from "vuex";
import PersistedState from "vuex-persistedstate";
import MovieDataModule from "./modules/MovieDataModule";
import LogInModule from "./modules/LogInModule";
import SearchMovieModule from "./modules/SearchMovieModule";
import DaumPostCodeModule from "./modules/DaumPostCodeModule";
import RegisterModule from "./modules/RegisterModule";
import UpdateGradeModule from "./modules/UpdateGradeModule";
import NoticeModule from "./modules/NoticeModule";
import UpdateUserInfoModule from "./modules/UpdateUserInfoModule";

const storageState = PersistedState({
  paths: ["LogInModule", "NoticeModule"],
});

export default createStore({
  modules: {
    MovieDataModule,
    LogInModule,
    SearchMovieModule,
    DaumPostCodeModule,
    RegisterModule,
    UpdateGradeModule,
    NoticeModule,
    UpdateUserInfoModule,
  },
  plugins: [
    // 새로고침 시 값이 있다면 로컬스토리지에서 가져와서 사용
    storageState,
  ],
});
