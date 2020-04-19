import { TimerTracking, TIMER_TRACKER } from "../pages/models";

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

  static getTimeTracking = () => {
    let existingTimeTrackings = new Array<TimerTracking>();

    const timerTrackingObj = localStorage.getItem(TIMER_TRACKER);
    if (timerTrackingObj) {
      existingTimeTrackings = JSON.parse(timerTrackingObj);
    }

    return existingTimeTrackings;
  };
}
