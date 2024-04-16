import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import logo1 from "../../../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendContent from "./SendContent";
import ReceiverMessageComponent from "./MessageComponent/ReceiverMessageComponent";
import { Scrollbars } from 'react-custom-scrollbars-2';

const ChannelContent = ({ channel, userId, token, setIsRefresh, isRefresh }) => {
    const navigate = useNavigate();
    const [attachment, setAttachment] = React.useState(null);
    const [message, setMessage] = React.useState(null);
    const [getMessages, setGetMessages] = React.useState();
    const isAdmin = channel.channelAdmin.some((filter) => filter === userId);
    const socket = new WebSocket('ws://localhost:3000');

    const scrollbarsRef = useRef(null);

    useEffect(() => {
        if (scrollbarsRef.current) {
            scrollbarsRef.current.scrollToBottom();
        }
    }, [getMessages]);

    const getContent = async () => {
        const response = await fetch(`http://localhost:6001/channel/getContentChannel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                channelId: channel.channelId,
            })
        });
        const data = await response.json();
        setGetMessages(data);
    }

    useEffect(() => {
        getContent();
    }, [isRefresh]);

    const handleSendMessage = async (channelId) => {
        const response = await fetch(`http://localhost:6001/channel/sendContentChannel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                channelId: channelId,
                content: message,
            })
        });
        await response.json();
        setIsRefresh((prev) => !prev);
    }

    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
            }}
        >
            <Box
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box
                    style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate(`/channel-details/${channel.channelId}`)}
                >
                    <Box style={{ width: "40px", height: "40px", borderRadius: "50%" }}>
                        <img src={logo1} width="100%" height="100%" alt="logo" />
                    </Box>
                    <Box>
                        <Typography variant="h4" style={{ fontWeight: "bold" }}>
                            {channel.channelName}
                        </Typography>
                        <Typography variant="body">
                            {channel.privateChannel ? `Private Channel` : `Public Channel`}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <MoreVertIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => alert("Future Enhancement!!!")}
                    />
                </Box>
            </Box>
            <Divider style={{ marginTop: "0.5rem" }} />

            <Scrollbars
                style={{ marginBottom: '0.2rem' }}
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                ref={scrollbarsRef}
            >
                <Box
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        padding: "0.5rem",
                        gap: "0.5rem"
                    }}
                >
                    <ReceiverMessageComponent getMessages={getMessages?.content} userId={userId} />
                </Box>
            </Scrollbars>

            <Box style={{ width: `100%` }}>
                {(channel.isCommunicateEveryOne || isAdmin) && <SendContent
                    setAttachment={setAttachment}
                    attachment={attachment}
                    messageOnChange={(event) => setMessage(event.target.value)}
                    message={message}
                    onSend={() => handleSendMessage(channel.channelId)}
                />}
            </Box>
        </Box>
    );
};

export default ChannelContent;
