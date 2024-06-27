import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../../ui/colors';

interface CustomerLoadingProps {
  visible: boolean;
}

const CustomLoading = ({ visible }: CustomerLoadingProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(visible);
  }, [visible]);

  if (!isLoading) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={colors.purple} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomLoading;