'use client'

import { useState } from "react"

function calculateWinner(squares : (string | null)[]){
    const lines = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return {winner: squares[a], line: [a, b, c]}
        }
    }
    return null;
}

function Square({value, isWinningSquare, onSquareClick}: {value: string | null, isWinningSquare: boolean,  onSquareClick: () => void}){
    return(
        <button className={`square ${isWinningSquare ? 'winning' : ''}`} onClick={onSquareClick}>{value}</button>
    )
}

function Board({xIsNext, squares, onPlay}:{xIsNext: boolean, squares: (string | null)[], onPlay: (nextSquares: (string | null)[], location: {row: number, col: number}) => void}){
    const winner = calculateWinner(squares);
    let winningLine: number[] | undefined;
    let status;

    if(winner){
        status = winner.winner +' is the winner!';
        winningLine = winner.line;
    }else if(!squares.includes(null)){
        status ='Draw!';
    } else{
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    function renderSquare(squareIndex: number, location: {row: number, col: number}){
        const isWinningSquare = winningLine?.includes(squareIndex) ?? false;
        return(
            <Square key={squareIndex} value={squares[squareIndex]} isWinningSquare={isWinningSquare} onSquareClick={() => handleClick(squareIndex, location )}/> 
        )
    }

    function handleClick(i : number, location: {row: number, col: number}){
        if(squares[i] || calculateWinner(squares)){
            return
        }

        const nextSquares = squares.slice();

        if(xIsNext){
            nextSquares[i] = "X";
        }else{
            nextSquares[i] = "O";
        }

        onPlay(nextSquares, location);

    }

    return(
        <>
            <div className="status">
                {status}
            </div>

            {[0,1,2].map((rowIndex) => {
                return <div className="board-row" key={rowIndex} >
                    {[0,1,2].map((colIndex)=>{
                        const squareIndex = rowIndex * 3 + colIndex
                        return renderSquare(squareIndex, {row: rowIndex, col: colIndex})
                    })}
                </div>
            })}
        </>
    )
}

export default function Game(){
    const [history, setHistory] = useState({squares: [Array(9).fill(null)], location: [{row: 0, col: 0}]});
    const [currentMove, setCurrentMove] = useState(0);
    const [isAscending, setIsAscending] = useState(true);

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history.squares[currentMove]

    function handlePlay(nextSquares : (string | null)[], location: {row: number, col: number}){
        const historySquares = [...history.squares.slice(0, currentMove + 1), nextSquares]
        const historyLocation = [...history.location.slice(0, currentMove + 1), location];
        const nextHistory = {squares: historySquares, location: historyLocation}
        
        setHistory(nextHistory)
        setCurrentMove(nextHistory.squares.length - 1);
    }

    function jumpTo(nextMove : number){
        setCurrentMove(nextMove);
    }

    const moves = history.squares.map((squares, move) =>{
        const loc = history.location[move];
        let description;
        if(move > 0){
            description = `Go to move #${move} (${loc.row}, ${loc.col})`
        }
        else{
            description = 'Go to Game start';
        }
        if(move === currentMove){
            return(
                <li key={move}>
                    <span>{move === 0 ? 'Game start' :  `you are at move # ${currentMove}`}</span>
                </li>
            )
        }
        return(
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    const sortedMoves = isAscending ? moves : [...moves].reverse();

    function handleSort(){
        setIsAscending(!isAscending);
    }

    return(
        <>
            <div className="game">
                <div className="game-board">
                    <Board xIsNext={xIsNext} squares = {currentSquares} onPlay = {handlePlay} />
                </div>
                <div className="game-info">
                    <ol className="moves-list">{sortedMoves}</ol>
                    <button style={{ marginLeft: '40px' }} onClick={handleSort}>
                        {isAscending ? 'Sort Descending' : 'Sort Ascending'}
                    </button>
                </div>
            </div>
        </>
    )
}