import React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

export interface CustomButtonProps {
  onPress?: () => void;
  title?: string;
  style?: StyleProp<ViewStyle>;    // <- sửa ở đây
  textStyle?: StyleProp<TextStyle>; // <- sửa ở đây
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
}

const CustomButton = ({
  onPress,
  title = "Click Me",
  style,
  textStyle,
  leftIcon,
  isLoading = false
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={[styles.text, textStyle]}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FE8C00",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  leftIcon: {
    marginRight: 8,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default CustomButton;
