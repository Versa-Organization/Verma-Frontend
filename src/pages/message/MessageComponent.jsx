import { Box, Card, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';
import MessageParticipant from './MessageParticipant';
import MessageContentComponent from './MessageContentComponent';
import { useSelector } from 'react-redux';
import { getConversations } from '../../api/messages';
import { useLocation } from "react-router-dom";

const MessageComponent = () => {
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user);
  const [width, setWindowWidth] = useState(0);
  const mobile = width < 800;
  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };
  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  //=======================================================================================//
  const [conversations, setConversations] = useState([
    {
      firstName: "Mansi",
      lastName: "Verma",
      location: "Hydrabad",
      occupation: "Student",
      picturePath: "Screenshot 2024-04-08 160330.png",
      _id: "661391c98a5de4db8693a922",
    }
  ]);
  const [conversation, setConversation] = useState({})
  const [conservant, setConservant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [conversationId, setConversationId] = useState(null);
  const { state } = useLocation();
  const newConservant = state && state.user;
  const recipientDetails = {
    recipientDetails: newConservant
  }

  const fetchConversation = async () => {
    const response = await getConversations(token);
    if (response) {
      if (newConservant) {
        setConversations([...response, recipientDetails]);
        setLoading(false);
      } else {
        setConversations(response);
        setLoading(false);
      }
    }
  }
  useEffect(() => {
    fetchConversation();
  }, []);


  const handleOnClick = async (conversationId) => {
    setConversationId(conversationId);
    if (conversationId) {
      const response = conversations && conversations.filter((filter) => filter.conversationId === conversationId);
      if (response) {
        setConversation(response[0])
      }
    }
  }


  return (
    <Box>
      <Navbar />
      <Box style={{ marginTop: 15 }}>
        <Card sx={{ padding: 0 }}>
          <Grid
            container
            sx={{ height: "calc(100vh - 110px)" }}
            alignItems="stretch"
          >
            {!mobile ?
              <>
                <Grid
                  item
                  xs={5}
                  sx={{
                    borderRight: 1,
                    borderColor: "divider",
                    height: "100%",
                  }}
                >
                  <MessageParticipant
                    conversations={conversations}
                    loading={loading}
                    conservant={conservant}
                    setConservant={setConservant}
                    handleOnClick={(conversationId) => handleOnClick(conversationId)}
                  />
                </Grid>
                <Grid item xs={7} sx={{ height: "100%" }}>
                  <MessageContentComponent
                    mobile={mobile}
                    recipientId={conversationId}
                    conversation={conversation}
                    conversations={conversations}
                    conservant={conservant}
                    setConservant={setConservant}
                    setConversations={setConversations}
                  />
                </Grid>
              </>
              : !conservant ?
                <Grid
                  item
                  xs={12}
                  sx={{
                    borderRight: 1,
                    borderColor: "divider",
                    height: "100%",
                  }}
                >
                  <MessageParticipant />
                </Grid>
                :
                <Grid item xs={12} sx={{ height: "100%" }}>
                  {/* <MessageContentComponent /> */}
                </Grid>
            }
          </Grid>
        </Card>
      </Box>
    </Box>
  )
}

export default MessageComponent;
