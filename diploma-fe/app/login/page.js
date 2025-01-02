"use client"
import {LoginForm} from "@/components/client-side-components";
import {isEmpty} from "@/util/validators";
export default function Login () {
    const handleSubmit = (event) => {
        event.preventDefault();

        const fd = new FormData(event.target);
        const loginData = Object.fromEntries(fd.entries())


        if (isEmpty(loginData.username)) {
            return;
        } else if (isEmpty(loginData.password)) {
            return;
        }

        //Make a request to the BE
    }

    return (
        <main>
            <h1>Login</h1>
            <LoginForm handleSubmit={(event) => handleSubmit(event)}/>
        </main>
    )
}
