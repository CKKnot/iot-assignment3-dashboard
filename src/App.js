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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI0NTQxMDksImV4cCI6MTY3ODc2NzcwOX0.dGWL3KBcx7vu5FYzl6eMkaVTKDuaw43wvRv0kPt5QrM";
var ws = new WebSocketTransport({
  authorization: CUBEJS_TOKEN,
  // apiUrl: "wss://7be9a22c.ap.ngrok.io",
  apiUrl: "ws://ec2-54-158-151-199.compute-1.amazonaws.com:4000",
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
