import { useEffect, useState } from "react";
import { getLocationByCity } from "../services/weather.service";
import { AutocompleteOptions } from "../types/weather";
import { isAxiosError } from "axios";

export function useLocation(city: string) {
  const [options, setOptions] = useState<AutocompleteOptions[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateOptions = (options: AutocompleteOptions[]) => setOptions(options);

  useEffect(() => {
    const getLocations = async () => {
      setLoading(true);
      try {
        const responseLocation = await getLocationByCity(
          city.replace(" ", "+")
        );
        if (responseLocation) {
          const arrOptions = responseLocation.map((loc) => {
            return {
              label: `${loc.name} - ${loc.region} - ${loc.country}`,
              url: loc.url,
              id: loc.id,
            };
          });
          setOptions(arrOptions);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          setErrorMessage(error.message);
        }
      }
      setLoading(false);
    };
    if (city) {
      getLocations();
    }
  }, [city]);

  return { options, loading, errorMessage, updateOptions };
}
