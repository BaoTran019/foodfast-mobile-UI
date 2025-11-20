import { getMenu } from "@/lib/getMenu";
import { getOrders } from "@/lib/getOrders";
import temp_img from "@/public/menu/chickens/combo_1_mieng_ga_gion.jpg";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const OrderDetail = () => {
  const params = useLocalSearchParams<{ orderId: string }>();
  const orderId = Number(params.orderId);
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const [orders, menu] = await Promise.all([
          getOrders(),
          getMenu()       
        ]);
        const currentOrder = orders.find(o => o.orderId === orderId);
        if (currentOrder) {
          setOrder(currentOrder);
          setItems(
            currentOrder.orderItems.map((i: any) => ({
              ...i,
              food: menu.find(f => f.id === i.productId)
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Order not found</Text>
        </View>
      </SafeAreaView>
    );
  }
  const DELIVERY_FEE = 15000;
  const subtotal = (price: number, quantity: number) => price * quantity;
  const total = order.totalPrice + DELIVERY_FEE;

  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items in this order</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.itemId}
          contentContainerStyle={{ padding: 20 }}
          ListHeaderComponent={() => (

            <>
              {/* Nút quay lại */}
              <Text style={styles.backButton} onPress={() => router.back()}>
                ← Back
              </Text>

              <View style={styles.headerBox}>

                <Text style={styles.headerText}>Order #{order.orderId}</Text>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Customer:</Text>
                  <Text style={styles.infoValue}>{order.recipientName}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Phone:</Text>
                  <Text style={styles.infoValue}>{order.recipientPhone}</Text>
                </View>

                {order.address && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Address:</Text>
                    <Text style={styles.infoValue}>{order.address}</Text>
                  </View>
                )}
              </View>
            </>
          )}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={temp_img}
                style={styles.image}
                resizeMode="contain"
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.name}>{item.productName}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <Text>Price: {(item.price || 0).toLocaleString("vi-VN")}đ</Text>
                <Text>Subtotal: {subtotal(item.price, item.quantity).toLocaleString("vi-VN")}đ</Text>
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={styles.footerBox}>
              <View style={styles.footerRow}>
                <Text style={styles.footerLabel}>Items total:</Text>
                <Text style={styles.footerValue}>
                  {order.totalPrice.toLocaleString("vi-VN")}đ
                </Text>
              </View>

              <View style={styles.footerRow}>
                <Text style={styles.footerLabel}>Delivery fee:</Text>
                <Text style={styles.footerValue}>
                  {DELIVERY_FEE.toLocaleString("vi-VN")}đ
                </Text>
              </View>

              <View style={styles.footerRowTotal}>
                <Text style={styles.footerLabelTotal}>Total:</Text>
                <Text style={styles.footerValueTotal}>
                  {total.toLocaleString("vi-VN")}đ
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: "#878787" },
  headerText: { fontWeight: "700", fontSize: 18, marginBottom: 8 },
  card: { flexDirection: "row", marginBottom: 16, backgroundColor: "#f8f8f8", padding: 12, borderRadius: 12 },
  image: { width: 80, height: 80, borderRadius: 8 },
  name: { fontWeight: "600", fontSize: 16, marginBottom: 4 },
  feeText: { fontWeight: "500", fontSize: 14 },

  headerBox: {
    backgroundColor: "#f2f6ff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d6e4ff",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  infoLabel: {
    width: 80,
    fontWeight: "600",
    color: "#555",
  },
  infoValue: {
    flex: 1,
    color: "#222",
    fontSize: 15,
  },

  footerBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
  },

  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  footerRowTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 12,
  },

  footerLabel: {
    fontSize: 15,
    color: "#555",
  },

  footerValue: {
    fontSize: 15,
    fontWeight: "600",
  },

  footerLabelTotal: {
    fontSize: 17,
    fontWeight: "700",
  },

  footerValueTotal: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2a59d1",
  },

  backButton: {
    fontSize: 16,
    marginBottom: 8,
    color: "#2a59d1",
    fontWeight: "600",
  },


});

export default OrderDetail;
