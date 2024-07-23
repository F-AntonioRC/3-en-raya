import { WINNER_COMBOS } from "../../constants"

export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null
  }


  //REVISAR SI HAY EMPATE, ESPACIOS VACIOS EN EL TABLERO
  export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null )
  }