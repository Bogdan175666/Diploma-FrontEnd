"use client"
import classes from './Button.module.css'
export function Button ({children, click}) {
    return (
        <button className={classes.button} onClick={click}>{children}</button>
    )
}
