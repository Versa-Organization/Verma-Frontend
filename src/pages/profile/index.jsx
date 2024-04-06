import { Box, useMediaQuery, Typography, TextField, useTheme, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserWidget from "./../widgets/UserWidget";
import FriendListWidget from "./../widgets/FriendListWidget";
import MyPostWidget from "./../widgets/MyPostWidget";
import PostsWidget from "./../widgets/PostsWidget";
import Navbar from './../navbar/index';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [isPasswordChange, setIsPasswordChange] = useState(false);

  const getUser = async () => {
    const response = await fetch(`http://localhost:6001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar userId={userId} isChangePassword={true} onClickChangePassword={() => setIsPasswordChange(true)} />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {isPasswordChange && <Box style={{ background: '#ffff', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', borderRadius: '8px' }}>
            <Typography
              color={palette.neutral.dark}
              variant="h5"
              fontWeight="500"
            >
              Password Change
            </Typography>
            <TextField fullWidth id="password" label="Password" variant="outlined" />
            <TextField fullWidth id="cpassword" label="Confirm Password" variant="outlined" />
            <Button variant="contained" style={{ background: 'red', color: '#ffff' }} onClick={() => setIsPasswordChange(false)}>Change</Button>
          </Box>}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
