import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
  TextField,
  Button
} from "@mui/material";
import FlexBetween from "./../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "./../../components/WidgetWrapper";
import { setPost } from "../../state/index";
import UserImage from "../../components/UserImage";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [isViewReply, setIsViewReply] = useState({});
  const [isReply, setIsReply] = useState({});
  const [comment, setComment] = useState(null);
  const [allComments, setAllComments] = useState(null);
  const [commentReply, setCommentReply] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(
      `http://localhost:6001/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href
        });
      } else {
        alert('Web Share API is not supported in this browser.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const toggleReplyVisibility = (index) => {
    setIsViewReply((prevVisibility) => ({
      ...prevVisibility,
      [index]: !prevVisibility[index],
    }));
  };

  const toggleReplyFormVisibility = (index) => {
    setIsReply((prevVisibility) => ({
      ...prevVisibility,
      [index]: !prevVisibility[index],
    }));
  };

  const getComments = useCallback(async () => {
    const response = await fetch(
      `http://localhost:6001/posts/getComments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
        }),
      }
    );
    const responseData = await response.json();
    if (responseData) {
      setAllComments(responseData);
    }
  }, [token, postId]);

  useEffect(() => {
    void getComments();
  }, [getComments]);

  console.log("postId", postId)

  const sendComment = async () => {
    if (comment) {
      const response = await fetch(
        `http://localhost:6001/posts/sendComment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: postId,
            comment: comment,
          }),
        }
      );
      const updatedPost = await response.json();
      void getComments();
      dispatch(setPost({ post: updatedPost }));
      updatedPost && setComment(null);
    }
  }

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          alt="post"
          style={{
            borderRadius: "0.75rem",
            marginTop: "0.75rem",
            maxHeight: "fit-content",
            maxWidth: "100%",
          }}
          src={`http://localhost:6001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <Tooltip title="Like">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
            </Tooltip>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <Tooltip title="Comment">
              <IconButton onClick={() => setIsComments((preview) => !preview)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
            </Tooltip>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined onClick={handleShare} />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          <Box style={{ width: '100%', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <TextField fullWidth id="outlined-basic" label="Write a comment here..." variant="standard" onChange={(event) => setComment(event.target.value)} value={comment || ''} />
            <Button
              variant="contained"
              style={{ background: '#1e96fc', color: '#ffff' }}
              onClick={sendComment}
            >Comment</Button>
          </Box>
          {allComments.map((comment, i) => {
            return (
              <>
                {comments.length !== 0 &&
                  <Box style={{ marginTop: '1rem' }}>
                    <Box style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <UserImage image={comment.userId.picturePath} size="20px" />
                      <Typography
                        color={main}
                        variant="h5"
                        sx={{
                          cursor: "pointer",
                          fontWeight: 'bold'
                        }}
                      >
                        {`${comment.userId.firstName} ${comment.userId.lastName}`}
                      </Typography>
                    </Box>
                    <Box style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      gap: '0.5rem',
                      marginLeft: '1.8rem'
                    }}>
                      <Typography
                        color={main}
                        variant="h5"
                        sx={{
                          cursor: "pointer",
                          width: '100%'
                        }}
                      >
                        {comment.comment}
                      </Typography>
                      {isViewReply[i] && comment.commentReply.length !== 0 && <>
                        <Divider />
                        <Box style={{ width: '100%' }}>
                          {comment.commentReply.map((replyComment, i) => {
                            return (
                              <>
                                <Box>
                                  <Box style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <UserImage image={replyComment.userId.picturePath} size="20px" />
                                    <Typography
                                      color={main}
                                      variant="h5"
                                      sx={{
                                        cursor: "pointer",
                                        fontWeight: 'bold'
                                      }}
                                    >
                                      {`${replyComment.userId.firstName} ${replyComment.userId.lastName}`}
                                    </Typography>
                                  </Box>
                                  <Box style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'start',
                                    gap: '0.5rem',
                                    marginLeft: '1.8rem'
                                  }}>
                                    <Typography
                                      color={main}
                                      variant="h5"
                                      sx={{
                                        cursor: "pointer",
                                        width: '100%'
                                      }}
                                    >
                                      {replyComment.comment}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Divider fullWidth />
                              </>
                            )
                          })}
                        </Box>
                      </>}
                      <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', width: '100%', marginTop: '1rem' }}>
                        {!isReply[i] && <>
                          <Typography
                            color={main}
                            variant="h5"
                            sx={{
                              cursor: "pointer",
                            }}
                            onClick={() => toggleReplyVisibility(i)}
                          >
                            {`View Reply`}
                          </Typography>
                          <Typography
                            color={main}
                            variant="h5"
                            sx={{
                              cursor: "pointer",
                              color: 'blue'
                            }}
                            onClick={() => toggleReplyFormVisibility(i)}
                          >
                            {`Reply`}
                          </Typography>
                        </>}

                        {isReply[i] &&
                          <Box style={{ width: '100%', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <TextField fullWidth id="outlined-basic" label="Write a comment here..." variant="standard" />
                            <Button
                              variant="contained"
                              style={{ background: '#1e96fc', color: '#ffff' }}
                              onClick={() => toggleReplyFormVisibility(i)}>Reply</Button>
                          </Box>
                        }
                        <Divider />
                      </Box>
                    </Box>
                  </Box>}
                <Divider />
              </>
            )
          })}
        </Box>
      )
      }
    </WidgetWrapper >
  );
};

export default PostWidget;
