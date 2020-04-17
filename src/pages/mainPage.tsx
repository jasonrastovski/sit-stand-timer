import React, { useState, useEffect } from "react";
import { Container, Button, Grid } from "@material-ui/core";
import { useInterval } from "../hooks/useInterval";

const Default_Timer_Value_In_Minutes = 0.1;

export const MainPage: React.FunctionComponent = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeftOnTimerInSeconds, setTimeLeftOnTimerInSeconds] = useState(
    Default_Timer_Value_In_Minutes * 60
  );

  useEffect(() => {
    askUserPermission();
  }, []);

  useEffect(() => {
    if (timeLeftOnTimerInSeconds === 0) {
      console.log("notifying...");
      notifyMe();
    }
  }, [timeLeftOnTimerInSeconds]);

  useInterval(() => {
    if (isTimerRunning && timeLeftOnTimerInSeconds > 0) {
      console.log("timeLeftOnTimerInSeconds", timeLeftOnTimerInSeconds);
      setTimeLeftOnTimerInSeconds(timeLeftOnTimerInSeconds - 1);
    }
  }, 1000);

  const startTimer = () => {
    if (timeLeftOnTimerInSeconds === 0) {
      setTimeLeftOnTimerInSeconds(Default_Timer_Value_In_Minutes * 60);
    }

    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const getMinutesAndSeconds = () => {
    const minutes = Math.floor(timeLeftOnTimerInSeconds / 60);

    const seconds = timeLeftOnTimerInSeconds - minutes * 60;

    return `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  function askUserPermission() {
    Notification.requestPermission();
    console.log("here");
    var n = new Notification("Title", { body: "I am the body text!" });
  }

  function notifyMe() {
    // Let's check if the browser supports notifications

    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      alert("This browser does not support desktop notification");
    }
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      console.log("we doing");
      var notification = new Notification("Hi there!");
    }
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Hi there!");
        }
      });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
  }

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12}>
          Sit/Stand Timer
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            disabled={isTimerRunning}
            onClick={startTimer}
          >
            Start Timer
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disabled={!isTimerRunning}
            onClick={stopTimer}
          >
            Stop Timer
          </Button>
        </Grid>
        <Grid item xs={6}>
          {getMinutesAndSeconds()}
        </Grid>
      </Grid>
    </Container>
  );
};
