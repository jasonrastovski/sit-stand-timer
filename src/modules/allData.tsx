import * as React from "react";
import { LocalStorageUtils } from "../utils/localStorageUtils";

export const AllData = () => {
  const timeTracking = LocalStorageUtils.getTimeTrackingForLastXWeeks(52);

  return (
    <div>
      {timeTracking.map((timeTracker, index) => {
        if (
          timeTracker.sittingTimerCount === 0 &&
          timeTracker.standingTimerCount === 0
        ) {
          return null;
        }
        return (
          <div key={index}>
            <hr />
            <span>Week Starting : {timeTracker.date} </span>
            <br />
            <span>Sitting Count : {timeTracker.sittingTimerCount}</span>
            <br />
            <span>Standing Count : {timeTracker.standingTimerCount}</span>
            <br />
          </div>
        );
      })}
    </div>
  );
};
