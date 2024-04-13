import React from 'react';
import HorizontalStack from '../../utils/HorizontalStack';
import UserAvatar from './UserAvatar';
import { Card, useTheme } from '@mui/material';

const MessageContent = ({ message, userDetails }) => {
  const theme = useTheme();
  let styles = {};
  if (message.direction === "to") {
    styles = {
      justifyContent: "flex-start",
    };
  } else if (message.direction === "from") {
    styles = {
      messageColor: theme.palette.grey["100"],
      justifyContent: "flex-end",
    };
  }
  return (
    <HorizontalStack
      sx={{ paddingY: 1, width: "100%" }}
      spacing={2}
      justifyContent={styles.justifyContent}
      alignItems="flex-end"
    >
      {message.direction === "to" && (
        <UserAvatar username={`${userDetails.firstName} ${userDetails.lastName}`} height={30} width={30} />
      )}

      <Card
        sx={{
          borderRadius: "15px",
          borderWidth: "1px",
          paddingY: "12px",
          maxWidth: "70%",
          paddingX: 2,
        }}
      >
        {message.content}
      </Card>
    </HorizontalStack>
  )
}

export default MessageContent;
