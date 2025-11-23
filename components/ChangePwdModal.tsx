import { changePassword, verifyOTP } from "@/lib/changePassword";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


interface Props {
    show: boolean;
    handleCloseModal: () => void;
    userPhone: string;
}

const ChangePasswordModal: React.FC<Props> = ({ show, handleCloseModal, userPhone }) => {

    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({ otp: "", newPassword: "", confirmPassword: "" });
    const [formType, setFormType] = useState<"verifyOTP" | "changePassword">("verifyOTP");
    const [loading, setLoading] = useState(false)

    const resetForm = () => {
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setError({ otp: "", newPassword: "", confirmPassword: "" });
        setFormType("verifyOTP");
    };

    const closeModal = () => {
        resetForm();
        handleCloseModal();
    };

    const handleVerifyOTP = async () => {
        if (!otp.trim()) {
            setError(prev => ({ ...prev, otp: "Vui lòng nhập mã OTP" }));
            return;
        }

        try {
            setLoading(true)
            await verifyOTP(userPhone, otp);
            Alert.alert("Thành công", "Xác thực OTP thành công");
            setFormType("changePassword");
        } catch (e) {
            setTimeout(() => {
                Alert.alert("Lỗi", "OTP không hợp lệ");
            }, 100);
        } finally {
            setLoading(false)
        }
    };

    const handleChangePassword = async () => {
        let hasError = false;
        const newError = { otp: "", newPassword: "", confirmPassword: "" };

        if (!newPassword.trim()) {
            newError.newPassword = "Vui lòng nhập mật khẩu mới";
            hasError = true;
        }
        if (!confirmPassword.trim()) {
            newError.confirmPassword = "Vui lòng xác nhận mật khẩu";
            hasError = true;
        }
        if (newPassword !== confirmPassword) {
            newError.confirmPassword = "Mật khẩu xác nhận không trùng khớp";
            hasError = true;
        }

        setError(newError);
        if (hasError) return;

        try {
            setLoading(true)
            await changePassword(userPhone, confirmPassword);
            Alert.alert("Thành công", "Đổi mật khẩu thành công");
            closeModal();
        } catch {
            Alert.alert("Lỗi", "Đổi mật khẩu không thành công");
        } finally {
            setLoading(false)
        }
    };

    return (
        <Modal visible={show} animationType="slide" transparent={true} onRequestClose={closeModal}>
            <View style={styles.modalBackground}>
                <ScrollView contentContainerStyle={styles.modalContent}>
                    <Text style={styles.title}>Đổi mật khẩu</Text>

                    {formType === "verifyOTP" && (
                        <>
                            <Text style={styles.label}>Nhập mã OTP</Text>
                            <TextInput
                                style={[styles.input, error.otp ? styles.inputError : null]}
                                placeholder="Nhập mã OTP"
                                value={otp}
                                onChangeText={setOtp}
                                keyboardType="numeric"
                            />
                            {error.otp ? <Text style={styles.errorText}>{error.otp}</Text> : null}
                            <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
                                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Xác nhận OTP</Text>}
                            </TouchableOpacity>
                        </>
                    )}

                    {formType === "changePassword" && (
                        <>
                            <Text style={styles.label}>Mật khẩu mới</Text>
                            <TextInput
                                style={[styles.input, error.newPassword ? styles.inputError : null]}
                                placeholder="Nhập mật khẩu mới"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                secureTextEntry
                            />
                            {error.newPassword ? <Text style={styles.errorText}>{error.newPassword}</Text> : null}

                            <Text style={styles.label}>Xác nhận mật khẩu</Text>
                            <TextInput
                                style={[styles.input, error.confirmPassword ? styles.inputError : null]}
                                placeholder="Nhập lại mật khẩu"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />
                            {error.confirmPassword ? <Text style={styles.errorText}>{error.confirmPassword}</Text> : null}

                            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Đổi mật khẩu</Text>}
                            </TouchableOpacity>
                        </>
                    )}

                    <TouchableOpacity style={[styles.button, { backgroundColor: "#aaa", marginTop: 10 }]} onPress={closeModal}>
                        <Text style={styles.buttonText}>Hủy</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </Modal>
    );
};

export default ChangePasswordModal;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        padding: 20,
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
    },
    title: { fontSize: 20, fontWeight: "700", marginBottom: 20, textAlign: "center" },
    label: { fontSize: 14, color: "#444", marginTop: 10 },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginTop: 6 },
    inputError: { borderColor: "red" },
    errorText: { color: "red", marginTop: 4 },
    button: { backgroundColor: "#FE8C00", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 16 },
    buttonText: { color: "#fff", fontWeight: "700" },
});
