import React, { useState } from 'react';
import HorizontalStack from '../../utils/HorizontalStack';
import { Button, Stack, TextField } from '@mui/material';

const SendMessageComponent = ({ handleSendMessage, onChange, content, setContent }) => {

    const sendMessage = () => {
        handleSendMessage(content);
        setContent("");
    };
    return (
        <>
            <Stack
                sx={{
                    m: 2,
                    height: "40px",
                }}
                justifyContent="center"
            >
                <HorizontalStack>
                    <TextField
                        onChange={(e) => onChange(e)}
                        label="Send a message..."
                        fullWidth
                        value={content}
                        autoComplete="off"
                        size="small"
                        onKeyPress={(e) => {
                            if (e.key === "Enter" && content.length > 0) {
                                sendMessage();
                            }
                        }}
                    />

                    <Button onClick={handleSendMessage} disabled={content.length === 0}>
                        Send
                    </Button>
                </HorizontalStack>
            </Stack>
        </>
    )
}

export default SendMessageComponent;
