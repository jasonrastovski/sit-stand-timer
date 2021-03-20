import * as React from "react";
import { LocalStorageUtils } from "../utils/localStorageUtils";

export const AllData = () => {
  const timeTracking = LocalStorageUtils.getTimeTrackingForLastXWeeks(8);

  return (
    <div>
      {timeTracking.map((time) => {
        if (time.sittingTimerCount === 0 && time.standingTimerCount === 0) {
          return null;
        }
        return (
          <div>
            <p>Week Starting : {time.date} </p>
            <p>Sitting Count : {time.sittingTimerCount}</p>
            <p>Standing Count : {time.standingTimerCount}</p>
          </div>
        );
      })}
    </div>
  );
};
