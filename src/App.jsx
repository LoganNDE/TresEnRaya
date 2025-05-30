import { useState } from 'react';
import { TURNS } from './constants'
import { Square } from './components/Square';
import { checkWinner, chekEndGame } from './logic/board';
import JSConfetti from 'js-confetti'
import './App.css'
import { WinnerModal } from './components/WinnerModal';

function App() {

  const myLocalStorage = window.localStorage;
  const jsConfetti = new JSConfetti()

  const [turn, setTurn] = useState(() => myLocalStorage.getItem('turn') ? myLocalStorage.getItem('turn') : TURNS.X);
  const [board, setBoard] = useState(() => myLocalStorage.getItem('board') ? JSON.parse(myLocalStorage.getItem('board')) : Array(9).fill(null));
  const [winner, setWinner] = useState(null)

  const resetGame = () =>{
    setTurn(TURNS.X)
    setBoard(Array(9).fill(null))
    setWinner(null)
    myLocalStorage.removeItem('board');
    myLocalStorage.removeItem('turn');
  }

  const updateBoard = (index) =>{
      
      // Comprobar si la casilla esta marcada o si existe un ganador
      if (board[index] || winner) return
      
      //Actualizar el tablero
      const newBoard = [... board];
      newBoard[index] = turn;
      myLocalStorage.setItem('board', JSON.stringify(newBoard));
      setBoard(newBoard)

      //Cambiar el turno
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
      myLocalStorage.setItem('turn', newTurn);
      setTurn(newTurn)

      const newWinner = checkWinner(newBoard);

      if (newWinner){
        setWinner(newWinner)
        jsConfetti.addConfetti()
      }else if(chekEndGame(newBoard)){
        setWinner(false)
      }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className='game'>
      {
        board.map((celss, index) =>{
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          )
        })
      }
      </section>
      <section className='turn'>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
