import OrderButton from "@/components/CreateOrderButton";
import { addOrder } from "@/lib/getOrders";
import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PAYMENT_METHODS = ["COD", "VNPAY"] as const;

const CreateOrder = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useAuthStore();

  const [newOrder, setNewOrder] = useState({
    recipientName: user?.fullName || "",
    recipientPhone: user?.phone || "",
    shipping_address: user?.address || "",
    payment_method: "COD" as "COD" | "VNPAY",
  })

  const handleSubmit = async () => {
    if (newOrder.recipientName === "" || newOrder.recipientPhone === "" || newOrder.shipping_address === "") {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    console.log(newOrder)

    try {
      setLoading(true);
      const res = await addOrder(newOrder);
      console.log("Order Created:", res);
      alert("Đơn hàng đã được tạo!");
      router.push("../(tabs)/search");
    } catch (err) {
      console.error(err);
      alert("Tạo đơn hàng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Tạo Đơn Hàng</Text>

      {/* Nút quay lại */}
      <Text style={styles.backButton} onPress={() => router.back()}>
        ← Back
      </Text>

      {/* BOX 1: Customer Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Thông tin người nhận</Text>

        <Text style={styles.label}>Tên người nhận</Text>
        <TextInput
          style={styles.input}
          placeholder="Ví dụ: Nguyễn Văn A"
          placeholderTextColor="#9CA3AF"
          value={newOrder.recipientName}
          onChangeText={(text) =>
            setNewOrder((prev) => ({ ...prev, recipientName: text }))
          }
        />

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại"
          placeholderTextColor="#9CA3AF"
          value={newOrder.recipientPhone}
          keyboardType="phone-pad"
          onChangeText={(text) =>
            setNewOrder((prev) => ({ ...prev, recipientPhone: text }))
          }
        />

        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput
          style={[styles.input, { height: 70, textAlignVertical: "top" }]}
          placeholder="Nhập địa chỉ giao hàng"
          placeholderTextColor="#9CA3AF"
          value={newOrder.shipping_address}
          onChangeText={(text) =>
            setNewOrder((prev) => ({ ...prev, shipping_address: text }))
          }
          multiline
        />
      </View>

      {/* BOX 2: Payment Method */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Phương thức thanh toán</Text>

        <View style={styles.paymentContainer}>
          {PAYMENT_METHODS.map((m) => (
            <TouchableOpacity
              key={m}
              style={[
                styles.paymentOption,
                newOrder.payment_method === m && styles.paymentOptionActive,
              ]}
              onPress={() => setNewOrder((prev) => ({ ...prev, payment_method: m }))}
            >
              <Text
                style={[
                  styles.paymentText,
                  newOrder.payment_method === m && { color: "#fff" },
                ]}
              >
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* BUTTON */}
      <OrderButton
        title="Complete Order"
        onPress={handleSubmit}
        loading={loading}
      />
    </SafeAreaView>
  );
};

export default CreateOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F2F4F7",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20,
    color: "#111827",
  },

  // Card layout ----------------------------------
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    color: "#1F2937",
  },

  // Input -----------------------------------------
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151",
  },

  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 15,
    marginBottom: 14,
  },

  // Payment options -------------------------------
  paymentContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },

  paymentOption: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },

  paymentOptionActive: {
    backgroundColor: "#FF6B00",
    borderColor: "#FF6B00",
  },

  paymentText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
  },

  // Submit button ---------------------------------
  submitBtn: {
    backgroundColor: "#FF6B00",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 8,
  },

  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  backButton: {
    fontSize: 16,
    marginBottom: 8,
    color: "#2a59d1",
    fontWeight: "600",
  },
});
