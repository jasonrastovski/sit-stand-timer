import { TimerTracking, TIMER_TRACKER } from "../pages/models";
import { startOfWeek, endOfWeek, subWeeks } from "date-fns";

export class LocalStorageUtils {
  static getTimeTrackingForToday = (
    existingTimeTrackings: Array<TimerTracking> | null = null
  ) => {
    if (existingTimeTrackings === null) {
      existingTimeTrackings = LocalStorageUtils.getTimeTracking();
    }
    return existingTimeTrackings.find(
      (timerTracking) => timerTracking.date === new Date().toDateString()
    );
  };

  static getTimeTrackingForLastXWeeks = (
    lastXWeeks: number
  ): Array<TimerTracking> => {
    const allTimeTracking = LocalStorageUtils.getTimeTracking();

    let returnValue: Array<TimerTracking> = [];

    for (var _i = 0; _i < lastXWeeks; _i++) {
      const start = startOfWeek(subWeeks(new Date(), _i));
      const end = endOfWeek(subWeeks(new Date(), _i));

      returnValue.push(
        allTimeTracking
          .filter(
            (timeTracking) =>
              new Date(timeTracking.date) >= start &&
              new Date(timeTracking.date) <= end
          )
          .reduce(
            (accumulator, currentValue) => {
              accumulator.date = startOfWeek(
                new Date(currentValue.date)
              ).toDateString();
              accumulator.sittingTimerCount += currentValue.sittingTimerCount;
              accumulator.standingTimerCount += currentValue.standingTimerCount;
              return accumulator;
            },
            { date: "", sittingTimerCount: 0, standingTimerCount: 0 }
          )
      );
    }

    return returnValue;
  };

  static getTimeTracking = () => {
    let existingTimeTrackings = new Array<TimerTracking>();

    const timerTrackingObj = localStorage.getItem(TIMER_TRACKER);
    if (timerTrackingObj) {
      existingTimeTrackings = JSON.parse(timerTrackingObj);
    }

    return existingTimeTrackings;
  };
}
