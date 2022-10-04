import { useReducer } from "react";

export enum Status {
  IDLE = "idle",
  PLAY = "play",
  STOPPED = "stopped",
  DONE = "done",
}

type Action = {
  type: Status;
};

type State = {
  status: Status;
  nextStatus: Status;
  value: string;
};

const initialState: State = {
  status: Status.IDLE,
  nextStatus: Status.PLAY,
  value: "start",
};

const reducer = (prevState: State, action: Action) => {
  switch (action.type) {
    case "idle":
      return {
        status: action.type,
        nextStatus: Status.PLAY,
        value: "start",
      };
    case "play":
      return {
        status: action.type,
        nextStatus: Status.STOPPED,
        value: "stopped",
      };
    case "stopped":
      return {
        status: action.type,
        nextStatus: Status.PLAY,
        value: "resume",
      };
    case "done":
      return {
        status: action.type,
        nextStatus: Status.IDLE,
        value: "reset",
      };
    default:
      return prevState;
  }
};

export function useTimingFunctionState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
  };
}
