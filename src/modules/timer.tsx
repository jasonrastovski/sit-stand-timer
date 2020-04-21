import * as React from "react";
import { useInterval } from "../hooks/useInterval";
import { TimeUtils } from "../timeUtils";

interface TimerProps {
  isTimerRunning: boolean;
  timeLeftOnTimerInSeconds: number;
  defaultTimeValueInSeconds: number;

  setTimeLeftOnTimerInSeconds: (timeLeftOnTimerInSeconds: number) => void;
  setIsNotificationOpen: (isOpen: boolean) => void;
  setPercentComplete: (percentComplete: number) => void;
}

export const Timer = (props: TimerProps) => {
  const {
    isTimerRunning,
    timeLeftOnTimerInSeconds,
    defaultTimeValueInSeconds,
    setTimeLeftOnTimerInSeconds,
    setIsNotificationOpen,
    setPercentComplete,
  } = props;

  useInterval(() => {
    if (isTimerRunning && timeLeftOnTimerInSeconds > 0) {
      setTimeLeftOnTimerInSeconds(timeLeftOnTimerInSeconds - 1);
    }

    const actualTimeLeft = isTimerRunning
      ? timeLeftOnTimerInSeconds - 1
      : timeLeftOnTimerInSeconds;

    document.title =
      actualTimeLeft === 0
        ? "Complete!"
        : TimeUtils.getMinutesAndSeconds(actualTimeLeft);

    const percentComplete =
      100 *
      ((defaultTimeValueInSeconds - actualTimeLeft) /
        defaultTimeValueInSeconds);

    if (percentComplete === 100) {
      setIsNotificationOpen(true);
    }
    setPercentComplete(percentComplete);
  }, 1000);

  return null;
};
