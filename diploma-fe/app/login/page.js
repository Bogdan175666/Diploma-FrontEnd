"use client"

import {TextField} from "@mui/material";
import {useState} from "react";
import {useRouter} from "next/navigation";
import "./login.css"

export default function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        const url = "http://localhost:4200/api/login";

        const body = {
            email,
            password
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error('Failed to create developer');
            }

            const result = await response.json();

            if (result?.whoIsUser === 'client') {
                localStorage.setItem('whoIs', result?.whoIsUser);
                localStorage.setItem('id', result.user['_id'])
                router.push(`/developers`);
            } else {
                localStorage.setItem('whoIs', result?.whoIsUser);
                localStorage.setItem('id', result.user['_id'])
                router.push(`/developers/${result.user['_id']}`)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="login-wrapper">
                <div style={{marginBottom: "30px"}}>
                    <p className="login-label">Enter email</p>
                    <TextField
                        sx={{
                            width: "300px"
                        }}
                        label="Your email"
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div style={{marginBottom: "30px"}}>
                    <p className="login-label">Enter your password</p>
                    <TextField
                        required
                        sx={{
                            width: "300px"
                        }}
                        type="password"
                        label="Password"
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div style={{
                marginTop: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <button onClick={handleSubmit} className="login-btn">Sign up!</button>
            </div>
        </div>
    )
}
