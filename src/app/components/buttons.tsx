import Link from "next/link";

interface ButtonProps {
    children: React.ReactNode,
    width: number | string;
    handleClick?: () => void;
}

export function Primary({ children, width, handleClick, }: ButtonProps) {
    return (
        <button onClick={ handleClick } className={`w-20 border-2 border-indigo-700 hover:border-indigo-600 bg-indigo-700 hover:bg-indigo-600 text-white font-bold rounded-md py-2 transition-all duration-200`}>
            {children}
        </button>
    )
}

export function Secondary({ children, width, handleClick, }: ButtonProps) {
    return (
        <button onClick={ handleClick } className={`w-20 border-2 border-indigo-700 hover:border-indigo-600 text-indigo-700 hover:text-indigo-600 font-bold rounded-md py-2 transition-all duration-200`}>
            {children}
        </button>
    )
}