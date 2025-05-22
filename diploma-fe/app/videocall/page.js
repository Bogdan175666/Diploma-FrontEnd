"use client"

import React, { useEffect, useRef, useState } from "react";
import {useRouter} from "next/navigation";
import socket from "../../util/socket";
import Peer from "simple-peer";
import './Videocall.css'

export default function VideoCall () {
    const router = useRouter();
    const myVideo = useRef(null);
    const userVideo = useRef(null);
    const peerRef = useRef(null);
    const streamRef = useRef(null);

    const [callAccepted, setCallAccepted] = useState(false);
    const [receivingCall, setReceivingCall] = useState(false);
    const [callerSignal, setCallerSignal] = useState(null);
    const whoIs = sessionStorage.getItem("whoIs");

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            streamRef.current = stream;
            if (myVideo.current) myVideo.current.srcObject = stream;
        });

        socket.emit("join", whoIs);

        socket.on("incoming-call", ({ signal }) => {
            setReceivingCall(true);
            setCallerSignal(signal);
        });

        socket.on("call-answered", ({ signal }) => {
            if (peerRef.current) peerRef.current.signal(signal);
        });

        return () => socket.disconnect();
    }, [whoIs]);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("receive-message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("receive-message");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            const msg = { sender: whoIs, text: message };
            socket.emit("send-message", msg);
            setMessages((prev) => [...prev, msg]);
            setMessage("");
        }
    };

    const callUser = () => {
        const peer = new Peer({ initiator: true, trickle: false, stream: streamRef.current });


            peer.on("signal", (signal) => {
                socket.emit("call-user", {
                    to: "developer",
                    from: whoIs,
                    signal,
                });
            });



        peer.on("signal", (signal) => {
            socket.emit("notify", {
                to: "developer",
                from: whoIs,
                signal,
            });
        })

        peer.on("stream", (remoteStream) => {
            if (userVideo.current) userVideo.current.srcObject = remoteStream;
        });

        peerRef.current = peer;
        setCallAccepted(true);
    };

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({ initiator: false, trickle: false, stream: streamRef.current });

        peer.on("signal", (signal) => {
            socket.emit("answer-call", {
                to: "client",
                signal,
            });
        });

        peer.on("stream", (remoteStream) => {
            if (userVideo.current) userVideo.current.srcObject = remoteStream;
        });

        peer.signal(callerSignal);
        peerRef.current = peer;
    };

    const endCall = () => {
        peerRef.current?.destroy();
        streamRef.current?.getTracks().forEach((t) => t.stop());
        router.push("/");
    };

    const toggleMic = () => {
        const audio = streamRef.current?.getAudioTracks()[0];
        if (audio) audio.enabled = !audio.enabled;
    };

    const toggleCamera = () => {
        const video = streamRef.current?.getVideoTracks()[0];
        if (video) video.enabled = !video.enabled;
    };

    return (
        <div className="call-layout">
            <div className="video-section">
                <video ref={myVideo} autoPlay muted className="video" />
                <video ref={userVideo} autoPlay className="video" />
                <div className="controls">
                    {whoIs === "client" && !callAccepted && (
                        <button className="btn primary" onClick={callUser}>Call Developer</button>
                    )}
                    {whoIs === "developer" && receivingCall && !callAccepted && (
                        <button className="btn primary" onClick={answerCall}>Answer Call</button>
                    )}
                    {callAccepted && (
                        <>
                            <button className="btn" onClick={toggleMic}>🎙️ Mic</button>
                            <button className="btn" onClick={toggleCamera}>🎥 Cam</button>
                            <button className="btn danger" onClick={endCall}>❌ End</button>
                        </>
                    )}
                </div>
            </div>

            <div className="chat-section">
                <div className="chat-header">💬 Chat</div>
                <div className="messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`msg ${msg.sender === whoIs ? "me" : "them"}`}>
                            <span><strong>{msg.sender}:</strong> {msg.text}</span>
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Type a message..."
                    />
                    <button className="btn send" onClick={sendMessage}>📩</button>
                </div>
            </div>
        </div>
    );
}
