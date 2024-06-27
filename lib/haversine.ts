export type LatLng = {
  lat: number | null;
  lng: number | null;
};

export const haversine = (
  userLocation: LatLng,
  storeLocation: LatLng
): number => {
  const R: number = 6371.0;

  // Derece cinsinden koordinatları radyan cinsine dönüştürme
  const toRadians = (degrees: number) => {
    return (degrees * Math.PI) / 180;
  };

  if (
    !userLocation.lat ||
    !userLocation.lng ||
    !storeLocation.lat ||
    !storeLocation.lng
  ) {
    return 0;
  }

  userLocation.lat = toRadians(userLocation.lat);
  userLocation.lng = toRadians(userLocation.lng);
  storeLocation.lat = toRadians(storeLocation.lat);
  storeLocation.lng = toRadians(storeLocation.lng);

  // Haversine formülü
  const dLat: number = storeLocation.lat - userLocation.lat;
  const dLon: number = storeLocation.lng - userLocation.lng;
  const a: number =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(userLocation.lat) *
      Math.cos(storeLocation.lat) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance: number = R * c;

  return distance;
};
