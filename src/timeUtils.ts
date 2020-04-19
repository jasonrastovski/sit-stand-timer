export class TimeUtils {
  static getMinutesAndSeconds = (timeLeftOnTimerInSeconds: number) => {
    const minutes = Math.floor(timeLeftOnTimerInSeconds / 60);

    const seconds = timeLeftOnTimerInSeconds - minutes * 60;

    return `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
}
