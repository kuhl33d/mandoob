import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const deviceColorScheme = useDeviceColorScheme();
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    // Sync with device theme on mount and theme changes
    setColorScheme(deviceColorScheme);
  }, [deviceColorScheme]);

  return <>{children}</>;
}
