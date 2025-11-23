import Window from '../os/Window';
import { useState, useRef, useEffect } from 'react';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const calculateWinner = (squares: any[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (const [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (index: number) => {
        if (board[index] || calculateWinner(board)) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    const winner = calculateWinner(board);
    const isDraw = !winner && board.every(cell => cell !== null);

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-500 to-purple-600 p-6">
            <h2 className="text-3xl font-bold text-white mb-4">Tic-Tac-Toe</h2>
            <div className="bg-white rounded-xl p-6 shadow-2xl">
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {board.map((cell, i) => (
                        <button
                            key={i}
                            onClick={() => handleClick(i)}
                            className="w-20 h-20 bg-gray-100 hover:bg-gray-200 rounded-lg text-4xl font-bold flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                        >
                            {cell}
                        </button>
                    ))}
                </div>
                <div className="text-center mb-3">
                    {winner ? (
                        <p className="text-xl font-bold text-green-600">Winner: {winner}! 🎉</p>
                    ) : isDraw ? (
                        <p className="text-xl font-bold text-orange-600">It's a Draw! 🤝</p>
                    ) : (
                        <p className="text-lg">Next: <span className="font-bold">{isXNext ? 'X' : 'O'}</span></p>
                    )}
                </div>
                <button
                    onClick={resetGame}
                    className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                >
                    New Game
                </button>
            </div>
        </div>
    );
};

const Snake = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const gameLoopRef = useRef<number>();

    const snake = useRef([[10, 10]]);
    const direction = useRef([0, 1]);
    const food = useRef([15, 15]);

    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const gridSize = 20;
        const tileCount = 20;

        const gameLoop = () => {
            // Move snake
            const head = snake.current[0];
            const newHead = [
                head[0] + direction.current[0],
                head[1] + direction.current[1]
            ];

            // Check collision with walls
            if (
                newHead[0] < 0 || newHead[0] >= tileCount ||
                newHead[1] < 0 || newHead[1] >= tileCount
            ) {
                setGameOver(true);
                return;
            }

            // Check collision with self
            if (snake.current.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
                setGameOver(true);
                return;
            }

            snake.current.unshift(newHead);

            // Check if ate food
            if (newHead[0] === food.current[0] && newHead[1] === food.current[1]) {
                setScore(s => s + 10);
                food.current = [
                    Math.floor(Math.random() * tileCount),
                    Math.floor(Math.random() * tileCount)
                ];
            } else {
                snake.current.pop();
            }

            // Draw
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw snake
            ctx.fillStyle = '#0f0';
            snake.current.forEach(segment => {
                ctx.fillRect(segment[1] * gridSize, segment[0] * gridSize, gridSize - 2, gridSize - 2);
            });

            // Draw food
            ctx.fillStyle = '#f00';
            ctx.fillRect(food.current[1] * gridSize, food.current[0] * gridSize, gridSize - 2, gridSize - 2);

            gameLoopRef.current = requestAnimationFrame(gameLoop);
        };

        const interval = setInterval(() => {
            gameLoop();
        }, 150);

        return () => {
            clearInterval(interval);
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        };
    }, [gameStarted, gameOver]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!gameStarted || gameOver) return;

            switch (e.key) {
                case 'ArrowUp':
                    if (direction.current[0] !== 1) direction.current = [-1, 0];
                    break;
                case 'ArrowDown':
                    if (direction.current[0] !== -1) direction.current = [1, 0];
                    break;
                case 'ArrowLeft':
                    if (direction.current[1] !== 1) direction.current = [0, -1];
                    break;
                case 'ArrowRight':
                    if (direction.current[1] !== -1) direction.current = [0, 1];
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameStarted, gameOver]);

    const startGame = () => {
        snake.current = [[10, 10]];
        direction.current = [0, 1];
        food.current = [15, 15];
        setScore(0);
        setGameOver(false);
        setGameStarted(true);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-green-500 to-teal-600 p-6">
            <h2 className="text-3xl font-bold text-white mb-4">Snake Game</h2>
            <div className="bg-white rounded-xl p-6 shadow-2xl">
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={400}
                    className="bg-gray-900 rounded-lg mb-4"
                />
                <div className="mb-3 flex justify-between items-center">
                    <p className="text-lg">Score: <span className="font-bold">{score}</span></p>
                    {gameOver && <span className="text-red-600 font-bold">Game Over!</span>}
                </div>
                <button
                    onClick={startGame}
                    className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                >
                    {gameStarted && !gameOver ? 'Restart Game' : 'Start Game'}
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">Use arrow keys to move</p>
            </div>
        </div>
    );
};

export default function Games() {
    const [activeGame, setActiveGame] = useState<'menu' | 'tictactoe' | 'snake'>('menu');

    return (
        <Window
            id="games"
            title="Games"
            width={700}
            height={600}
        >
            {activeGame === 'menu' ? (
                <div className="h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
                    <h1 className="text-4xl font-bold text-white mb-8 text-center">🎮 Game Center</h1>
                    <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <button
                            onClick={() => setActiveGame('tictactoe')}
                            className="aspect-square bg-white/20 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/30 transition-all hover:scale-105 flex flex-col items-center justify-center gap-4 border border-white/20"
                        >
                            <div className="text-6xl">❌⭕</div>
                            <h3 className="text-2xl font-bold text-white">Tic-Tac-Toe</h3>
                            <p className="text-white/80 text-sm">Classic strategy game</p>
                        </button>

                        <button
                            onClick={() => setActiveGame('snake')}
                            className="aspect-square bg-white/20 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/30 transition-all hover:scale-105 flex flex-col items-center justify-center gap-4 border border-white/20"
                        >
                            <div className="text-6xl">🐍</div>
                            <h3 className="text-2xl font-bold text-white">Snake</h3>
                            <p className="text-white/80 text-sm">Classic arcade game</p>
                        </button>
                    </div>
                </div>
            ) : activeGame === 'tictactoe' ? (
                <div className="h-full relative">
                    <TicTacToe />
                    <button
                        onClick={() => setActiveGame('menu')}
                        className="absolute top-4 left-4 px-4 py-2 bg-white/90 hover:bg-white rounded-lg font-medium transition-colors"
                    >
                        ← Back
                    </button>
                </div>
            ) : (
                <div className="h-full relative">
                    <Snake />
                    <button
                        onClick={() => setActiveGame('menu')}
                        className="absolute top-4 left-4 px-4 py-2 bg-white/90 hover:bg-white rounded-lg font-medium transition-colors"
                    >
                        ← Back
                    </button>
                </div>
            )}
        </Window>
    );
}
