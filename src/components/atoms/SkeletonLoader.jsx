import React, { useEffect } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSpring
} from "react-native-reanimated";

const SkeletonLoader = ({ style, children }) => {
  const progress = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.8), -1, true);
  }, []);

  return (
    <Animated.View style={[style, reanimatedStyle]}>{children}</Animated.View>
  );
};

export default SkeletonLoader;