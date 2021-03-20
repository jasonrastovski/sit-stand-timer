import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Grid,
  Typography,
  LinearProgress,
  IconButton,
  Switch,
  Tooltip,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import CloseIcon from "@material-ui/icons/Close";
import { Timer } from "../modules/timer";
import { TimeUtils } from "../timeUtils";
import { TIMER_TRACKER, TimerTracking } from "./models";
import _ from "lodash";
import { TodayStats } from "../modules/todayStats";
import { LocalStorageUtils } from "../utils/localStorageUtils";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import UIfx from "uifx";

const Default_Timer_Value_In_Seconds = 1500;

export const MainPage: React.FunctionComponent = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeftOnTimerInSeconds, setTimeLeftOnTimerInSeconds] = useState(
    Default_Timer_Value_In_Seconds
  );
  const [percentComplete, setPercentComplete] = React.useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [isStanding, setIsStanding] = React.useState(true);

  useEffect(() => {
    window.onbeforeunload = () => {
      return "are you sure you want to leave?";
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  useEffect(() => {
    if (timeLeftOnTimerInSeconds === 0) {
      const bell = new UIfx(
        "https://freesound.org/data/previews/258/258179_4486188-lq.mp3",
        {
          volume: 0.8, // number between 0.0 ~ 1.0
          throttleMs: 100,
        }
      );

      bell.play();

      setIsTimerRunning(false);

      const existingTimeTrackings = LocalStorageUtils.getTimeTracking();
      const timeTrackingForToday = LocalStorageUtils.getTimeTrackingForToday(
        existingTimeTrackings
      );

      const updatedTimeTrackings = _.unionBy(
        [
          {
            date: new Date().toDateString(),
            sittingTimerCount:
              (timeTrackingForToday?.sittingTimerCount ?? 0) +
              (!isStanding ? 1 : 0),
            standingTimerCount:
              (timeTrackingForToday?.standingTimerCount ?? 0) +
              (isStanding ? 1 : 0),
          } as TimerTracking,
        ],
        existingTimeTrackings,
        "date"
      );

      localStorage.setItem(TIMER_TRACKER, JSON.stringify(updatedTimeTrackings));
    }
  }, [timeLeftOnTimerInSeconds, isStanding]);

  const resetMostThings = () => {
    setIsNotificationOpen(false);
    setTimeLeftOnTimerInSeconds(Default_Timer_Value_In_Seconds);
    setPercentComplete(0);
    document.title = "Sit/Stand Timer";
  };

  const startTimer = () => {
    if (timeLeftOnTimerInSeconds === 0) {
      resetMostThings();
    }

    setIsTimerRunning(true);
  };

  const resetTimer = () => {
    setIsNotificationOpen(false);
    resetMostThings();
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsStanding(event.target.checked);
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
          <Grid item>
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>
                <Tooltip title="sitting" placement="left">
                  <AirlineSeatReclineNormalIcon
                    color={isStanding ? "disabled" : "action"}
                  />
                </Tooltip>
              </Grid>
              <Grid item>
                <Switch
                  checked={isStanding}
                  onChange={handleChange}
                  name="isStanding"
                />
              </Grid>
              <Grid item>
                <Tooltip title="standing" placement="right">
                  <AccessibilityIcon
                    color={isStanding ? "action" : "disabled"}
                  />
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
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
          <Grid item>
            <TodayStats />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
