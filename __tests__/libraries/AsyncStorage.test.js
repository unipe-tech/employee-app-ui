import React from "react";
import AsyncStorage from "@react-native-community/async-storage";

const getRecentStorage = async () => {
  try {
    const result = await AsyncStorage.getItem("DEMO::recentSearch");
    if (result) {
      return JSON.parse(result);
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
};

const setRecentStorage = async (recentSearch) => {
  try {
    const existingSearch = await getRecentStorage();
    const newRecentSearch = [recentSearch, ...existingSearch];
    await AsyncStorage.setItem(
      "DEMO::recentSearch",
      JSON.stringify(newRecentSearch)
    );
  } catch (e) {
    return;
  }
};

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe("getRecentStorage", () => {
  // if no results exist at key, returns an empty array
  test("if no result exists at key, return an empty array", async () => {
    const result = await getRecentStorage();
    expect(result).toEqual([]);
  });

  // returns an array of stored items
  test("returns an array of stored items", async () => {
    await AsyncStorage.setItem(
      "DEMO::recentSearch",
      JSON.stringify([{ id: 1 }])
    );
    const result = await getRecentStorage();
    expect(result).toEqual([{ id: 1 }]);
  });
});

describe("setRecentStorage", () => {
  test("if no stored items exist, add item", async () => {
    await setRecentStorage({ id: 1 });
    const result = await getRecentStorage();
    expect(result).toEqual([{ id: 1 }]);
  });
  test("if it adds item to start of the array", async () => {
    await setRecentStorage({ id: 1 });
    await setRecentStorage({ id: 2 });
    const result = await getRecentStorage();
    expect(result).toEqual([{ id: 2 }, { id: 1 }]);
  });
});
