import React, { FunctionComponent } from "react";

import GameProvider from "../contexts/GameContext";
import PlayerRunGame from "./PlayerRunGame";

interface Props {
  game?: "player-run";
  mode?: "classic" | "sleep-expert";
  jumpKey: string;
  [rest: string]: unknown; // ...rest property
}

const Arcade: FunctionComponent<Props> = ({
  game = "player-run",
  mode = "classic",
  jumpKey = "5",
}) => {
  const getGame = () => {
    switch (game) {
      case "player-run":
      default:
        return <PlayerRunGame mode={mode} jumpKey={jumpKey} />;
    }
  };

  const gameContent = getGame();

  return <GameProvider>{gameContent}</GameProvider>;
};

export default Arcade;
