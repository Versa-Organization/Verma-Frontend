

const getConversations = async (user) => {
  try {
    const res = await fetch("http://localhost:6001/messages", {
      headers: {
        "x-access-token": user,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getMessages = async (user, conversationId) => {
  try {
    const res = await fetch("http://localhost:6001/messages/getMessage/" + conversationId, {
      headers: {
        "x-access-token": user,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const sendMessage = async (user, message, recipientId) => {
  try {
    const res = await fetch("http://localhost:6001/messages/sendMessage/" + recipientId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user,
      },
      body: JSON.stringify(message),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export { getConversations, getMessages, sendMessage };
