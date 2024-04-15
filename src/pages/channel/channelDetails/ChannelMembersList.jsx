import React from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import UserImage from "../../../components/UserImage";
import { useSelector } from "react-redux";

const ChannelMembersList = ({ channelDetails, userId, setIsRefresh }) => {
  const token = useSelector((state) => state.token);

  const handleRemoveMember = async (id) => {
    const details = JSON.stringify({
      channelId: channelDetails.channelId,
      receipantId: id,
    });
    const adminResponse = await fetch(
      `http://localhost:6001/channel/removeAdminChannel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: details,
      }
    );
    const response = await fetch(`http://localhost:6001/channel/removeMember`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: details,
    });
    await adminResponse.json();
    await response.json();
    setIsRefresh((refresh) => !refresh);
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {channelDetails?.channelMembers.map((response) => {
        const isAdmin = channelDetails.channelAdmin.some(
          (filter) => filter._id === response._id
        );
        const yourId = response._id === userId;
        return (
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <UserImage image={response?.picturePath} size="40px" />
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                {`${response?.firstName} ${response?.lastName}`}
              </Typography>
              {response._id === userId && (
                <Chip
                  label="You"
                  style={{
                    background: "#006d77",
                    color: "#ffff",
                    padding: "0.5rem",
                  }}
                />
              )}
            </Box>
            <Box style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="small"
                style={{
                  textTransform: "none",
                  background: isAdmin ? "#ff7d00" : "#006d77",
                  color: "#ffff",
                }}
              >
                {isAdmin
                  ? yourId
                    ? "Remove yourself from admin"
                    : "Remove from admin"
                  : "Add to admin"}
              </Button>
              <Button
                variant="contained"
                size="small"
                style={{
                  textTransform: "none",
                  background: "#d62828",
                  color: "#ffff",
                }}
                onClick={() => handleRemoveMember(response._id)}
              >
                {yourId ? "Kick out yourself" : "Kick out"}
              </Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ChannelMembersList;
