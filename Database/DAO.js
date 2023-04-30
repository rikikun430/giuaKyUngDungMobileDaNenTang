export default function (db) {
  return {
    getAllTasks: () => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT * FROM task`,
            [],
            (_, results) => {
              if (results.rows.length != 0) {
                //const len = results.rows.length;
                const data = [];
                for (let i = 0; i < results.rows.length; i++) {
                  const row = results.rows.item(i);
                  data.push(row);
                  // Access the data from each row
                  //console.log(row, "here");
                }
                //const jsonData = JSON.stringify(results);
                //console.log(results.rows.item);
                resolve(data);
              } else {
                console.log(results, "error here");
                resolve([]);
              }
            },
            (error) => {
              reject(error);
            }
          );
        });
      });
    },
    getTaskByDate: (date) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM task WHERE createDate = ?",
            [date],
            [],
            (_, results) => {
              if (results.rows.length != 0) {
                const data = [];
                for (let i = 0; i < results.rows.length; i++) {
                  const row = results.rows.item(i);
                  data.push(row);
                }
                resolve(data);
              } else {
                resolve([]);
              }
            },
            (error) => {
              reject(error);
            }
          );
        });
      });
    },
    deleteTask: (taskID) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "DELETE FROM task WHERE id = ?",
            [taskID],
            (_, { rowsAffected }) => {
              console.log("Rows deleted: " + rowsAffected);
              resolve(rowsAffected);
            },
            (error) => {
              reject(error);
            }
          );
        });
      });
    },
    deleteAllTask: () => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "DELETE FROM task",
            [],
            (_, { rowsAffected }) => {
              console.log("Rows deleted: " + rowsAffected);
              resolve(rowsAffected);
            },
            (error) => {
              reject(error);
            }
          );
        });
      });
    },
    getTodoByTasksID: (taskID) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT * FROM ToDos WHERE taskId = ?`,
            [taskID],
            (_, results) => {
              if (results.rows.length != 0) {
                const data = [];
                for (let i = 0; i < results.rows.length; i++) {
                  const row = results.rows.item(i);
                  data.push(row);
                }
                console.log("GetTODO", data);
                resolve(data);
              } else {
                console.log(results, "error here");
                resolve([]);
              }
            },
            (error) => {
              reject(error);
            }
          );
        });
      });
    },
    addNewToDo: (title, startTime, endTime, color, completed, taskID) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          console.log(startTime, endTime);
          tx.executeSql(
            `INSERT INTO ToDos (title, StartTime, EndTime, color, completed, TaskId) VALUES (?, ?, ?, ?, ?, ?)`,
            [title, startTime, endTime, color, completed, taskID],
            (_, results) => {
              resolve(results.insertId);
            },
            (error) => {
              reject(error);
            }
          );
        });
      });
    },
    addNewtask: (name, color, createDate, total) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "INSERT INTO task (name, color, createDate,total ) VALUES (?, ?, ?, ?)",
            [name, color, createDate, total],
            (_, results) => {
              resolve(results.insertId);
            },
            (error) => {
              reject(error);
            }
          );
        });
      });
    }
  };
}
