import cn from "clsx";
import { Fragment } from "react";
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import useAuthStore from "@/store/auth.store";

import { router } from "expo-router";

import logo from "../../assets/ffIcon.png";


export default function Index() {
  const { user } = useAuthStore();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;

          return (
            <View style={{ marginBottom: 20 }}>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven ? "flex-row-reverse" : "flex-row"
                )}
                style={{
                  backgroundColor: item.color,
                  borderRadius: 20,
                  overflow: "hidden",
                  paddingBlock: 20,
                  paddingInline: 5,
                  flexDirection: isEven ? "row-reverse" : "row",
                  alignItems: "center",
                }}
                android_ripple={
                  Platform.OS === "android"
                    ? { color: "rgba(255,255,255,0.2)" }
                    : undefined
                }
                onPress={() => router.push({
                  pathname: "/(tabs)/search",
                  params: { category: item.category }
                })}
              >
                <Fragment>
                  {/* IMAGE BLOCK */}
                  <View style={{ width: "50%", height: 140 }}>
                    <Image
                      source={item.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        transform: [{ scale: 1.25 }],
                      }}
                      resizeMode="contain"
                    />
                  </View>

                  {/* TEXT BLOCK */}
                  <View
                    style={{
                      width: "50%",
                      paddingLeft: isEven ? 30 : 0,
                      paddingRight: !isEven ? 30 : 0,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 25,
                        fontWeight: "800",
                        lineHeight: 36,
                      }}
                    >
                      {item.title}
                    </Text>

                    <Image
                      source={images.arrowRight}
                      style={{
                        width: 40,
                        height: 40,
                        tintColor: "#fff",
                        marginTop: 10,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                </Fragment>
              </Pressable>
            </View>
          );
        }}
        contentContainerStyle={{
          paddingBottom: 112,
          paddingHorizontal: 20,
        }}
        ListHeaderComponent={() => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginVertical: 20,
            }}
          >
            <View>
              <Image
                source={logo}         // dùng source chứ không phải src
                style={{ width: 60, height: 60 }} // đặt kích thước
                resizeMode="contain">
              </Image>
            </View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: "700", color: "#FE8C00" }}>
                DELIVER TO
              </Text>

              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#1a1a1a" }}>
                  Quận 5, tp.Hồ Chí Minh
                </Text>
                <Image
                  source={images.arrowDown}
                  style={{ width: 12, height: 12 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <CartButton />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
