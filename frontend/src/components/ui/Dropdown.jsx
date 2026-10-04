import { useState } from "react"
import Popup from "./Popup"

export default function Dropdown({
    trigger,
    children,
    align,
}) {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative inline-block">
            <div onClick={() => setOpen(!open)}>
                {trigger({ open })}
            </div>

            <Popup
                open={open}
                align={align}
                onClose={() => setOpen(false)}
            >
                {children({ close: () => setOpen(false) })}
            </Popup>
        </div>
    )
}
