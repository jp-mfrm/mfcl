import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";

import Button from "../Button";
import GameOver from "../Icons/GameOver";
import Obstacle from "./Obstacle";
import SleepExpert from "../Icons/SleepExpert";
import SleepExpertDrop from "../Icons/SleepExpertDrop";
import SleepExpertJump from "../Icons/SleepExpertJump";
import TRex from "../Icons/TRex";
import clsx from "clsx";
import styles from "./arcade.module.scss";
import { useGameContext } from "../contexts/GameContext";

interface Props {
  mode: "classic" | "sleep-expert";
  jumpKey: string;
  [rest: string]: unknown; // ...rest property
}

const PlayerRunGame: FunctionComponent<Props> = ({
  mode = "classic",
  jumpKey = "5",
}) => {
  const { state, dispatch } = useGameContext();
  const { gameOver, playerPosition } = state;

  const [gravity] = useState(0.9);
  const [jump, setJump] = useState(false);
  const [drop, setDrop] = useState(false);
  const [startGame, setStartGame] = useState(false);

  // TODO: Move to component <Character />
  const characterMode = () => {
    switch (mode) {
      case "sleep-expert":
        if (drop) return <SleepExpertDrop width="60px" height="60px" />;
        if (jump) return <SleepExpertJump width="60px" height="60px" />;
        return <SleepExpert width="60px" height="60px" />;
      case "classic":
      default:
        return <TRex width="60px" height="60px" />;
    }
  };

  const keydownHandler = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;

      // TODO: Not working with dispatch game over <?>
      if (gameOver) {
        console.log(key);
        if (key === "13" || key === "Enter") {
          retryClickHandler();
          return;
        }
      }

      if (!gameOver && !jump && key === jumpKey) {
        // console.log("set jump true");
        setJump(true);
        setStartGame(true);
        // TODO: Not working with dispatch
        // dispatch({ type: "start-game" });
      }
    },
    [state, gameOver, jump]
  );

  const retryClickHandler = () => {
    // TODO: Reset game stage
    // TODO: Not working with dispatch reset <?>
    dispatch({ type: "reset" });
    dispatch({ type: "start-game" });

    setStartGame(true);
    setJump(false);
    setDrop(false);
  };

  useEffect(() => {
    if (drop) {
      // console.log("down");
      let downTimerId!: NodeJS.Timeout;
      clearInterval(downTimerId);

      let count = 15;
      let position = playerPosition;
      const duration = 20;
      downTimerId = setInterval(() => {
        if (gameOver) return clearInterval(downTimerId);

        if (count === 0) {
          position += gravity;
          setJump(false);
          setDrop(false);
          return clearInterval(downTimerId);
        }
        count--;
        position -= 5;
        position *= gravity;
        dispatch({ type: "player-position", playerPosition: position });
      }, duration);

      return () => clearInterval(downTimerId);
    }
  }, [drop, gameOver]);

  useEffect(() => {
    if (jump) {
      let timerId!: NodeJS.Timeout;
      clearInterval(timerId);

      // console.log("jump!");
      let position = 0;
      let count = 0;
      const duration = 20;
      timerId = setInterval(() => {
        if (gameOver) return clearInterval(timerId);

        // move down
        if (count === 15) {
          setDrop(true);
          return clearInterval(timerId);
        }

        // move up
        // console.log("up");
        count++;
        position += 30;
        position *= gravity;
        dispatch({ type: "player-position", playerPosition: position });
      }, duration);

      return () => clearInterval(timerId);
    }
  }, [jump, gameOver]);

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [state, gameOver, jump]);

  return (
    <div
      className={clsx(
        styles.stage,
        !startGame && styles["not-started"],
        gameOver && styles["game-over"]
      )}
    >
      {gameOver && (
        <>
          <div className={styles.gameOverBanner}>
            <div className={styles.banner}>
              <GameOver width="400px" height="60px" fillColor="#000000" />
            </div>
            <div className={styles["restart-game"]}>
              <Button btnType="primary" onClick={retryClickHandler}>
                Play Again
              </Button>
            </div>
          </div>
        </>
      )}
      <div
        className={clsx(styles.player, styles[""])}
        style={{
          bottom: `${playerPosition}px`,
        }}
      >
        {characterMode()}
      </div>
      {startGame && <Obstacle mode={mode} />}
    </div>
  );
};

export default PlayerRunGame;
