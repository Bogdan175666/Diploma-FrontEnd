"use client"

import "./create-developer.css"
import {Chip, TextField} from "@mui/material";
import {useState} from "react";
import { useRouter } from "next/navigation";

export default function CreateDeveloper () {
    const [skills, setSkills] = useState([
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Express",
        "HTML5",
        "CSS3",
        "Sass",
        "Angular",
        "Vue.js",
        "Next.js",
        "MongoDB",
        "MySQL",
        "PostgreSQL",
        "Firebase",
        "Docker",
        "Kubernetes",
        "AWS",
        "Google Cloud",
        "Azure",
        "Jest",
        "Mocha",
        "Chai",
        "Cypress",
        "Redux",
        "Tailwind CSS",
        "Bootstrap",
        "Material-UI",
        "RESTful APIs",
        "WebSockets",
        "WebRTC",
        "Git",
        "GitHub",
        "GitLab",
        "CI/CD",
        "Agile",
        "Scrum",
        "TDD (Test-Driven Development)",
        "DevOps",
        "Serverless",
        "OAuth",
        "JWT",
        "Figma",
        "Photoshop",
        "SQL",
        "NoSQL",
        "PHP",
        "Ruby on Rails",
        "Python",
        "Java",
        "C#",
        "Swift",
        "Kotlin",
        "Flutter",
        "GraphQL",
        "Electron",
        "Nginx",
        "Apache",
        "Linux",
        "Windows",
        "MongoDB Atlas"])
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleClick = (skill) => {
        const index = selectedSkills?.indexOf(skill);

        if (index === -1) {
            setSelectedSkills(prevState => {
                return [...prevState, skill]
            })
        } else {
            const arr = [...selectedSkills];
            arr.splice(index, 1);
            setSelectedSkills(arr);
        }
    }

    const handleSubmit = async () => {
        const url = "http://localhost:4200/api/devs/createDev";
        const body = {
            name: name,
            skills: selectedSkills,
            email: email,
            password: password
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
            sessionStorage?.setItem('whoIs', 'developer');
            router.push(`/developers/${result.developer['_id']}`);
        } catch (error) {
            console.error('Error:', error);
        }

    }

    return (
        <div className="create-developer-wrapper">
            <div style={{marginBottom: "30px"}}>
                <p className="create-developer-label">Enter full name</p>
                <TextField
                    required
                    sx={{
                        width: "300px"
                    }}
                    label="Full name"
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
            </div>

            <div style={{marginBottom: "30px"}}>
                <p className="create-developer-label">Enter your password</p>
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

            <div style={{marginBottom: "30px"}}>
                <p className="create-developer-label">Enter your email</p>
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

            <div>
                <p className="create-developer-label">Chose your skills</p>
                {skills.map((skill) => {
                    return (
                        <Chip sx={{
                            margin: 1,
                            backgroundColor: selectedSkills.includes(skill) ? 'blue' : 'grey',
                            color: selectedSkills.includes(skill) ? 'white' : 'black',
                            borderRadius: '20px',
                            '&:hover': {
                                backgroundColor: selectedSkills.includes(skill) ? 'darkblue' : 'lightgrey',
                            },
                        }}
                              key={skill}
                              label={skill}
                              onClick={() => handleClick(skill)} />
                    )
                })}

            </div>
            <div style={{
                marginTop: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <button onClick={handleSubmit} className="create-developer-btn">Register me!</button>
            </div>
        </div>
    );
}
