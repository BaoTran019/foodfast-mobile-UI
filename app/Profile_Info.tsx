// screens/ProfileScreen.tsx
import CustomHeader from "@/components/CustomHeader";
import useAuthStore from "@/store/auth.store";
import React, { useState } from "react";
import {
    ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const { user, changeInfo, isLoading, fetchAuthenticatedUser } = useAuthStore();

  const [profile, setProfile] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: user?.address || "",
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await changeInfo(profile);
      alert("Cập nhật thông tin thành công!");
    } catch {
      alert("Có lỗi xảy ra!");
    } finally {
      setSaving(false);
    }
  };

  const insets = useSafeAreaInsets();

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FE8C00" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingTop: insets.top + 20 }]}>
      <CustomHeader title="Thông tin cá nhân" />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput
          style={styles.input}
          value={profile.fullName}
          onChangeText={(text) => setProfile(prev => ({ ...prev, fullName: text }))}
          placeholder="Nhập họ tên"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          value={profile.phone}
          onChangeText={(text) => setProfile(prev => ({ ...prev, phone: text }))}
          placeholder="Nhập số điện thoại"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={profile.email}
          onChangeText={(text) => setProfile(prev => ({ ...prev, email: text }))}
          placeholder="Nhập email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={profile.address}
          onChangeText={(text) => setProfile(prev => ({ ...prev, address: text }))}
          placeholder="Nhập địa chỉ"
          multiline
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving}>
        {saving ? <ActivityIndicator size="small" /> : <Text style={styles.saveText}>Lưu thông tin</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  inputGroup: { marginTop: 16 },
  label: { fontSize: 14, marginBottom: 6, color: "#444" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 10, fontSize: 16 },
  saveBtn: { backgroundColor: "#FE8C00", paddingVertical: 14, borderRadius: 12, alignItems: "center", marginTop: 10 },
  saveText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
