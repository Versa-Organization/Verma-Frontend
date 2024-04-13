import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import logo1 from "../../assets/logo1.png";

const ChannelCardList = ({ isDisplay, isRefresh }) => {
  const [channelList, setChannelList] = useState(null);
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);

  const getChannelList = async () => {
    const response = await fetch("http://localhost:6001/channel", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setChannelList(data);
  };

  useEffect(() => {
    getChannelList();
  }, [isRefresh]);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        marginTop: !isDisplay ? "1rem" : "none",
      }}
    >
      {!isDisplay && (
        <WidgetWrapper>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Top Channel
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            MindMeld: Share, explore, innovate! Join vibrant discussions, spark
            creativity, and collaborate with fellow thinkers.
          </Typography>
        </WidgetWrapper>
      )}
      {channelList?.length !== 0 && (
        <WidgetWrapper>
          <Box
            style={{
              display: "flex",
              gap: "1rem",
              width: "100%",
              flexWrap: "wrap",
              alignItems: "flex-start",
              justifyContent: "start",
            }}
          >
            {channelList &&
              channelList?.slice().reverse().map((channel) => {
                const filteredUser = channel?.channelMembers?.includes(userId);
                return (
                  <Box
                    style={{ width: "180px", height: "150px", flex: "1 1 30%" }}
                  >
                    <Card
                      style={{
                        borderRadius: "25px",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <CardContent>
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          <Box style={{ width: "30px", height: "30px" }}>
                            <img
                              src={
                                channel.channelImage
                                  ? channel.channelImage
                                  : logo1
                              }
                              width="100%"
                              height="100%"
                              alt="Logo"
                            />
                          </Box>
                          <Box>
                            <Typography>{channel?.channelName}</Typography>
                          </Box>
                          <Box>
                            {filteredUser ? <Button variant="contained" size="small">
                              View
                            </Button> : <Button variant="contained" size="small">
                              Join
                            </Button>}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                );
              })}
          </Box>
        </WidgetWrapper>
      )}
    </Box>
  );
};

export default ChannelCardList;
