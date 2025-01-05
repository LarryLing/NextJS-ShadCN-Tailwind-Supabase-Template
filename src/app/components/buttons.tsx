import assert from "assert";

interface ButtonProps {
    children: React.ReactNode,
    size: "sm" | "md" | "lg",
    type: "primary" | "secondary" | "tertiary" | "success" | "danger" | "call-to-action",
    handleClick?: () => void,
}

const sizes = new Map<string, string>([
    ["sm", "w-20 h-10"],
    ["md", "w-28 h-14"],
    ["lg", "w-40 h-20"],
]);

const types = new Map<string, string>([
    ["primary", "border-2 border-primary hover:border-primary-lighter bg-primary hover:bg-primary-lighter text-white rounded-md"],
    ["secondary", "border-2 border-primary hover:border-primary-lighter text-primary hover:text-primary-lighter rounded-md"],
    ["tertiary", "text-primary hover:text-primary-lighter rounded-md w-auto h-auto"],
    ["success", "border-2 border-success hover:border-success-lighter bg-success hover:bg-success-lighter text-white rounded-md"],
    ["danger", "border-2 border-danger hover:border-danger-lighter bg-danger hover:bg-danger-lighter text-white rounded-md"],
    ["call-to-action", "border-2 border-secondary hover:border-secondary-lighter bg-secondary hover:bg-secondary-lighter text-black rounded-full"],
]);

export function Button({ children, size, type, handleClick, }: ButtonProps) {
    const dimensions = sizes.get(size)
    const buttonType = types.get(type)

    assert(dimensions)
    assert(buttonType)

    return (
        <button onClick={ handleClick } className={`${ dimensions } ${ buttonType } font-bold transition-all duration-200`}>
            {children}
        </button>
    )
}