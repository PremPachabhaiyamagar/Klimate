import { useQuery } from "@tanstack/react-query";
import { Coordinates } from "../type";
import { weatherAPI } from "../weather";
export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
  search: (query: string) => ["search-location", query] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates,
  });
}
export function useForcastQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherAPI.getForcast(coordinates) : null),
    enabled: !!coordinates,
  });
}
export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
    enabled: !!coordinates,
  });
}
export function useSeachrLocation(query: string) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => (query ? weatherAPI.locationSearch(query) : null),
    enabled: query.length >= 3,
  });
}
