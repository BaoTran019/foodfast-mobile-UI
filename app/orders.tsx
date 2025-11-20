// app/(tabs)/orders.tsx
import { getOrders } from "@/lib/getOrders";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const statusColors: Record<string, string> = {
  "Pending": "#BA68C8", // tím nhạt
  "Processing": "#FFB74D", // cam nhạt
  "Delivering": "#4FC3F7", // xanh dương
  "ready": "#4DB6AC", // xanh lá mạ
  "Completed": "#81C784", // xanh lá sáng
};

const Orders = () => {
  const params = useLocalSearchParams<{ userId: string }>();
  const userId = String(params.userId);
  const [orders, setOrders] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchUserOrders();
  }, [userId]);

  const DELIVERY_FEE = 15000

  const total = (price: number) => {
    return price + DELIVERY_FEE
  }

  const formatDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};


  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders yet</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.orderId.toString()}
          contentContainerStyle={{ padding: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "../OrderDetail",
                  params: { orderId: item.orderId.toString() },
                })
              }
              style={styles.card}
            >
              <View style={styles.card}>
                <View style={styles.row}>
                  <Text style={styles.title}>Order #{item.orderId}</Text>
                  <Text
                    style={[
                      styles.status,
                      { backgroundColor: statusColors[item.status] || "#BDBDBD" },
                    ]}
                  >
                    {item.status.replace("-", " ").toUpperCase()}
                  </Text>
                </View>
                <Text>Total: {total(item.totalPrice).toLocaleString("vi-VN")}đ</Text>
                <Text>Payment: {item.paymentMethod}</Text>
                <Text>Date: {formatDate(item.orderDate)}</Text>
              </View>
            </TouchableOpacity>
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
  card: {
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: { fontWeight: "600", fontSize: 16 },
  status: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
    textTransform: "capitalize",
  },

  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 5,
    width: "100%",
  },

  backText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2a59d1",
  },

});

export default Orders;
