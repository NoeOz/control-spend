import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

const useDataBase = () => {
  const queryTable =
    "CREATE TABLE IF NOT EXISTS spends (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, mount DOUBLE, dateSpend DATE, typeSpend TEXT)";
  const db = openDatabase();

  useEffect(() => {
    checkTable();
    return () => {};
  }, []);

  function openDatabase() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }

    const db = SQLite.openDatabase("spendDB.db");
    return db;
  }

  function checkTable() {
    db.transaction((tx) => {
      tx.executeSql(queryTable);
    });
  }

  return { db };
};

export default useDataBase;
