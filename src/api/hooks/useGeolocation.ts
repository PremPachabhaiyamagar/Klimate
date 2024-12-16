import { useEffect, useState } from "react";
import { Coordinates } from "../type";
interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: Boolean;
}
export function useGeolocation() {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: false,
  });

  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Geo Location is not Supported by your browser",
        isLoading: false,
      });
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location Permission Denied,Please Enable location access";
            break;

          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location Information Unavailable";
            break;

          case error.TIMEOUT:
            errorMessage = " Location request timeout";
            break;

          default:
            errorMessage = "An Unknown Error has Occured";
        }
        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };
  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
}
