"use client"

import "./developers.css"
import {DeveloperCard} from "@/components/client-side-components";
import {useEffect, useState} from "react";
import {Skeleton, Stack} from "@mui/material";
import { useRouter } from "next/navigation";

export default function Developers() {
    const [developers, setDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleClick = (id) => {
        router.push(`/developers/${id}`);
    }

    useEffect(() => {
        const fetchDevelopers = async () => {
            try {
                const response = await fetch("http://localhost:4200/api/devs");
                const data = await response.json();
                setDevelopers(data);
            } catch (error) {
                console.error("Error fetching developers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDevelopers();
    }, []);

    return (
        <>
            <div className="developers-title-wrapper">
                <h1 className="developers-title">List of our best developers</h1>
            </div>

            <div className="developers-wrapper">
                {loading ? (
                    <>
                        <div>
                            <Stack spacing={1}>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="circular" width={40} height={40} />
                                <Skeleton variant="rectangular" width={210} height={60} />
                                <Skeleton variant="rounded" width={210} height={60} />
                            </Stack>
                        </div>

                        <div>
                            <Stack spacing={1}>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="circular" width={40} height={40} />
                                <Skeleton variant="rectangular" width={210} height={60} />
                                <Skeleton variant="rounded" width={210} height={60} />
                            </Stack>
                        </div>

                        <div>
                            <Stack spacing={1}>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="circular" width={40} height={40} />
                                <Skeleton variant="rectangular" width={210} height={60} />
                                <Skeleton variant="rounded" width={210} height={60} />
                            </Stack>
                        </div>

                        <div>
                            <Stack spacing={1}>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="circular" width={40} height={40} />
                                <Skeleton variant="rectangular" width={210} height={60} />
                                <Skeleton variant="rounded" width={210} height={60} />
                            </Stack>
                        </div>
                    </>
                ) : (
                    <>
                        {developers?.map((dev) => {
                            return (
                                <div key={dev['_id']} onClick={() => {handleClick(dev['_id'])}}>
                                    <DeveloperCard
                                        developer={dev}/>
                                </div>
                            )
                        })}
                    </>
                )}
            </div>
        </>
    )
}
