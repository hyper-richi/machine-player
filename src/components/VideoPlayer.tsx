import { Modal } from "antd";
import ReactPlayer from "react-player";
import { useMachine } from "@xstate/react";
import { playerMachine } from "../machines/playerMachine";
import PlayIcon from "./PlayIcon";
import "./VideoPlayer.css";

export function VideoPlayer() {
  const [state, send] = useMachine(playerMachine);

  const isFull = state.matches("full");
  const isMini = state.matches("mini");
  const isPlaying = state.matches({ mini: "play" }) || state.matches({ full: "play" });

  function handleClose(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    send({ type: "TOGGLE_MINI" });
  }

  return (
    <>
      {isMini && (
        <div style={{ position: "relative", width: "500px", height: "300px" }}>
          <ReactPlayer
            playing={isPlaying}
            width="500px"
            height="300px"
            src="https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8"
            onPlay={() => send({ type: "PLAY" })}
            onPause={() => send({ type: "PAUSE" })}
            controls
          />
          {!isPlaying && (
            <button
              className="play-pause-button"
              onClick={() => {
                send({ type: "TOGGLE_FULL" });
              }}>
              <PlayIcon />
            </button>
          )}
        </div>
      )}
      {isFull && (
        <Modal centered open={isFull} onCancel={handleClose} footer={null} width={800}>
          <div style={{ paddingTop: "25px" }}>
            <ReactPlayer
              playing={isPlaying}
              width="100%"
              height="100%"
              src="https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8"
              onPlay={() => send({ type: "PLAY" })}
              onPause={() => send({ type: "PAUSE" })}
              controls
              onReady={() => {
                send({ type: "PLAY" });
              }}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
