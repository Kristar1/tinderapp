import axios from "axios";
import React from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import { useState, useEffect } from "react";

const ChatDisplay = ({ user, clickedUser,  }) => {
  const [usersMessages, setUsersMessages] = useState(null);
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null);

  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

    const getUsersMessages= async() => {

    try {
      const response =   await axios.get("/messages", {
        params: { userId: userId, correspondingUserId: clickedUserId },
      });

      setUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  }; 

  const getClickedUsersMessages =  async () => {
    try {
      const response = await axios.get("/messages", {
        params: { userId: clickedUserId, correspondingUserId: userId },
      });

      setClickedUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsersMessages()
    
    getClickedUsersMessages()
  })
  

  const messages = [];

  usersMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = user?.First_name;
    formattedMessage["img"] = user?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    formattedMessage["from_userId"] = message.from_userId;
    messages.push(formattedMessage);
  });

  clickedUsersMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = clickedUser?.First_name;
    formattedMessage["img"] = clickedUser?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    formattedMessage["from_userId"] = message.from_userId;
    messages.push(formattedMessage);

    console.log("userMessages", usersMessages);
    console.log("formattedMessages", messages);
  });

  const descendingOrderMessages = messages.sort((a, b) => {
    return b.name - a.name;
  })

  return (
    <>
      <Chat descendingOrderMessages={descendingOrderMessages} user={user} />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getClickedUsersMessages={getClickedUsersMessages}
        getUsersMessages={getUsersMessages}
      />
    </>
  );
};

export default ChatDisplay;
