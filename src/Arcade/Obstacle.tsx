import React, { FunctionComponent, useEffect, useState } from "react";

import AdjustableBase from "../Icons/AdjustableBase";
import Cacti from "../Icons/Cacti";
import clsx from "clsx";
import styles from "./obstacle.module.scss";
import { useGameContext } from "../contexts/GameContext";

interface Props {
  mode?: "classic" | "sleep-expert";
}

const Obstacle: FunctionComponent<Props> = ({ mode = "classic" }) => {
  const [gameReset, setGameReset] = useState(false);
  const [obstaclePosition, setObstaclePosition] = useState(1000);
  const [dynamicObstacles, setDynamicObstacles] = useState(<></>);
  const { state, dispatch } = useGameContext();
  const { gameOver, playerPosition } = state;
  // TODO: Move to component <ObstacleType /> <?>
  const obstacleMode = () => {
    switch (mode) {
      case "sleep-expert":
        // TODO: SVG width and collision not matching
        return (
          <AdjustableBase
            {...obstacleProps}
            className={clsx(obstacleProps.className, styles.bed)}
            fillColor="#4E4E4E"
            width="80px"
            height="50px"
            viewBox="0 0 80.000000 50.000000"
            preserveAspectRatio="xMaxYMin meet"
          />
        );
      case "classic":
      default:
        return <Cacti {...obstacleProps} />;
    }
  };

  useEffect(() => {
    if (!gameOver && !gameReset) {
      // let randomTimer!: NodeJS.Timeout;
      // clearInterval(randomTimer);

      const randomTime = Math.random() * 3000;
      const randomTimer: NodeJS.Timeout = setTimeout(() => {
        if (gameOver) {
          return () => clearInterval(randomTimer);
        }

        setDynamicObstacles(<Obstacle mode={mode} />);
      }, randomTime);
      return () => clearInterval(randomTimer);
    }
  }, [gameOver, playerPosition, gameReset]);

  useEffect(() => {
    let obstacleTimer!: NodeJS.Timeout;
    clearInterval(obstacleTimer);

    if (!gameOver && !gameReset) {
      // generate obstacles
      let position = obstaclePosition;
      obstacleTimer = setInterval(() => {
        // console.log("generate obstacle");
        if (gameOver || position < -30) {
          return () => clearInterval(obstacleTimer);
        }
        position -= 10;
        setObstaclePosition(position);
      }, 20);
    }
    return () => clearInterval(obstacleTimer);
  }, [gameOver, gameReset]);

  useEffect(() => {
    if (!gameOver && gameReset) {
      console.log("-- game reset detected --");
      setObstaclePosition(1000);
      setDynamicObstacles(<></>);
      setGameReset(false);
    } else if (
      !gameOver &&
      obstaclePosition > 0 &&
      obstaclePosition < 60 &&
      playerPosition < 60
    ) {
      console.log("game over detected:", gameOver);
      dispatch({ type: "game-over" });
      setGameReset(true);
    }
  }, [obstaclePosition, playerPosition, gameOver, gameReset]);

  const obstacleInlineStyles = {
    left: `${obstaclePosition}px`,
  };

  const obstacleProps = {
    className: clsx(styles.obstacle),
    style: { ...obstacleInlineStyles },
  };

  return (
    <>
      {obstaclePosition > -30 && obstacleMode()}
      {dynamicObstacles}
    </>
  );
};

export default Obstacle;
