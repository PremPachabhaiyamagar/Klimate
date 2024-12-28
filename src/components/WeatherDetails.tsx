import type { WeatherData } from "@/api/type";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { format } from "date-fns";
interface WeatherDetailsprops {
  data: WeatherData;
}
const WeatherDetails = ({ data }: WeatherDetailsprops) => {
  console.log(data);
  const { sys, wind, main } = data;

  const getWindDirection = (degree: number) => {
    const direction = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return direction[index];
  };

  const formateTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  const details = [
    {
      title: "Sunrise",
      value: formateTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formateTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg})°`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((item) => {
            return (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-lg border p-4"
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <div>
                  <p className="text-sm font-medium leading-none">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
