"use client"

import {TextField} from "@mui/material";
import {useState} from "react";
import {useRouter} from "next/navigation";
import "./create-client.css"

export default function CreateAClient() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [card, setCard] = useState({
        cardHolderName: '',
        cvv: '',
        date: ''
    })
    const router = useRouter();

    const handleSubmit = async () => {
        const url = "http://localhost:4200/api/clients/createClient"
        const body = {
            name: name,
        };

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
            router.push(`/developers`);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="create-developer-wrapper">
            <div style={{marginBottom: "30px"}}>
                <p className="create-client-label">Enter full name</p>
                <TextField
                    sx={{
                        width: "300px"
                    }}
                    label="Full name"
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
            </div>

            <div style={{marginBottom: "30px"}}>
                <p className="create-client-label">Enter your password</p>
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

            <div style={{marginBottom: "80px"}}>
                <p className="create-client-label">Enter your email</p>
                <TextField
                    required
                    sx={{
                        width: "300px"
                    }}
                    type="email"
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div style={{
                display: "flex",
                gap: "80px"
            }}>
                <div style={{marginBottom: "30px"}}>
                    <p className="create-client-label">Enter CARD HOLDER NAME</p>
                    <TextField
                        required
                        sx={{
                            width: "300px"
                        }}
                        label="NAME SURNAME"
                        variant="standard"
                        value={card.cardHolderName}
                        onChange={(e) => setCard((prevState) => {
                            return {
                                ...prevState,
                                cardHolderName: e.target.value
                            }
                        })}/>
                </div>

                <div style={{marginBottom: "30px"}}>
                    <p className="create-client-label">Enter CVV</p>
                    <TextField
                        required
                        sx={{
                            width: "300px"
                        }}
                        label="CVV"
                        variant="standard"
                        value={card.cvv}
                        onChange={(e) => setCard((prevState) => {
                            return {
                                ...prevState,
                                cvv: e.target.value
                            }
                        })}/>
                </div>
            </div>




            <div style={{marginBottom: "30px"}}>
                <p className="create-client-label">Enter date</p>
                <TextField
                    required
                    sx={{
                        width: "300px"
                    }}
                    label="date"
                    variant="standard"
                    value={card.date}
                    onChange={(e) => setCard((prevState) => {
                        return {
                            ...prevState,
                            date: e.target.value
                        }
                    })}/>
            </div>

            <div style={{
                marginTop: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <button onClick={handleSubmit} className="create-client-btn">I want to be a client!</button>
            </div>

        </div>
    )
}
