import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiUrl: 'http://10.0.2.2:8080/api', // Android Emulator
    webApiUrl: 'http://localhost:8080/api', // Web
    iosApiUrl: 'http://localhost:8080/api', // iOS Simulator
  },
  prod: {
    apiUrl: 'https://your-production-api.com/api',
  },
};

const getEnvVars = (env = Constants.expoConfig?.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  }
  return ENV.prod;
};

export default getEnvVars;