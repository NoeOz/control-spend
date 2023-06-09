import useDataBase from "./useDataBase";

const useOperations = () => {
  const { db } = useDataBase();

  const sqlSentences = {
    getTable: "select * from spends",
    pushTable:
      "INSERT INTO spends (name, description, mount, dateSpend, typeSpend) values (?, ?, ?, ?, ?)",
    delete: "DELETE FROM spends WHERE id = ? ",
  };

  const executeSqlPromise = (sqlStatement, sqlData) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          sqlStatement,
          [...sqlData],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  };

  /**
   * The function returns array spends in "spends" table in a database using SQL.
   * @returns can return Array || error || null
   */
  async function getSpends() {
    return executeSqlPromise(sqlSentences.getTable, []);
  }

  /**
   * The function inserts spend data into a database table and returns a result indicating success or
   * failure.
   * @param name - The name of the spend.
   * @param description - A string that describes the spend or expense.
   * @param mount - The amount of money spent.
   * @param dateSpend - The date when the spend occurred.
   * @param typeSpend - The type of spend, such as "groceries", "entertainment", "transportation", etc.
   * @returns can return true || error || null
   */
  function pushSpend(name, description, mount, dateSpend, typeSpend) {
    return executeSqlPromise(sqlSentences.pushTable, [
      name,
      description,
      mount,
      dateSpend,
      typeSpend,
    ]);
  }

  /**
   * The function update data spend in "spends" table in a database using SQL.
   * @param dataSpend - an array containing: id, name, description, mount, dateSpend, typeSpend
   * @returns can return true || error || null
   */
  function updateSpend(dataSpend) {
    return executeSqlPromise(
      `UPDATE spends SET name = "${dataSpend.name}", description = "${dataSpend.description}", mount = ${dataSpend.mount}, dateSpend = "${dataSpend.dateSpend}", typeSpend = "${dataSpend.typeSpend}" WHERE id = ?`,
      [dataSpend.id]
    );
  }

  /**
   * The function delete spend in "spends" table in a database using SQL.
   * @param id - id spend
   * @returns can return true || error || null
   */
  function deleteSpend(id) {
    return executeSqlPromise(sqlSentences.delete, [id]);
  }

  return { getSpends, pushSpend, updateSpend, deleteSpend };
};

export default useOperations;
