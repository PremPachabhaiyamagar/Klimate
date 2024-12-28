import type { forcastData } from "@/api/type";

interface WeatherForcastProps {
  data: forcastData;
}
const WeatherForcast = ({ data }: WeatherForcastProps) => {
  return <div>Weather Forcast</div>;
};

export default WeatherForcast;
