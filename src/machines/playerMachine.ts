import { setup } from "xstate";

type PlayerEvent = { type: "TOGGLE_FULL" } | { type: "TOGGLE_MINI" } | { type: "PLAY" } | { type: "PAUSE" };

const playbackStates = {
  play: { on: { PAUSE: "pause" } },
  pause: { on: { PLAY: "play" } },
};

export const playerMachine = setup({
  types: {
    context: {} as {},
    events: {} as PlayerEvent,
  },
}).createMachine({
  id: "player",
  initial: "mini",
  states: {
    mini: {
      initial: "pause",
      states: playbackStates,
      on: {
        TOGGLE_FULL: "full",
      },
    },
    full: {
      initial: "pause",
      states: playbackStates,
      on: {
        TOGGLE_MINI: "mini",
      },
    },
  },
});
