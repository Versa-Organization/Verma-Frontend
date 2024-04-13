import React from "react";
import { Box, Typography, Button } from "@mui/material";
import WidgetWrapper from "../../../components/WidgetWrapper";
import logo1 from "../../../assets/logo1.png";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import PageviewIcon from "@mui/icons-material/Pageview";

const ChannelOverView = ({ channelDetails, userId }) => {
  const adminFilter = channelDetails?.channelAdmin.includes(userId);
  return (
    <WidgetWrapper style={{ height: "100%" }}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={logo1} width="400px" height="100%" alt="img" />
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2">{channelDetails?.channelName}</Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">
          {channelDetails?.channelDescription}
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="h6">{"Total Member:"}</Typography>
        <Typography variant="h6">
          {channelDetails?.channelMembers?.length}
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {(channelDetails?.channelCreatedBy === userId || adminFilter) && (
          <Button
            variant="contained"
            style={{
              background: "#00a5cf",
              color: "#ffff",
              textTransform: "none",
              padding: "0.5rem",
              display: "felx",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <PersonAddIcon />
            <Typography variant="body">{"Add Member"}</Typography>
          </Button>
        )}
        {(channelDetails?.channelCreatedBy === userId || adminFilter) && (
          <Button
            variant="contained"
            style={{
              background: "#468faf",
              color: "#ffff",
              textTransform: "none",
              padding: "0.5rem",
              display: "felx",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <ModeEditOutlineIcon />
            <Typography variant="body">{"Edit Channel"}</Typography>
          </Button>
        )}
        {(channelDetails?.channelCreatedBy === userId || adminFilter) && (
          <Button
            variant="contained"
            style={{
              background: "#468faf",
              color: "#ffff",
              textTransform: "none",
              padding: "0.5rem",
              display: "felx",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <PageviewIcon />
            <Typography variant="body">{"View Admins"}</Typography>
          </Button>
        )}
        <Button
          variant="contained"
          style={{
            background: "#468faf",
            color: "#ffff",
            textTransform: "none",
            padding: "0.5rem",
            display: "felx",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <PageviewIcon />
          <Typography variant="body">{"View Members"}</Typography>
        </Button>
        {(channelDetails?.channelCreatedBy === userId || adminFilter) && (
          <Button
            variant="contained"
            style={{
              background: "red",
              color: "#ffff",
              textTransform: "none",
              padding: "0.5rem",
              display: "felx",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <DeleteIcon />
            <Typography variant="body">{"Delete Channel"}</Typography>
          </Button>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default ChannelOverView;
