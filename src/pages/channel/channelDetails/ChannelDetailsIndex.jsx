import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery } from "@mui/material";
import Navbar from '../../navbar';
import ChannelOverView from './ChannelOverView';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ChannelDetailsIndex = () => {
    const { id } = useParams();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const token = useSelector((state) => state.token);
    const userId = useSelector((state) => state.user._id);
    const [channelDetails, setChannelDetails] = useState();

    const getChannelDetails = async () => {
        if (id) {
            const response = await fetch(`http://localhost:6001/channel/getChannelById`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ channelId: id })
            });
            const data = await response.json();
            setChannelDetails(data);
        }
    }

    useEffect(() => {
        getChannelDetails();
    }, []);

    return (
        <Box>
            <Navbar />
            <Box style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
                <Box style={{ marginTop: '1rem', height: '100%', width: isNonMobileScreens ? '50%' : '100%' }}>
                    <ChannelOverView channelDetails={channelDetails} userId={userId} />
                </Box>
            </Box>
        </Box>
    )
}

export default ChannelDetailsIndex;
