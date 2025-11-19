import CartItem from "@/components/CartItem";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import { useCartStore } from "@/store/cart.store";
import { PaymentInfoStripeProps } from "@/type";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentInfoStripe = ({ label, value, labelStyle, valueStyle }: PaymentInfoStripeProps) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 }}>
    <Text style={labelStyle}>{label}</Text>
    <Text style={valueStyle}>{value}</Text>
  </View>
);

const Cart = () => {
  const { items, getTotalItems, getTotalPrice } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 112, paddingHorizontal: 20, paddingTop: 20 }}
        ListHeaderComponent={() => <CustomHeader title="Your Cart" />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Cart Empty</Text>
          </View>
        )}
        ListFooterComponent={() => totalItems > 0 && (
          <View style={{ marginTop: 20, gap: 20 }}>
            <View style={{ marginTop: 24, borderWidth: 1, borderColor: '#E5E7EB', padding: 20, borderRadius: 16 }}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 20 }}>
                Payment Summary
              </Text>

              <PaymentInfoStripe
                label={`Total Items (${totalItems})`}
                value={`${totalPrice.toLocaleString("vi-VN")}đ`}
              />
              <PaymentInfoStripe
                label={`Delivery Fee`}
                value={`15.000đ`}
              />
              {/*<PaymentInfoStripe
                label={`Discount`}
                value={`- $0.50`}
                valueStyle={{ color: 'green' }}
              />*/}
              <View style={{ borderTopWidth: 1, borderColor: '#D1D5DB', marginVertical: 8 }} />
              <PaymentInfoStripe
                label={`Total`}
                value={`${(totalPrice + 15000).toLocaleString("vi-VN")}đ`}

                labelStyle={{ fontWeight: '700', color: '#111827' }}
                valueStyle={{ fontWeight: '700', color: '#111827' }}
              />
            </View>

            <CustomButton title="Order Now" />
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Cart;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1, // chiếm hết không gian List
    justifyContent: 'center', // căn giữa theo chiều dọc
    alignItems: 'center', // căn giữa theo chiều ngang
    paddingVertical: 50, // thêm khoảng trống nếu cần
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#878787',
  },
});

