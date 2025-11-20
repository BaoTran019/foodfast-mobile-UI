import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

interface FilterProps {
  categories: string[];
}

const Filter = ({ categories }: FilterProps) => {
  const searchParams = useLocalSearchParams<{ category?: string }>();
  const [active, setActive] = useState<string>(searchParams.category || "all");

  const handlePress = (category: string) => {
    setActive(category);

    if (category === "all") router.setParams({ category: undefined });
    else router.setParams({ category });
  };

  const filterData = ["all", ...categories.filter(cat => cat.toLowerCase() !== "all")];

  return (
    <FlatList
      data={filterData}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 12,
        columnGap: 8, // ✅ Thay cho gap-x-2
      }}
      renderItem={({ item }) => {
        const isActive = active === item;

        return (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            className={cn(
              "px-4 py-2 rounded-full",
              isActive ? "bg-amber-500 shadow-md" : "bg-white"
            )}
          >
            <Text
              className={cn(
                "text-sm font-medium",
                isActive ? "text-white" : "text-gray-400"
              )}
            >
              {item === "all" ? "All" : item.replace("_", " ")}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Filter;
