import { useEffect, useRef } from "react"

export default function Popup({
    open,
    onClose,
    align = "right",
    children,
    className = "",
}) {
    const ref = useRef(null)

    useEffect(() => {
        if (!open) return

        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onClose?.()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open, onClose])

    if (!open) return null

    const alignClass = {
        right: "right-0",
        left: "left-0",
        center: "left-1/2 -translate-x-1/2",
    }[align]

    return (
        <div
            ref={ref}
            className={`absolute ${alignClass} mt-2 z-50 ${className}`}
        >
            {children}
        </div>
    )
}
