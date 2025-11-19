import { images } from "@/constants";
import { TabBarIconProps } from "@/type";
import { Tabs } from "expo-router";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={icon}
        style={[styles.icon, { tintColor: focused ? "#FE8C00" : "#5D5F6D" }]}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.iconLabel,
          { color: focused ? "#FE8C00" : "#878787" },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBar,
          Platform.OS === "web" ? styles.webShadow : styles.nativeShadow,
        ],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Home" icon={images.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Search" icon={images.search} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Cart" icon={images.bag} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Profile" icon={images.person} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Orders" icon={images.person} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 40,
    marginHorizontal: 20,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around", // chia đều các icon
    alignItems: "center", // căn giữa theo chiều dọc
    paddingHorizontal: 10, // khoảng cách 2 bên
  },
  nativeShadow: {
    shadowColor: "#1a1a1a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  webShadow: {
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center", // căn giữa theo chiều dọc
    alignItems: "center",
  },
  icon: {
    width: 28,
    height: 28,
  },
  iconLabel: {
    fontSize: 9,
    fontWeight: "700",
    marginTop: 2,
    textAlign: "center",
  },
});
