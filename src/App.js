import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./body.css";
import { makeStyles } from "@material-ui/core/styles";
import { Layout } from "antd";
import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import Header from "./components/Header";
import WebSocketTransport from '@cubejs-client/ws-transport';
//Cubejs initialization; Websocket initialization
const CUBEJS_TOKEN =
  "6bd9ce4c0809c78ad2cffd4d59f5b744f915f5d4cb891cedf614a1d70558cb9a0af9ca1a0f1dae17a5f32d9d024012774142c5b15cc974a1e3f3dbbbb71121a8";
var ws = new WebSocketTransport({
  authorization: CUBEJS_TOKEN,
  // apiUrl: "wss://7be9a22c.ap.ngrok.io",
  apiUrl: "ws://localhost:4000",
  hearBeatInterval: 5
});
var cubejsApi = cubejs({
    transport: ws
});
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

//Define the layout of our web application
const AppLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <div>{children}</div>
    </div>
  );
};

//Setup for web application
const App = ({ children }) => (
  <CubeProvider cubejsApi={cubejsApi}>
    <AppLayout>{children}</AppLayout>
  </CubeProvider>
);

//Function to handles WebSocket unsubscription
function WebSocketUnsubscribe(messageid){
  ws.sendMessage({unsubscribe: messageid})
}

//Export these as so that other class can use it
export {
  App,
  WebSocketUnsubscribe
}
