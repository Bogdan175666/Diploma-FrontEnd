"use client"

import classes from './styles.module.css'
import {Button, FormInput} from "@/shared/ui";

export function LoginForm ({handleSubmit}) {
    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <section className={classes.formWrapper}>
                <FormInput
                    placeholder="Enter your username"
                    id="username"
                    inputType="text"
                    labelText="Username"/>
                <FormInput
                    placeholder="Enter your password"
                    id="password"
                    inputType="password"
                    labelText="Password"
                />
                <Button>Login me!</Button>
            </section>
        </form>
    )
}
