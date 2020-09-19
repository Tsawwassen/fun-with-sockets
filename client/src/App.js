import React from "react";
import ClientSocket from './components/ClientSocket.js';

//Dev notes about this endpoint url
//// If changing to port 5000 the backend will see the request sent every second, but the frontend wil not get a response.
//// If changing to add the socket path, :5001/socket, the backend will receive one connection but will not respond.


function App() {
  
  return (
      <div>
        <ClientSocket />
      </div>
  );
}

export default App;