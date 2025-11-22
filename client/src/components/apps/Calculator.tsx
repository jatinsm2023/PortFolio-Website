import Window from '../os/Window';
import { useState } from 'react';

export default function Calculator() {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState<number | null>(null);
    const [operation, setOperation] = useState<string | null>(null);
    const [newNumber, setNewNumber] = useState(true);

    const handleNumber = (num: string) => {
        if (newNumber) {
            setDisplay(num);
            setNewNumber(false);
        } else {
            setDisplay(display === '0' ? num : display + num);
        }
    };

    const handleDecimal = () => {
        if (!display.includes('.')) {
            setDisplay(display + '.');
            setNewNumber(false);
        }
    };

    const handleOperation = (op: string) => {
        const current = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(current);
        } else if (operation) {
            const result = calculate(previousValue, current, operation);
            setDisplay(String(result));
            setPreviousValue(result);
        }

        setOperation(op);
        setNewNumber(true);
    };

    const calculate = (prev: number, current: number, op: string): number => {
        switch (op) {
            case '+': return prev + current;
            case '-': return prev - current;
            case '×': return prev * current;
            case '÷': return prev / current;
            case '%': return prev % current;
            default: return current;
        }
    };

    const handleEquals = () => {
        if (operation && previousValue !== null) {
            const current = parseFloat(display);
            const result = calculate(previousValue, current, operation);
            setDisplay(String(result));
            setPreviousValue(null);
            setOperation(null);
            setNewNumber(true);
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setNewNumber(true);
    };

    const handlePlusMinus = () => {
        setDisplay(String(parseFloat(display) * -1));
    };

    const Button = ({ value, onClick, className = '', span = false }: any) => (
        <button
            onClick={onClick}
            className={`
        ${span ? 'col-span-2' : ''}
        h-14 rounded-full font-medium text-lg
        transition-all active:scale-95
        ${className}
      `}
        >
            {value}
        </button>
    );

    return (
        <Window
            id="calculator"
            title="Calculator"
            width={320}
            height={480}
        >
            <div className="h-full bg-gradient-to-b from-gray-800 to-gray-900 p-4 flex flex-col">
                {/* Display */}
                <div className="flex-1 flex items-end justify-end mb-4">
                    <div className="text-white text-6xl font-light truncate">
                        {display}
                    </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-4 gap-2">
                    {/* Row 1 */}
                    <Button value="AC" onClick={handleClear} className="bg-gray-400 hover:bg-gray-300 text-black" />
                    <Button value="+/-" onClick={handlePlusMinus} className="bg-gray-400 hover:bg-gray-300 text-black" />
                    <Button value="%" onClick={() => handleOperation('%')} className="bg-gray-400 hover:bg-gray-300 text-black" />
                    <Button value="÷" onClick={() => handleOperation('÷')} className="bg-orange-500 hover:bg-orange-400 text-white" />

                    {/* Row 2 */}
                    <Button value="7" onClick={() => handleNumber('7')} className="bg-gray-600 hover:bg-gray-500 text-white" />
                    <Button value="8" onClick={() => handleNumber('8')} className="bg-gray-600 hover:bg-gray-500 text-white" />
                    <Button value="9" onClick={() => handleNumber('9')} className="bg-gray-600 hover:bg-gray-500 text-white" />
                    <Button value="×" onClick={() => handleOperation('×')} className="bg-orange-500 hover:bg-orange-400 text-white" />

                    {/* Row 3 */}
                    <Button value="4" onClick={() => handleNumber('4')} className="bg-gray-600 hover:bg-gray-500 text-white" />
                    <Button value="5" onClick={() => handleNumber('5')} className="bg-gray-600 hover:bg-gray-500 text-white" />
                    <Button value="6" onClick={() => handleNumber('6')} className="bg-gray-600 hover:bg-gray-500 text-white" />
                    <Button value="-" onClick={() => handleOperation('-')} className="bg-orange-500 hover:bg-orange-400 text-white" />

                    {/* Row 4 */}
                    <Button value="1" onClick={() => handleNumber('1')} className="bg-gray-600 hover:bg-gray-500 text-white" />
                    <Button value="2" onClick={() => handleNumber('2')} className="bg-gray-600 hover:bg-gray-500 text-white" />
                    <Button value="3" onClick={() => handleNumber('3')} className="bg-gray-600 hover:bg-gray-500 text-white" />
                    <Button value="+" onClick={() => handleOperation('+')} className="bg-orange-500 hover:bg-orange-400 text-white" />

                    {/* Row 5 */}
                    <Button value="0" onClick={() => handleNumber('0')} className="bg-gray-600 hover:bg-gray-500 text-white text-left pl-6" span />
                    <Button value="." onClick={handleDecimal} className="bg-gray-600 hover:bg-gray-500 text-white" />
                    <Button value="=" onClick={handleEquals} className="bg-orange-500 hover:bg-orange-400 text-white" />
                </div>
            </div>
        </Window>
    );
}
