import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../../hooks/useGetMessages";
import Loading from "../../../components/loading/Loading";
import useGetSocketMessage from "../../../hooks/useGetSocketMessage";
const Messages = () => {
  const { loading, messages } = useGetMessages();
  useGetSocketMessage();
  const lastMessageRef = useRef(null);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <React.Fragment>
      {!loading && messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          How about saying hello?
        </div>
      )}
      <div>
        {loading ? (
          <Loading />
        ) : (
          messages.length > 0 &&
          messages.map((message, index) => (
            <div
              key={message._id}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            >
              <Message message={message} />
            </div>
          ))
        )}
      </div>
    </React.Fragment>
  );
};

export default Messages;
