import type { forcastData } from "@/api/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForcastProps {
  data: forcastData;
}
interface DailyForcast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}
const WeatherForcast = ({ data }: WeatherForcastProps) => {
  const dailyForcast = data.list.reduce((acc, forcast) => {
    const date = format(new Date(forcast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forcast.main.temp_min,
        temp_max: forcast.main.temp_max,
        wind: forcast.wind.speed,
        humidity: forcast.main.humidity,
        weather: forcast.weather[0],
        date: forcast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(
        (acc[date].temp_min, forcast.main.temp_min)
      );
      acc[date].temp_max = Math.max(
        (acc[date].temp_max, forcast.main.temp_max)
      );
    }
    return acc;
  }, {} as Record<string, DailyForcast>);
  const nextDays = Object.values(dailyForcast).slice(0, 5);

  const formateTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Forcast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day) => {
            return (
              <div
                key={day.date}
                className="grid p-4 grid-cols-3 items-center rounded-lg border gap-4"
              >
                <div className="flex flex-col ">
                  <p className="font-medium">
                    {format(new Date(day.date * 1000), "EEE ,MMM d")}
                  </p>
                  <p className="text-sm capitalize text-muted-foreground">
                    {day.weather.description}
                  </p>
                </div>

                <div className="flex gap-2 text-sm font-medium">
                  <span className="flex gap-1 items-center text-blue-500">
                    <ArrowDown className="h-3 w-3" />
                    {formateTemp(day.temp_min)}
                  </span>

                  <span className="flex gap-1 items-center text-red-500">
                    <ArrowUp className="h-3 w-3" />
                    {formateTemp(day.temp_max)}
                  </span>
                </div>

                <div className="flex items-end  gap-4">
                  <div className="flex items-center gap-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">
                      {day.humidity}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wind className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">
                      {day.wind} m/s
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForcast;
