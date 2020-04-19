import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Grid,
  Typography,
  LinearProgress,
  IconButton,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import CloseIcon from "@material-ui/icons/Close";
import { Timer } from "../modules/timer";
import { TimeUtils } from "../timeUtils";

const Default_Timer_Value_In_Seconds = 5;

export const MainPage: React.FunctionComponent = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeftOnTimerInSeconds, setTimeLeftOnTimerInSeconds] = useState(
    Default_Timer_Value_In_Seconds
  );
  const [percentComplete, setPercentComplete] = React.useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);

  useEffect(() => {
    if (timeLeftOnTimerInSeconds === 0) {
      console.log("notifying...");
      // TODO: (JR) time to make a sound!

      setIsTimerRunning(false);
    }
  }, [timeLeftOnTimerInSeconds]);

  const startTimer = () => {
    setIsNotificationOpen(false);
    if (timeLeftOnTimerInSeconds === 0) {
      setTimeLeftOnTimerInSeconds(Default_Timer_Value_In_Seconds);
      setPercentComplete(0);
    }

    setIsTimerRunning(true);
  };

  const resetTimer = () => {
    setIsNotificationOpen(false);
    setTimeLeftOnTimerInSeconds(Default_Timer_Value_In_Seconds);
    setPercentComplete(0);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  return (
    <Container maxWidth="sm" className={"sit-stand-container"}>
      {isTimerRunning && (
        <Timer
          isTimerRunning={isTimerRunning}
          timeLeftOnTimerInSeconds={timeLeftOnTimerInSeconds}
          defaultTimeValueInSeconds={Default_Timer_Value_In_Seconds}
          setTimeLeftOnTimerInSeconds={setTimeLeftOnTimerInSeconds}
          setIsNotificationOpen={setIsNotificationOpen}
          setPercentComplete={setPercentComplete}
        />
      )}

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        {isNotificationOpen && (
          <Grid item xs={12}>
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setIsNotificationOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>Timer Complete!</AlertTitle>
              Congrats!
            </Alert>
          </Grid>
        )}
        <Grid item>
          <Typography variant={"h5"}>Sit/Stand Timer</Typography>
        </Grid>
        <Grid
          container
          spacing={2}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item container spacing={2} justify={"center"}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disabled={isTimerRunning}
                onClick={startTimer}
              >
                Start
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                disabled={isTimerRunning}
                onClick={resetTimer}
              >
                Reset
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                disabled={!isTimerRunning}
                onClick={stopTimer}
              >
                Stop
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant={"h1"}>
              {TimeUtils.getMinutesAndSeconds(timeLeftOnTimerInSeconds)}
            </Typography>
            <LinearProgress variant="determinate" value={percentComplete} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
