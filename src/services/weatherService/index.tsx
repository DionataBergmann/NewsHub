import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY; 
const forecastUrl = process.env.NEXT_PUBLIC_WEATHER_API_URL;

if (!forecastUrl) {
  throw new Error('Weather API URL is not defined');
}

export const getWeatherForecastByCity = async (city: string) => {
  try {
    const response = await axios.get(forecastUrl, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
        lang: 'us',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching 5-day forecast', error);
    throw error;
  }
};