import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import Navbar from "../../navbar";
import WidgetWrapper from "../../../components/WidgetWrapper";
import ChannelList from "./ChannelList";
import { useSelector } from "react-redux";
import ChannelContent from "./ChannelContent";

const ChannelContentIndex = () => {
  const [followedChannelList, setFollowedChannelList] = React.useState();
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);
  const [channel, setChannel] = React.useState(null);
  const [isRefresh, setIsRefresh] = React.useState(false);

  const getFollowedChannelList = async () => {
    const response = await fetch(
      `http://localhost:6001/channel/getConentListChannel`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setFollowedChannelList(data);
  };

  useEffect(() => {
    getFollowedChannelList();
  }, [isRefresh]);

  const handleOpenChannel = (channel) => {
    setChannel(channel);
    setIsRefresh((prev) => !prev);
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Navbar />
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          height: "89vh",
        }}
      >
        <WidgetWrapper style={{ flex: "1 10%", height: "100%" }}>
          <ChannelList
            followedChannelList={followedChannelList}
            onClick={(channel) => handleOpenChannel(channel)}
          />
        </WidgetWrapper>

        <WidgetWrapper style={{ flex: "1 50%", height: "100%" }}>
          {channel ? (
            <ChannelContent
              channel={channel}
              userId={userId}
              token={token}
              isRefresh={isRefresh}
              setIsRefresh={setIsRefresh}
            />
          ) : (
            "Open"
          )}
        </WidgetWrapper>
      </Box>
    </Box>
  );
};

export default ChannelContentIndex;
