import { createSlice } from "@reduxjs/toolkit";

interface State {
  modalOpen: boolean;
}

const initialState: State = {
  modalOpen: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    openProjectModal(state, action) {
      state.modalOpen = true;
    },
    closeProjectModal(state, action) {
      state.modalOpen = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;
