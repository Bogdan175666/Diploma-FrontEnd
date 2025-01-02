"use client"
//TODO:
//1.Correct styles
//2. Connect with BE
//3.
import classes from './styles.module.css'
import {Button, FormInput} from "@/shared/ui";

export function LoginForm ({handleSubmit}) {
    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <section className={classes.formWrapper}>
                <FormInput
                    placeholder="Enter your username"
                    id="username"
                    inputType="text"/>
                <FormInput
                    placeholder="Enter your password"
                    id="password"
                    inputType="password"
                />
                <Button>Login me!</Button>
            </section>
        </form>
    )
}
