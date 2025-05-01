export const formatTime = (date: Date) =>
  date.toLocaleTimeString(["ua-UA"], {
    hour: "2-digit",
    minute: "2-digit"
  });
