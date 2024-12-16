import { useGeolocation } from "@/api/hooks/useGeolocation";
import {
  useForcastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/api/hooks/useWeather";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import { WeatherSkeleton } from "@/components/WeatherSkeleton";
import CurrentWeather from "@/components/CurrentWeather";

const DashBoard = () => {
  const {
    coordinates,
    getLocation,
    isLoading: locationLoading,
    error: locationError,
  } = useGeolocation();
  const locationQuery = useReverseGeocodeQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const forcastQuery = useForcastQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forcastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (locationLoading) {
    return <WeatherSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex gap-4 flex-col">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex gap-4 flex-col">
          <p>Please Enable Location access to see you Weather</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  if (forcastQuery.error || weatherQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle> Error</AlertTitle>
        <AlertDescription className="flex gap-4 flex-col">
          <p>Unable to fetch Weather Data, please try again later</p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!forcastQuery.data || !weatherQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Favourite cities */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forcastQuery.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>

      <div className="grid gap-6">
        <div>
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          {/* Hourly Temperatur */}
        </div>
        <div>
          {/* details  */}
          {/* forcasts */}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
