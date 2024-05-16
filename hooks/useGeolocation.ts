import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

interface Location {
  latitude: number;
  longitude: number;
}

const useGeolocation = () => {
  const [location, setLocation] = useState<Location>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
      } catch (error:any) {
        setError(error.message);
      }
    })();
  }, []);

  return [location, error];
};

export default useGeolocation;