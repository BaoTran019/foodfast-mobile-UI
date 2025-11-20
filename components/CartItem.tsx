import { images } from "@/constants";
import temp_img from "@/public/menu/chickens/combo_1_mieng_ga_gion.jpg";
import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CartItem = ({ item }: { item: CartItemType }) => {
  const { increaseQty, decreaseQty, removeItem } = useCartStore();
  console.log("IMG:", item.image);

  const userId = 1

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={temp_img}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{`${item.price.toLocaleString("vi-VN")}đ`}</Text>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              onPress={async () => await decreaseQty(item.id)}
              style={styles.actionBtn}
            >
              <Image
                source={images.minus}
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Text style={styles.quantity}>{item.quantity}</Text>

            <TouchableOpacity
              onPress={async () => await increaseQty(item.id)}
              style={styles.actionBtn}
            >
              <Image
                source={images.plus}
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={async () => await removeItem(item.id)}
        style={styles.removeBtn}
      >
        <Image source={images.trash} style={styles.trashIcon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
    color: "#1F1F1F",
  },
  price: {
    fontWeight: "600",
    fontSize: 14,
    color: "#FE8C00",
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 8,
  },
  actionBtn: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#FFE7C4",
  },
  actionIcon: {
    width: 16,
    height: 16,
    tintColor: "#FF9C01",
  },
  quantity: {
    fontWeight: "700",
    fontSize: 16,
    color: "#1F1F1F",
  },
  removeBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  trashIcon: {
    width: 24,
    height: 24,
  },
});

export default CartItem;
