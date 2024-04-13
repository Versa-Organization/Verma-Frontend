import React, { useEffect, useRef, useState, useCallback } from 'react'
import HorizontalStack from '../../utils/HorizontalStack'
import { Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material'
import { AiFillCaretLeft, AiFillMessage } from 'react-icons/ai'
import UserAvatar from './UserAvatar'
import MessageContent from './MessageContent'
import SendMessageComponent from './SendMessageComponent'
import Loading from './Loading';
import { useSelector } from 'react-redux'
import { getMessages, sendMessage } from '../../api/messages'
import { socket } from '../../utils/socketHelper';


const MessageContentComponent = ({ mobile, conversations, conversation, conservant, setConservant, setConversations }) => {
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const conversationsRef = useRef(conversation);
    const conservantRef = useRef(conservant);
    const messagesRef = useRef(messages);

    const [content, setContent] = useState("");

    const handleSendMessage = async () => {
        const newMessage = { direction: "from", content };
        const newMessages = [newMessage, ...messages];
        const username = user.firstName + user.lastName

        if (conversation.new) {
            conversation.messages = [...conversation.messages, newMessage];
        }

        let newConversations = conversations.filter(
            (conversationCompare) => conversation._id !== conversationCompare._id
        );

        newConversations.unshift(conversation);

        setConversations(newConversations);

        setMessages(newMessages);

        await sendMessage(token, newMessage, conversation.recipientDetails.userId, conversation.userDetails.userId);
        setLoading(false);

        socket.emit(
            "send-message",
            conversation.recipientDetails.userId,
            username,
            content
        );
    }

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView();
    }, []);

    const handleReceiveMessage = useCallback((senderId, username, content) => {
        const newMessage = { direction: "to", content };
        if (conversation) {
            let newMessages = [newMessage];
            if (messagesRef.current) {
                newMessages = [...newMessages, ...messagesRef.current];
            }

            setMessages(newMessages);

            if (conversation.new) {
                conversation.messages = newMessages;
            }
            conversation.lastMessageAt = Date.now();

            let newConversations = conversationsRef.current.filter(
                (conversationCompare) => conversation._id !== conversationCompare._id
            );

            newConversations.unshift(conversation);

            setConversations(newConversations);
        } else {
            const newConversation = {
                _id: senderId,
                recipient: { _id: senderId, username },
                new: true,
                messages: [newMessage],
                lastMessageAt: Date.now(),
            };
            setConversations([newConversation, ...conversationsRef.current]);
        }

        scrollToBottom();
    }, [conversation, messagesRef, conversationsRef, setMessages, setConversations, scrollToBottom]);

    useEffect(() => {
        socket.on("receive-message", handleReceiveMessage);
    }, [handleReceiveMessage]);

    useEffect(() => {
        conversationsRef.current = conversation;
        conservantRef.current = conservant;
        messagesRef.current = messages;
    });

    const setDirection = (messages) => {
        if (Array.isArray(messages)) {
            messages.forEach((message) => {
                if (message.sender._id === user._id) {
                    message.direction = "from";
                } else {
                    message.direction = "to";
                }
            });
        } else {
            console.error("messages is not an array");
        }
    };

    const fetchMessages = async () => {
        if (conversation) {
            if (conversation.new) {
                setLoading(false);
                setMessages(conversation.messages);
                return;
            }

            setLoading(true);

            const data = await getMessages(token, conversation.conversationId);

            setDirection(data);

            if (data && !data.error) {
                setMessages(data);
            }

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [conservant]);

    useEffect(() => {
        fetchMessages();
    }, [conservant]);

    useEffect(() => {
        if (messages) {
            scrollToBottom();
        }
    }, [messages]);

    return conservant && !loading && conservant ? (
        <>
            {conversation ? <>
                <HorizontalStack
                    alignItems="center"
                    spacing={2}
                    sx={{ px: 2, height: "60px" }}
                >
                    {mobile && <IconButton
                        onClick={() => setConservant(null)}
                        sx={{ padding: 0 }}
                    >
                        <AiFillCaretLeft />
                    </IconButton>}

                    <UserAvatar
                        username={`${conservant.firstName} ${conservant.lastName}`}
                        height={30}
                        width={30}
                    />
                    <Typography>
                        <Link to={"/users/" + `${conservant.firstName} ${conservant.lastName}`}>
                            <b>{`${conservant.firstName} ${conservant.lastName}`}</b>
                        </Link>
                    </Typography>
                </HorizontalStack>
                <Divider />
                <Box sx={{ height: "calc(100vh - 240px)" }}>
                    <Box sx={{ height: "100%" }}>
                        <Stack
                            sx={{ padding: 2, overflowY: "auto", maxHeight: "100%" }}
                            direction="column-reverse"
                        >
                            <div ref={messagesEndRef} />
                            {Array.isArray(messages) && messages.map((message, i) => (
                                <MessageContent
                                    userDetails={conservant}
                                    message={message}
                                    key={i}
                                />
                            ))}

                        </Stack>
                    </Box>
                </Box>
                <SendMessageComponent
                    handleSendMessage={handleSendMessage}
                    content={content}
                    setContent={setContent}
                    onChange={(e) => setContent(e.target.value)}
                />
                {scrollToBottom()}
            </>
                :
                <>
                    <Stack sx={{ height: "100%" }} justifyContent="center">
                        <Loading />
                    </Stack>
                </>
            }
        </>
    ) : (
        <Stack
            sx={{ height: "100%" }}
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <AiFillMessage size={80} />
            <Typography variant="h5">Verma Messenger</Typography>
            <Typography color="text.secondary">
                Privately message other users on Verma
            </Typography>
        </Stack>
    )
}

export default MessageContentComponent
