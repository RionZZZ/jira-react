import { useCallback, useReducer } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
  past: T[];
  present: T;
  feature: T[];
};

type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, feature } = state;
  const { newPresent, type } = action;

  switch (type) {
    case UNDO:
      if (past.length === 0) return state;
      const prev = past.at(-1)!;
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: prev,
        feature: [present, ...feature],
      };

    case REDO:
      if (feature.length === 0) return state;
      const next = feature[0];
      const newFeature = feature.slice(1);
      return {
        past: [...past, present],
        present: next,
        feature: newFeature,
      };

    case SET:
      if (present === newPresent) return state;
      return {
        past: [...past, present],
        present: newPresent,
        feature: [],
      };

    case RESET:
      return {
        past: [],
        present: newPresent,
        feature: [],
      };

    default:
      break;
  }

  return state;
};

export const useUndo = <T>(initialState: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialState,
    feature: [],
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.feature.length !== 0;

  const undo = useCallback(() => {
    dispatch({ type: UNDO });
  }, []);
  const redo = useCallback(() => {
    dispatch({ type: REDO });
  }, []);
  const set = useCallback((newPresent: T) => {
    dispatch({ type: SET, newPresent });
  }, []);
  const reset = useCallback((newPresent: T) => {
    dispatch({ type: RESET, newPresent });
  }, []);

  return [state, { undo, canUndo, redo, canRedo, set, reset }];
};
