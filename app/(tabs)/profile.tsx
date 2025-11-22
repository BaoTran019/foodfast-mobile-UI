import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
    const { user } = useAuthStore();

    if (!user) return null;

    console.log(user.id)

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Avatar */}
            <View style={styles.avatarSection}>
                <Image
                    source={{ uri: "https://i.pravatar.cc/150?u=" + user.id }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>{user.fullName}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>

            {/* Menu Section */}
            <View style={styles.menuSection}>
                <ProfileItem
                    label="My Orders"
                    onPress={() =>
                        router.push({
                            pathname: "../orders",
                            params: { userId: user.id.toString() },
                        })
                    }
                />
                <ProfileItem 
                    label="My Information"
                    onPress={() =>
                        router.push("../Profile_Info")
                    } />
                <ProfileItem label="Help & Support" />
            </View>

            {/* Logout */}
            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

type ProfileItemProps = {
  label: string;
  onPress?: () => void; // thêm optional onPress
};

const ProfileItem = ({ label, onPress }: ProfileItemProps) => (
  <TouchableOpacity style={styles.profileItem} onPress={onPress}>
    <Text style={styles.profileItemLabel}>{label}</Text>
    <Text style={styles.profileItemArrow}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 20,
    },
    avatarSection: {
        alignItems: "center",
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
    },
    name: {
        marginTop: 16,
        fontSize: 20,
        fontWeight: "600",
        color: "#181C2E",
    },
    email: {
        color: "#878787",
        marginTop: 4,
    },
    menuSection: {
        marginTop: 40,
    },
    profileItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    profileItemLabel: {
        fontSize: 16,
        fontWeight: "500",
        color: "#181C2E",
    },
    profileItemArrow: {
        fontSize: 20,
        color: "#878787",
    },
    logoutButton: {
        marginTop: 40,
        backgroundColor: "#F14141",
        paddingVertical: 14,
        borderRadius: 12,
    },
    logoutText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 16,
    },
});

export default Profile;
