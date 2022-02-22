import React from "react";

interface ITimer {
  /**
   * Reference Date that the timer will take to
   * count ellapsed time. If no date is given,
   * it will fallback to new Date()
   */
  startDate?: Date;
}

type Time = {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  months: number;
};
//@todo add year implementation and test this hook for every corner case
export default function useTimer({ startDate = new Date() }: ITimer): Time {
  const [time, setTime] = React.useState<Time>({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    months: 0,
  });
  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let diff = (now.getTime() - startDate.getTime()) / 1000; //diff in seconds
      const seconds = Math.floor(diff % 60);
      diff = Math.floor(diff / 60);
      const minutes = diff % 60;
      diff = Math.floor(diff / 60);
      const hours = diff % 24;
      diff = Math.floor(diff / 24);
      const days = diff;
      const months = Math.floor(
        (now.getTime() - startDate.getTime()) / 2.628e9
      );
      setTime((prev) => ({ ...prev, seconds, minutes, hours, days, months }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
}
