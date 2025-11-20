import temp_img from "@/public/menu/chickens/combo_1_mieng_ga_gion.jpg";
import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/type";
import { Image, Platform, Text, TouchableOpacity } from "react-native";

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { id, image, name, price } = item;
  const { addItem } = useCartStore();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        position: 'relative',
        shadowColor: '#878787',
        shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: Platform.OS === 'android' ? 10 : 0,
        marginBottom: 40, // tạo khoảng cách cho các card
      }}
    >
      {/* Image */}
      <Image
        source={temp_img}
        style={{
          width: 130,      // kích thước nhỏ hơn
          height: 130,
        }}
        resizeMode="contain"
      />

      {/* Name */}
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          color: '#1a1a1a',
          marginBottom: 8,
          marginTop: 48, // đẩy text xuống tránh overlap với ảnh
        }}
        numberOfLines={1}
      >
        {name}
      </Text>

      {/* Price */}
      <Text style={{ color: '#888', marginBottom: 16 }}>{price.toLocaleString("vi-VN")}đ</Text>

      {/* Add to Cart */}
      <TouchableOpacity
        onPress={async () => await addItem(id)}
        style={{
          paddingVertical: 4,
          paddingHorizontal: 12,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: '#FE8C00',
        }}
      >
        <Text style={{ color: '#FE8C00', fontWeight: '700' }}>Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;
