import React from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import UserImage from "../../../components/UserImage";

const ChannelAdminList = ({ channelDetails, userId }) => {
  return (
    <Box>
      {channelDetails?.channelAdmin.map((response) => {
        console.log("response", response);
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
              {channelDetails.channelCreatedBy === userId && (
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
                  background: "#ff7d00",
                  color: "#ffff",
                }}
              >
                Remove from admin
              </Button>
              <Button
                variant="contained"
                size="small"
                style={{
                  textTransform: "none",
                  background: "#d62828",
                  color: "#ffff",
                }}
              >
                Kick out
              </Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ChannelAdminList;
