import { images } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

const Searchbar = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params.query || "");

  useEffect(() => {
    // Đồng bộ khi URL param thay đổi
    setQuery(params.query || "");
  }, [params.query]);

  const handleSearch = (text: string) => {
    setQuery(text);

    if (!text.trim()) {
      router.setParams({ query: undefined });
    }
  };

  const handleSubmit = () => {
    const trimmed = query.trim();
    if (trimmed) {
      router.setParams({ query: trimmed });
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3F4F6",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
      }}
    >
      <TextInput
        style={{ flex: 1, fontSize: 16 }}
        placeholder="Search for chickens, drinks..."
        value={query}
        onChangeText={handleSearch}
        onSubmitEditing={handleSubmit}
        placeholderTextColor="#A0A0A0"
        returnKeyType="search"
      />

      <TouchableOpacity onPress={handleSubmit}>
        <Image
          source={images.search}
          style={{
            width: 22,
            height: 22,
            tintColor: "#5D5F6D",
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Searchbar;
