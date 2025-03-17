import {FormInput} from "@/shared/ui";

export default function Signup() {
    return (
        <section>
            <form>
                <FormInput
                    placeholder="Enter your name"
                    inputType="text"
                    id="name"
                    labelText="Name"/>
                <FormInput
                    placeholder="Enter your surname"
                    inputType="text"
                    id="surname"
                    labelText="Surname"/>
                <FormInput
                    placeholder="Think about your login"
                    inputType="text"
                    id="login"
                    labelText="Login"/>
                <FormInput
                    placeholder="Enter your password"
                    inputType="password"
                    id="password"
                    labelText="Password"/>
                <FormInput
                    placeholder="Repeat your password"
                    inputType="password"
                    id="reppassword"
                    labelText="Repeat password"/>
                Future card component
            </form>
        </section>
    )
}
