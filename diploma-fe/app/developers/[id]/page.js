"use client"
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Skeleton, Stack} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import './dev-profile.css'

export default function DeveloperId () {
    const [developer, setDeveloper] = useState();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const getRandomDescription = () => {
        const descriptions = [
            "An experienced and versatile developer with over 5 years of experience in building highly scalable and performant applications. Strong in problem-solving, and always ready to take on new challenges. Adept at working with clients to understand their needs and delivering results that exceed expectations.",
            "A creative and detail-oriented freelance developer specializing in front-end and back-end technologies. Passionate about creating user-friendly interfaces and ensuring seamless user experiences. Strong communication skills allow me to collaborate effectively with clients and teammates to bring projects to life.",
            "With a knack for clean and maintainable code, I am a freelance developer who thrives on transforming complex ideas into easy-to-use software solutions. I take pride in my ability to understand client requirements and deliver quality work in a timely manner, whether it's building from scratch or improving existing systems.",
            "A dedicated developer who enjoys tackling both front-end and back-end challenges. I have a strong background in web technologies and am experienced in turning ideas into functional products. Known for my attention to detail and ability to work autonomously while maintaining communication with clients to ensure project goals are met.",
            "An innovative freelance developer with a focus on user-centered design. My approach to coding goes beyond just functionality; I aim to create experiences that delight users and drive business success. With a collaborative mindset, I ensure that my work aligns with the client's vision while pushing boundaries for the best outcome.",
            "As a seasoned developer, I bring a passion for writing clean, efficient code. Over the years, I’ve worked on various freelance projects, focusing on developing applications that solve real-world problems. I strive to stay on top of industry trends and continuously improve my skills to offer modern and scalable solutions.",
        ];

        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    useEffect(() => {
        const fetchDeveloper = async () => {
            try {
                const response = await fetch(`http://localhost:4200/api/devs/${id}`);
                const data = await response.json();
                setDeveloper(data);
            } catch (error) {
                console.error("Error fetching developers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeveloper();
    }, [id]);

    return (
        <div>
            {loading ? (
                <Stack spacing={1}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={60} />
                    <Skeleton variant="rounded" width={210} height={60} />
                </Stack>
            ) : (
                <div>
                    <div className="dev-profile-wrapper">
                        <div className="dev-profile-ava-wrapper">
                            <CardMedia
                                component="img"
                                image={developer.developer.image}
                                alt="Developer image"
                                sx={{
                                    width: 250,
                                    height: 250,
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                }}
                            />
                            <div className="dev-profile-text-wrapper">
                                <p className="dev-profile-text-main">{developer.developer.name}</p>
                                <p className="dev-profile-text-sub">{developer.developer.name.toLowerCase().replace(" ", ".")}@gmail.com</p>
                            </div>
                        </div>
                        {sessionStorage?.getItem('whoIs') === 'client' &&
                        <button className="developer-call-btn">Call me :)</button>
                        }
                    </div>

                    <div className="dev-profile-skills">
                        <p className="dev-profile-text-main">About myself:</p>
                        <p className="dev-profile-text-sub">{getRandomDescription()}</p>
                    </div>

                    <div className="dev-profile-skills">
                        <p className="dev-profile-text-main">Technologies I am using:</p>
                        <p className="dev-profile-text-sub">{developer.developer.skills.join(", ")}</p>
                    </div>

                    <div className="dev-profile-skills">
                        <p className="dev-profile-text-main">My rating for today:</p>
                        <p className="dev-profile-text-sub rating">{developer.developer.rating}.0</p>
                    </div>
                </div>

            )}
        </div>
    )
}
