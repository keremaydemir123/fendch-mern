function Button({tail, disabled = false, ...props}) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`h-full px-2 py-1  text-white rounded-md border-none outline-none cursor-pointer transition-all shadow-md ${tail} ${
                disabled ? "bg-slate-400" : "bg-blue-300 hover:scale-105"
            } `}
        >
            {props.children}
        </button>
    );
}

export default Button;
