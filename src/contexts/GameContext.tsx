import React, {
  FunctionComponent,
  createContext,
  useContext,
  useReducer,
} from "react";

interface Props {
  type: string;
  startGame: boolean;
  gameOver: boolean;
  playerPosition: number;
}
const initState: any = {
  type: "",
  startGame: false,
  gameOver: false,
  playerPosition: 0,
};
const GameCtx = createContext(initState);

const GameProvider: FunctionComponent = ({ children }) => {
  const reducer = (state: any, action: Props) => {
    switch (action.type) {
      case "reset":
        // console.log("--- game reset ---");
        return initState;
      case "start-game":
        // console.log("--- start game ---");
        return { ...state, startGame: true, gameOver: false };
      case "game-over":
        // console.log("--- game over ---");
        return { ...state, startGame: false, gameOver: true, gameReset: true };
      case "player-position":
      default:
        if (state.playerPosition !== action.playerPosition)
          return { ...state, playerPosition: action.playerPosition };
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initState);
  const value = { state, dispatch };

  return <GameCtx.Provider value={value}>{children}</GameCtx.Provider>;
};

export default GameProvider;
export const useGameContext = () => useContext(GameCtx);
