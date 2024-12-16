import type { GeocodeResponse, WeatherData } from "@/api/type";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
interface currentWeatherProps {
  data: WeatherData;
  locationName?: GeocodeResponse;
}

const CurrentWeather = ({ data, locationName }: currentWeatherProps) => {
  const {
    weather: [CurrentWeather],
    main: { temp, temp_min, temp_max, humidity, feels_like },
    wind: { speed },
  } = data;
  const formateTemp = (temp: number) => `${Math.round(temp)}°`;
  return (
    <div>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold tracking-tighter">
                    {locationName?.name}
                  </h2>

                  {locationName?.state && (
                    <span className="text-sm text-muted-foreground">
                      ,{locationName.state}
                    </span>
                  )}
                </div>

                <p className=" text-sm text-muted-foreground">
                  {locationName?.country}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-7xl font-bold tracking-tighter">
                  {formateTemp(temp)}
                </p>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Feels like {formateTemp(feels_like)}
                  </p>

                  <div className="flex gap-2 text-sm font-medium">
                    <span className="flex gap-1 items-center text-blue-500">
                      <ArrowDown className="h-3 w-3" />
                      {formateTemp(temp_min)}
                    </span>

                    <span className="flex gap-1 items-center text-red-500">
                      <ArrowUp className="h-3 w-3" />
                      {formateTemp(temp_max)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* humidity */}
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <div className="space-y-0.5">
                    <p className="text-sm text-medium text-muted-foreground">
                      Humidity
                    </p>
                    <p className="text-sm text-muted-foreground">{humidity}%</p>
                  </div>
                </div>

                {/* wind */}
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <div className="space-y-0.5">
                    <p className="text-sm text-medium text-muted-foreground">
                      Wind Seed
                    </p>
                    <p className="text-sm text-muted-foreground">{speed} m/s</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col">
              <div className="flex items-center justify-center relative w-full max-w-[200px] aspect-square">
                <img
                  src={`https://openweathermap.org/img/wn/${CurrentWeather.icon}@4x.png`}
                  alt={CurrentWeather.description}
                  className="h-full w-full object-contain"
                />
                <div className="absolute bottom-0 text-center">
                  <p className="text-sm capitalize font-medium">
                    {CurrentWeather.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentWeather;
