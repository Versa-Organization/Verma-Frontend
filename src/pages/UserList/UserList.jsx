import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../navbar";
import { useSelector } from "react-redux";
import ProfilePage from "./ProfilePage";
import UserSuggestion from "./UserSuggestion";
import ChannelIndex from "../channel/ChannelIndex";

const UserList = () => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const userId = user._id;
  const [userList, setUserList] = useState(null);
  const [addFriendLoading, setAddFriendLoading] = useState(false);
  const [receipantId, setReceipantId] = useState(null);
  const [isRefresh, setIsRefresh] = React.useState(false);

  const getUserList = async () => {
    const response = await fetch(`http://localhost:6001/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUserList(data);
  };

  useEffect(() => {
    getUserList();
  }, [addFriendLoading]);

  return (
    <>
      <Box>
        <Navbar />

        <Box
          style={{
            marginTop: "1rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            width: "100%",
            justifyContent: "space-between",
            // height: "89.5vh",
          }}
        >
          {/* PROFILE */}
          <Box style={{ width: "100%", flex: 1, height: "100%" }}>
            <ProfilePage
              userId={userId}
              user={user}
              token={token}
              addFriendLoading={addFriendLoading}
              isRefresh={isRefresh}
            />
          </Box>

          {/* USER SUGGESTION */}
          <Box
            style={{
              width: "100%",
              height: "100%",
              flex: 1,
            }}
          >
            <UserSuggestion
              userList={userList}
              userId={userId}
              setReceipantId={setReceipantId}
              receipantId={receipantId}
              setAddFriendLoading={setAddFriendLoading}
              addFriendLoading={addFriendLoading}
              token={token}
            />
          </Box>

          {/* SEARCH USERS */}
          <Box style={{ width: "100%", height: "100%", flex: 1 }}>
            <ChannelIndex isRefresh={isRefresh} setIsRefresh={setIsRefresh} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserList;
