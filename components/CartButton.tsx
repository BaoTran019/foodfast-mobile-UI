import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { router } from "expo-router";
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CartButton = () => {
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <TouchableOpacity style={styles.cartBtn} onPress={() => router.push('/cart')}>
      <Image source={images.bag} style={styles.icon} resizeMode="contain" />

      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FE8C00',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    width: 24,
    height: 24,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
});

export default CartButton;
