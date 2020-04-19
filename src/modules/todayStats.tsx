import * as React from "react";
import { LocalStorageUtils } from "../utils/localStorageUtils";
import { Typography } from "@material-ui/core";

export const TodayStats: React.FunctionComponent = () => {
  const timeTrackingForToday = LocalStorageUtils.getTimeTrackingForToday();

  if (timeTrackingForToday !== undefined) {
    return (
      <Typography variant={"body2"}>
        Numer of times timer has hit zero: {timeTrackingForToday.timerCount}
      </Typography>
    );
  }

  return (
    <Typography variant={"body2"}>there are no stats for today.</Typography>
  );
};
