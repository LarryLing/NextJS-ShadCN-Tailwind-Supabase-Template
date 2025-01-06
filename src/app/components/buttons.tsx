import assert from "assert";

interface ButtonProps {
    children: React.ReactNode,
    size?: string,
    type: "primary" | "secondary" | "tertiary" | "success" | "danger" | "call-to-action",
    handleClick?: () => void,
}

const types = new Map<string, string>([
    ["primary", "border-2 border-primary hover:border-primary-lighter active:border-primary-lightest bg-primary hover:bg-primary-lighter active:bg-primary-lightest text-white rounded-md"],
    ["secondary", "border-2 border-primary hover:border-primary-lighter active:border-primary-lightest text-primary hover:text-primary-lighter active:text-primary-lightest rounded-md"],
    ["tertiary", "text-primary hover:text-primary-lighter active:text-primary-lightest rounded-md w-auto h-auto"],
    ["success", "border-2 border-success hover:border-success-lighter active:border-success-lightest bg-success hover:bg-success-lighter active:bg-success-lightest text-white rounded-md"],
    ["danger", "border-2 border-danger hover:border-danger-lighter hover:border-danger-lightest bg-danger hover:bg-danger-lighter active:bg-danger-lightest text-white rounded-md"],
    ["call-to-action", "border-2 border-secondary hover:border-secondary-lighter active:border-secondary-lightest bg-secondary hover:bg-secondary-lighter active:bg-secondary-lightest text-black rounded-full"],
]);

export function Button({ children, size, type, handleClick, }: ButtonProps) {
    const buttonType = types.get(type)
    assert(buttonType)

    return (
        <button onClick={ handleClick } className={`${ size } ${ buttonType } px-4 py-2 text-nowrap font-bold transition-all duration-300`}>
            {children}
        </button>
    )
}