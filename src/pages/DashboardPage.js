import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ChartRenderer from "../components/ChartRenderer";
import Dashboard from "../components/Dashboard";
import DashboardItem from "../components/DashboardItem";
import { CardActions } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
const theme = createMuiTheme({
   palette: {
      primary: blue,
      secondary: {
         main: '#ff4081'
      }
   },
});
var { WebSocketUnsubscribe } = require('../App');
var mButton = "minute", hButton = "hour", dButton = "day", clickCount = 0;
//Query data is here.
var DashboardItems = [
   {
      "id": 1,
      "name": "Soil Moisture",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.soilMoisture"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "granularity": "second"
               }
            ],
            "order": {
               "Sensor.timestamp": "desc"
            },
            "limit": 1,
            "timezone": 'Asia/Kuching'
         },
         "chartType": "number"
      }
   },
   {
      "id": 2,
      "name": "Soil Moisture within 5 minutes (Mean)",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.averageSoilMoisture"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "dateRange": "from 5 minute ago to now"
               }
            ],
            "order": {
               "Sensor.timestamp": "desc"
            },
            "timezone": 'Asia/Kuching'
         },
         "chartType": "number"
      }
   },
   {
      "id": 3,
      "name": "Soil Moisture Margin of Error within 5 minutes (Standard Deviation)",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.soilMoistureStd"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "dateRange": "from 5 minute ago to now"
               }
            ],
            "order": {
               "Sensor.timestamp": "desc"
            },
            "timezone": 'Asia/Kuching'
         },
         "chartType": "number"
      }
   },
   {
      "id": 4,
      "name": "Light Intensity",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.lightIntensity"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "granularity": "second"
               }
            ],
            "order": {
               "Sensor.timestamp": "desc"
            },
            "limit": 1,
            "timezone": 'Asia/Kuching'
         },
         "chartType": "number"
      }
   },
   {
      "id": 5,
      "name": "Light Intensity within 5 minutes (Mean)",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.averageLightIntensity"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "dateRange": "from 5 minute ago to now"
               }
            ],
            "order": {
               "Sensor.timestamp": "desc"
            },
            "timezone": 'Asia/Kuching'
         },
         "chartType": "number"
      }
   },
   {
      "id": 6,
      "name": "Light Intensity Margin of Error within 5 minutes (Standard Deviation)",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.lightIntensityStd"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "dateRange": "from 5 minute ago to now"
               }
            ],
            "order": {
               "Sensor.timestamp": "desc"
            },
            "timezone": 'Asia/Kuching'
         },
         "chartType": "number"
      }
   },
   {
      "id": 7,
      "name": "Light Intensity 2",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.lightIntensity2"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "granularity": "second"
               }
            ],
            "order": {
               "Sensor.timestamp": "desc"
            },
            "limit": 1,
            "timezone": 'Asia/Kuching'
         },
         "chartType": "number"
      }
   },
   {
      "id": 8,
      "name": "Light Intensity 2 within 5 minutes (Mean)",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.averageLightIntensity2"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "dateRange": "from 5 minute ago to now"
               }
            ],
            "order": {
               "Sensor.timestamp": "desc"
            },
            "timezone": 'Asia/Kuching'
         },
         "chartType": "number"
      }
   },
   {
      "id": 9,
      "name": "Light Intensity 2 Margin of Error within 5 minutes (Standard Deviation)",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.lightIntensity2Std"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "dateRange": "from 5 minute ago to now"
               }
            ],
            "order": {
               "Sensor.timestamp": "desc"
            },
            "timezone": 'Asia/Kuching'
         },
         "chartType": "number"
      }
   },
   {
      "id": 10,
      "name": "Light Intensity Sensors differences within 5 minutes (Variance between Light Intensity & Light Intensity 2)",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.lightIntensityVariance"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "dateRange": "from 5 minute ago to now"
               }
            ],
            "order": {
               "Sensor.timestamp": "desc"
            },
            "limit": 1,
            "timezone": 'Asia/Kuching'
         },
         "chartType": "number"
      }
   },
   {
      "id": 11,
      "name": "Ambient Temperature",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.ambientTemperature"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "granularity": "second"
               }
            ],
            "order": {
               "Sensor.timestamp": "desc"
            },
            "limit": 1,
            "timezone": 'Asia/Kuching'
         },
         "chartType": "number"
      }
   },
   {
      "id": 12,
      "name": "Ambient Temperature within 5 minutes (Mean)",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.averageAmbientTemperature"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "dateRange": "from 5 minute ago to now"
               }
            ],
            "order": {
               "Sensor.timestamp": "desc"
            },
            "timezone": 'Asia/Kuching'
         },
         "chartType": "number"
      }
   },
   {
      "id": 13,
      "name": "Ambient Temperature Margin of Error within 5 minutes (Standard Deviation)",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.ambientTemperatureStd"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "dateRange": "from 5 minute ago to now"
               }
            ],
            "order": {
               "Sensor.timestamp": "desc"
            },
            "timezone": 'Asia/Kuching'
         },
         "chartType": "number"
      }
   },
   {
      "id": 14,
      "name": "Intruder Count Within Last 1 Hour",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.intruderCount"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "dateRange": "from 1 hour ago to now"
               }
            ],
            "order": {
               "Sensor.timestamp": "desc"
            },
            "timezone": 'Asia/Kuching'
         },
         "chartType": "number"
      }
   },
   {
      "id": 15,
      "name": "Watering Count Within Last 1 Hour",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.wateringCount"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "dateRange": "from 1 hour ago to now"
               }
            ],
            "order": {
               "Sensor.timestamp": "desc"
            },
            "timezone": 'Asia/Kuching'
         },
         "chartType": "number"
      }
   },
   {
      "id": 16,
      "name": "Soil Moisture",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.averageSoilMoisture"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "granularity": "hour"
               }
            ],
            "timezone": 'Asia/Kuching'
         },
         "chartType": "line"
      }
   },
   {
      "id": 17,
      "name": "Light Intensity",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.averageLightIntensity"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "granularity": "hour"
               }
            ],
            "timezone": 'Asia/Kuching'
         },
         "chartType": "line"
      }
   },
   {
      "id": 18,
      "name": "Ambient Temperature",
      "vizState": {
         "query": {
            "measures": [
               "Sensor.averageAmbientTemperature"
            ],
            "timeDimensions": [
               {
                  "dimension": "Sensor.timestamp",
                  "granularity": "hour"
               }
            ],
            "timezone": 'Asia/Kuching'
         },
         "chartType": "line"
      }
   }
];

