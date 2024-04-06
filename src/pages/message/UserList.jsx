import { Avatar, ListItemAvatar, ListItemText, MenuItem } from '@mui/material'
import React from 'react'
import UserAvatar from './UserAvatar'
import moment from 'moment';

const UserList = ({ conversation, conservant, setConservant, handleOnClick }) => {
    const recipient = conversation.recipientDetails;
    const recipientUserName = `${recipient.firstName} ${recipient.lastName}`;
    const conservantUserName = `${conservant?.firstName} ${conservant?.lastName}`;
    const selectedUser = conservantUserName === recipientUserName;

    return (
        <>
            <MenuItem
                onClick={() => {
                    setConservant(conversation.recipientDetails)
                    handleOnClick(conversation.conversationId)
                }}
                sx={{ padding: 2 }}
                divider
                disableGutters
                selected={selectedUser}
            >
                <ListItemAvatar>
                    <UserAvatar height={45} width={45} username={recipientUserName} />
                </ListItemAvatar>
                <ListItemText
                    primary={recipientUserName}
                    secondary={<div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <p>Message</p>
                        <p>{`${moment(conversation.lastMessageAt).fromNow()}`}</p>
                    </div>}
                />
            </MenuItem>
        </>
    )
}

export default UserList
