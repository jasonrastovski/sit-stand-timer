import * as React from "react";
import { LocalStorageUtils } from "../utils/localStorageUtils";
import { Typography } from "@material-ui/core";

export const TodayStats: React.FunctionComponent = () => {
  const timeTrackingForToday = LocalStorageUtils.getTimeTrackingForToday();

  if (timeTrackingForToday !== undefined) {
    return (
      <>
        <Typography variant={"body2"}>
          Number of times sitting today:{" "}
          {timeTrackingForToday.sittingTimerCount}
        </Typography>
        <Typography variant={"body2"}>
          Number of times standing today:{" "}
          {timeTrackingForToday.standingTimerCount}
        </Typography>
      </>
    );
  }

  return (
    <Typography variant={"body2"}>there are no stats for today.</Typography>
  );
};
