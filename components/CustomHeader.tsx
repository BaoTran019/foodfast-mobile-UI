import { images } from "@/constants";
import { CustomHeaderProps } from "@/type";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomHeader = ({ title }: CustomHeaderProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back + Text */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Image
          source={images.arrowBack}
          style={styles.backIcon}
          resizeMode="contain"
        />
        <Text style={styles.backText}>Menu</Text>
      </TouchableOpacity>

      {/* Title in center absolutely */}
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  backButton: {
    alignItems: "center",
    padding: 8,
    zIndex: 10,
  },

  backIcon: {
    width: 20,
    height: 20,
  },

  backText: {
    color: "#9CA3AF", // gray-400
    fontSize: 12,
    marginTop: 4,
  },

  title: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -100 }], // Because translateX needs static number
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
});
