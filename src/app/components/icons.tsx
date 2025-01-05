import { JSX, SVGProps } from "react";

export function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            { ...props }>
            <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth={ 2 }
                strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>
    )
}