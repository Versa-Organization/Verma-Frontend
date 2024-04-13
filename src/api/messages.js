
const getConversations = async (token) => {
  try {
    const response = await fetch(`http://localhost:6001/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    // Check if response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch conversations');
    }

    // Parse response body as JSON
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    // Ensure to handle error cases properly, depending on your application's logic
    // For now, let's return null or any default value to indicate failure
    return null;
  }
};


const getMessages = async (token, conversationId) => {
  try {
    const res = await fetch(`http://localhost:6001/messages/getMessage/${conversationId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const sendMessage = async (token, message, recipientId, userId) => {
  console.log("token", token);
  console.log("message", message);
  console.log("recipientId", recipientId);
  console.log("userId", userId);
  try {
    const res = await fetch(`http://localhost:6001/messages/sendMessage/${recipientId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: message.content,
        userId: userId,
      }),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};


export { getConversations, getMessages, sendMessage };
