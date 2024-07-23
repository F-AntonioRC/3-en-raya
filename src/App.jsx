import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './assets/components/Square'
import { TURNS } from './constants'
import { checkWinnerFrom, checkEndGame } from './assets/logic/board'
import { WinnerModal } from './assets/components/WinnerModal'
import { saveGameToStorage, resetGameStorage } from './assets/logic/storage'

function App() {

  const [board, setBoard] = useState(() => {
    //PARTIDA WARDADA
  const boardFromStorage = window.localStorage.getItem('board')
  if (boardFromStorage) return JSON.parse(boardFromStorage)
  return Array(9).fill(null)
  })


  const [turn, setTurns] = useState(() => {
  const turnFromStorage = window.localStorage.getItem('turn')
  return turnFromStorage ?? TURNS.X }) 

  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurns(TURNS.X)
    setWinner(null)

    resetGameStorage()

  }

  const updateBoard = (index) => {
    //NO ACTUALIZAR LA POSICION
    if(board[index]) return

    //ACTUALIZAR EL TABLERO
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //CAMBIAR EL TURNO
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurns(newTurn)

    //GUARDAR LA PARTIDA
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    //REVISAR SI HAY UN GANADOR
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false) //EMPATE
    }
  }

  return (
    <main className='board'>
    <h1>Gato :3</h1>

    <button onClick={resetGame}>Reiniciar Juego</button>

    <section className='game'>
    {
      board.map((square, index) => {
        return(
          <Square
            key = {index}
            index = {index}
            updateBoard={updateBoard}
          >
            {square}
          </Square>
        )
      })
    }
    </section>

    <section className="turn">
      <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>

      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>

    <WinnerModal winner={winner} resetGame={resetGame} />

    </main>

  )
}

export default App
