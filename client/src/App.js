import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
//Dev notes about this endpoint url
//// If changing to port 5000 the backend will see the request sent every second, but the frontend wil not get a response.
//// If changing to add the socket path, :5001/socket, the backend will receive one connection but will not respond.
const ENDPOINT = "http://127.0.0.1:5001";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default App;