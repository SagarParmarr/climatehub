// Utility functions for formatting date and time

export function formatTime(dt: number, offset: number): string {
  // dt and offset are in seconds
  const date = new Date((dt + offset) * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatDay(dt: number, offset: number): string {
  const date = new Date((dt + offset) * 1000);
  return date.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function transformOneCallWeatherData(data: any): any {
  if (!data || !data.current) return data;
  const localOffset = new Date().getTimezoneOffset() * 60000;
  data.currentTime =
    data.current.dt * 1000 + localOffset + 1000 * data.timezone_offset;
  if (Array.isArray(data.hourly)) {
    data.hourly.forEach((hour: any) => {
      hour.currentTime =
        hour.dt * 1000 + localOffset + 1000 * data.timezone_offset;
    });
  }
  return data;
}
