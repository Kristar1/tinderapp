import React from "react";

const Chat = ({ descendingOrderMessages , user, }) => {
  const userId= user?.user_id;
  // const from_userId= descendingOrderMessages?.from_userId;
  // console.log( 'userId:', userId)

  return (
    <div className="chat-display">
      {descendingOrderMessages.map((message, _index) => (
        <div key={_index} className={userId ===  message.from_userId? 'individual-chat right':'individual-chat left ' } >
          <div className="chat-message-header">
            {/* {console.log(  'message.from_userId', message.from_userId)} */}
            <div className="img-container">
              <img src={message.img} alt={message.First_name + "profile"} />
            </div>
            <p>{message.name}</p>
          </div>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Chat;
