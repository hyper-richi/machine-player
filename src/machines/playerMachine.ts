import { setup } from "xstate";

export const playerMachine = setup({
  types: {
    context: {} as {},
    events: {} as { type: "toggle" } | { type: "PLAY" } | { type: "PAUSE" },
  },
}).createMachine({
  context: {},
  id: "player",
  initial: "mini",
  states: {
    mini: {
      initial: "paused",
      on: {
        toggle: {
          target: "full",
        },
      },
      description: "collapsed player",
      states: {
        paused: {
          on: {
            PLAY: {
              target: "playing",
            },
          },
        },
        playing: {
          on: {
            PAUSE: { target: "paused" },
          },
        },
      },
    },
    full: {
      initial: "paused",
      on: {
        toggle: {
          target: "mini",
        },
      },
      description: "full-screen player",
      states: {
        paused: {
          on: {
            toggle: {
              target: "playing",
            },
          },
        },
        playing: {
          on: {
            toggle: {
              target: "paused",
            },
          },
        },
      },
    },
  },
});
