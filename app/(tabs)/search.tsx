import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";
import { getMenu } from "@/lib/getMenu";
import { MenuItem } from "@/type";
import { food_list } from "../../assets/assets";

const Search = () => {
  const { category, query } = useLocalSearchParams<{ query: string; category: string }>();
  const [data, setData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const categories = [...new Set(food_list.map((item) => item.category))];

  useEffect(() => {
    setLoading(true);
    const res = getMenu(category, query);
    setData(res);
    setLoading(false);
  }, [category, query]);

  return (
    <SafeAreaView className="bg-white" style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;
          return (
            <View style={{ flex: 1, maxWidth: "48%", marginBottom: 10 }}> {/*</View><View style={{ flex: 1, maxWidth: '48%', marginTop: !isFirstRightColItem ? 10 : 0 }}>*/}
              <MenuCard item={item as MenuItem} />
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 0 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 128 }}
        ListHeaderComponent={() => (
          <View style={{ marginVertical: 20, gap: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <View style={{ flexDirection: 'column' }}>
                <Text className="small-bold uppercase text-primary">Search</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                  <Text className="paragraph-semibold text-dark-100">
                    Find your favorite food
                  </Text>
                </View>
              </View>
              <CartButton />
            </View>

            <SearchBar />
            <Filter categories={categories} />
          </View>
        )}
        ListEmptyComponent={() => !loading && <Text>No results</Text>}
      />
    </SafeAreaView>
  );
};

export default Search;
