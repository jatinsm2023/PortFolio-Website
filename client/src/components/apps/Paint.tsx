import Window from '../os/Window';
import { useRef, useState, useEffect } from 'react';
import { Download, Trash2, Palette } from 'lucide-react';

export default function Paint() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(3);
    const [tool, setTool] = useState<'pen' | 'eraser'>('pen');

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Fill with white background
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!context || !canvas) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        context.beginPath();
        context.moveTo(x, y);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!context || !canvas) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        context.strokeStyle = tool === 'eraser' ? 'white' : color;
        context.lineWidth = lineWidth;
        context.lineCap = 'round';
        context.lineJoin = 'round';

        context.lineTo(x, y);
        context.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!context || !canvas) return;

        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = 'my-drawing.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    const COLORS = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500'];

    return (
        <Window
            id="paint"
            title="Paint"
            width={800}
            height={600}
        >
            <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900">
                {/* Toolbar */}
                <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    {/* Tools */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setTool('pen')}
                            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${tool === 'pen'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                                }`}
                        >
                            ✏️ Pen
                        </button>
                        <button
                            onClick={() => setTool('eraser')}
                            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${tool === 'eraser'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                                }`}
                        >
                            🧹 Eraser
                        </button>
                    </div>

                    {/* Color Picker */}
                    <div className="flex items-center gap-2">
                        <Palette size={18} className="text-gray-600 dark:text-gray-400" />
                        <div className="flex gap-1">
                            {COLORS.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setColor(c)}
                                    className={`w-7 h-7 rounded border-2 transition-transform ${color === c ? 'border-gray-900 scale-110' : 'border-gray-300'
                                        }`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-7 h-7 rounded border-2 border-gray-300 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Line Width */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Size:</span>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={lineWidth}
                            onChange={(e) => setLineWidth(Number(e.target.value))}
                            className="w-24"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-6">{lineWidth}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 ml-auto">
                        <button
                            onClick={clearCanvas}
                            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            <Trash2 size={16} />
                            Clear
                        </button>
                        <button
                            onClick={downloadImage}
                            className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            <Download size={16} />
                            Save
                        </button>
                    </div>
                </div>

                {/* Canvas */}
                <div className="flex-1 p-4">
                    <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        className="w-full h-full bg-white rounded-lg shadow-lg cursor-crosshair"
                    />
                </div>
            </div>
        </Window>
    );
}
