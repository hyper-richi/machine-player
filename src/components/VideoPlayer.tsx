//import { Modal } from "antd";
import ReactPlayer from "react-player";
import { useMachine } from "@xstate/react";
import { playerMachine } from "../machines/playerMachine";

export function VideoPlayer() {
  const [state, send] = useMachine(playerMachine);

  const isFull = state.matches("full");
  const isMini = state.matches("mini");
  const isPlaying = state.matches({ mini: "playing" }) || state.matches({ full: "playing" });

  return (
    <ReactPlayer
      playing={isPlaying}
      width="100%"
      height="100%"
      src="https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8"
      onPlay={() => send({ type: "PLAY" })}
      onPause={() => send({ type: "PAUSE" })}
      controls
    />
  );
}
