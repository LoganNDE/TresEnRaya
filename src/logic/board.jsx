import { WINNER_COMBOS } from "../constants"

export function checkWinner (boardToCheck){
      for (const combos of WINNER_COMBOS){
        const [a, b, c] = combos

        if (boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) 
        {
          return boardToCheck[a]
        } 
      }
      return null
  }

export function chekEndGame(board){
    return board.every((cell) => cell != null)
}