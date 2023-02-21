import { useCallback, useState } from "react";

export const useUndo = <T>(initialState: T) => {
  // const [past, setPast] = useState<T[]>([]);
  // const [present, setPresent] = useState(initialState);
  // const [feature, setFeature] = useState<T[]>([]);

  const [state, setState] = useState<{
    past: T[];
    present: T;
    feature: T[];
  }>({
    past: [],
    present: initialState,
    feature: [],
  });

  // const canUndo = past.length !== 0;
  // const canRedo = feature.length !== 0;
  const canUndo = state.past.length !== 0;
  const canRedo = state.feature.length !== 0;

  // const undo = useCallback(() => {
  //   if (!canUndo) return;
  //   const prev = past.at(-1)!;
  //   const newPast = past.slice(0, past.length - 1);

  //   setPast(newPast);
  //   setPresent(prev);
  //   setFeature([present, ...feature]);
  // }, [past, feature, setPast, setPresent, setFeature]);
  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, present, feature } = currentState;
      if (past.length === 0) return currentState;
      const prev = past.at(-1)!;
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: prev,
        feature: [present, ...feature],
      };
    });
  }, []);

  // const redo = () => {
  //   if (!canRedo) return;
  //   const next = feature[0];
  //   const newFeature = feature.slice(1);

  //   setPast([...past, present]);
  //   setPresent(next);
  //   setFeature(newFeature);
  // };
  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, present, feature } = currentState;
      if (feature.length === 0) return currentState;
      const next = feature[0];
      const newFeature = feature.slice(1);
      return {
        past: [...past, present],
        present: next,
        feature: newFeature,
      };
    });
  }, []);

  // const set = (newPresent: T) => {
  //   if (present === newPresent) return;
  //   setPresent(newPresent);
  //   setPast([...past, present]);
  //   setFeature([]);
  // };
  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { past, present, feature } = currentState;
      if (present === newPresent) return currentState;
      return {
        past: [...past, present],
        present: newPresent,
        feature: [],
      };
    });
  }, []);

  // const reset = (newPresent: T) => {
  //   setPresent(newPresent);
  //   setPast([]);
  //   setFeature([]);
  // };
  const reset = useCallback((newPresent: T) => {
    setState({
      past: [],
      present: newPresent,
      feature: [],
    });
  }, []);

  return [
    // { past, present, feature },
    state,
    { undo, canUndo, redo, canRedo, set, reset },
  ];
};
