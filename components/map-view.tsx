import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Text } from './ui/text';

interface Location {
  latitude: number;
  longitude: number;
  title: string;
  description?: string;
}

interface MapComponentProps {
  locations: Location[];
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

export function MapComponent({
  locations,
  initialRegion = {
    latitude: 24.7136,
    longitude: 46.6753,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
}: MapComponentProps) {
  return (
    <View className="h-64 w-full rounded-lg overflow-hidden">
      <MapView
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        className="w-full h-full">
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
            description={location.description}
          />
        ))}
      </MapView>
    </View>
  );
}
