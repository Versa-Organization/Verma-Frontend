import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import ShareIcon from "@mui/icons-material/Share";
import LinkIcon from "@mui/icons-material/Link";

const ChannelShare = () => {
    return (
        <Box style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: 'wrap' }}>
            <Button
                variant="contained"
                onClick={() => alert("Future Enhancement!!!")}
                style={{
                    textTransform: "none",
                    background: "black",
                    color: "#ffff",
                    gap: "1rem",
                }}
            >
                <ReplyIcon />
                <Typography>Forward</Typography>
            </Button>
            <Button
                variant="contained"
                onClick={() => alert("Future Enhancement!!!")}
                style={{
                    textTransform: "none",
                    background: "black",
                    color: "#ffff",
                    gap: "1rem",
                }}
            >
                <ShareIcon />
                <Typography>Share channel</Typography>
            </Button>
            <Button
                variant="contained"
                onClick={() => alert("Future Enhancement!!!")}
                style={{
                    textTransform: "none",
                    background: "black",
                    color: "#ffff",
                    gap: "1rem",
                }}
            >
                <LinkIcon />
                <Typography>Create link</Typography>
            </Button>
        </Box>
    )
}

export default ChannelShare
