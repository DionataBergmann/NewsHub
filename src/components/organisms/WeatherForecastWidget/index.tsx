import { getWeatherForecastByCity } from '@/services/weatherService';
import { Box, Text, VStack, Image, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface WeatherForecast {
  list: {
    dt: number;
    main: {
      temp_min: number;
      temp_max: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
}

const WeatherForecastWidget = () => {
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const forecastData = await getWeatherForecastByCity('New York');
        setForecast(forecastData);
      } catch (error) {
        console.error('Error fetching 5-day forecast', error);
      }
    };

    fetchWeather();
  }, []);

  const getDayLabel = (timestamp: number, index: number): string => {
    const date = new Date(timestamp * 1000);
    const dayOfWeek = daysOfWeek[date.getDay()];
    if (index === 0) return 'Today';
    return dayOfWeek;
  };

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Box w="100%" p={4} bg="white" boxShadow="lg" borderRadius="md" h="100%">
      {forecast ? (
        <HStack spacing={8} justify="space-between">
          {forecast.list.filter((item, index) => index % 8 === 0).map((day, index) => (
            <VStack key={index} spacing={2} align="center">
              <Text fontSize="md" color="gray.600">{getDayLabel(day.dt, index)}</Text>
              <Image
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                boxSize="50px"
              />
              <HStack spacing={1}>
                <Text fontSize="md" color="gray.600">{Math.round(day.main.temp_min)}°</Text>
                <Text fontSize="md" color="gray.600">/</Text>
                <Text fontSize="md" color="gray.500">{Math.round(day.main.temp_max)}°</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                {capitalizeFirstLetter(day.weather[0].description)}
              </Text>
            </VStack>
          ))}
        </HStack>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
};

export default WeatherForecastWidget;