/* This function will handles clicking of graph's time axis Button
** and perform nesscessary operation to unsubscribe previous websocket request.
** It will also request for newer request with updated time granularity
** that the user has selected.
*/
function handleClick(wButton, itemname) {
   return function (e) {
      clickCount++;
      console.log("Clicked!: " + wButton + " With Name: " + itemname);
      DashboardItems.forEach(DashboardItem => {
         if (DashboardItem.name === itemname && DashboardItem.vizState.chartType === 'line') {
            WebSocketUnsubscribe(DashboardItem.id);
            DashboardItem.id = 18 + clickCount;
            DashboardItem.vizState.query.timeDimensions[0].granularity = wButton;
            console.log(DashboardItem.id);
            console.log(DashboardItem.vizState.query.timeDimensions[0].granularity);
         }
      });
   };
};

//Dashboard elements are defined and added here.
var DashboardPage = () => {
   var dashboardItem = item => (
      <Grid item xs={12} lg={6} key={item.id}>
         <DashboardItem title={item.name}>
            <ChartRenderer vizState={item.vizState} />
            {item.vizState.chartType === "line" &&
               <CardActions>
                  <Button variant="contained" size="medium" color="primary" onClick={handleClick(mButton, item.name)}>Every Minute</Button>
                  <Button variant="contained" size="medium" color="primary" onClick={handleClick(hButton, item.name)}>Hourly</Button>
                  <Button variant="contained" size="medium" color="primary" onClick={handleClick(dButton, item.name)}>Daily</Button>
               </CardActions>
            }
         </DashboardItem>
      </Grid>
   );

   const Empty = () => (
      <div
         style={{
            textAlign: "center",
            padding: 12
         }}
      >
         <Typography variant="h5" color="inherit">
            There are no charts on this dashboard. Use Playground Build to add one.
      </Typography>
      </div>
   );

   return DashboardItems.length ? (
      <ThemeProvider theme={theme}>
         <Dashboard>{DashboardItems.map(dashboardItem)}</Dashboard>
      </ThemeProvider>
   ) : (
         <Empty />
      );
};
export default DashboardPage;
