import type { GeocodeResponse, WeatherData } from "@/api/type";
import { Card, CardContent } from "./ui/card";
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
  return (
    <div>
      <Card>
        <CardContent>
          <div>current Weather</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentWeather;
