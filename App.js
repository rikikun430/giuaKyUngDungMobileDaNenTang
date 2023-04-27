import { StatusBar } from "expo-status-bar";

import { useMemo, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Touchable,
  Modal,
  Dimensions
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import moment from "moment";
import Swiper from "react-native-swiper";
import ListTask from "./components/ListTask";
import ToDoModal from "./components/ToDoModal";
import AddListModal from "./components/AddListToMoDal";
import Font from "./fonts";

import SQLite from "react-native-sqlite-storage";

// const db = SQLite.openDatabase(
//   { name: "myDatabase.db", location: "default" },
//   () => console.log("Database opened successfully."),
//   (error) => console.log("Error opening database: ", error)
// );

// const CreateTable = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS myTable (
//         id INTEGER PRIMARY KEY NOT NULL,
//         name TEXT,
//         color TEXT,
//         createDate TEXT,
//         todos TEXT
//       );`,
//       [],
//       () => {
//         console.log("Create table Success");
//       },
//       (error) => {
//         console.log("Create table failed", error);
//       }
//     );
//   });
// };

const { width } = Dimensions.get("screen");

const List = [];

export default function App() {
  // useEffect(() => {
  //   // Run your function here
  //   CreateTable();
  //   startProgram();
  // }, []);

  // const startProgram = () => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       `SELECT name FROM sqlite_master WHERE type='table' AND name='myTable';`,
  //       [],
  //       (tx, results) => {
  //         if (results.rows.length === 0) {
  //           CreateTable();
  //         }
  //       },
  //       (error) => {
  //         console.log("Error checking table existence", error);
  //       }
  //     );
  //   });
  // };

  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const swiper = useRef();

  const loadFont = Font();

  const weeks = useMemo(() => {
    const start = moment(start).add(week, "weeks").startOf("week");

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, "week").add(index, "day");

        return {
          weekday: date.format("ddd"),
          date: date.toDate()
        };
      });
    });
  }, [week]);

  const CreateTask = (name, color, Today) => {
    console.log(name, color, Today);
  };

  const [AddTodoVisible, setAddTodoVisible] = useState(false);

  function AddTodoModal() {
    setAddTodoVisible(!AddTodoVisible);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      <View style={style.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "7%"
          }}
        >
          <View style={style.divider} />
          <View style={style.titleContainer}>
            <Text style={style.title}>Your Task</Text>
          </View>
          <View style={style.divider} />
        </View>

        <View style={style.picker}>
          <Swiper
            index={1}
            ref={swiper}
            showsPagination={false}
            loop={false}
            onIndexChanged={(ind) => {
              if (ind === 1) {
                return;
              }

              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, "week").toDate());
                swiper.current.scrollTo(1, false);
              }, 100);
            }}
          >
            {weeks.map((dates, index) => (
              <View
                style={[style.itemrow, { paddingHorizontal: 16 }]}
                key={index}
              >
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();

                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => {
                        setValue(item.date);
                      }}
                    >
                      <View
                        style={[
                          style.item,
                          isActive && {
                            backgroundColor: "#111",
                            borderColor: "#111"
                          }
                        ]}
                      >
                        <Text
                          style={[
                            style.itemWeekday,
                            isActive && { color: "#fff" }
                          ]}
                        >
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            style.itemDate,
                            isActive && { color: "#fff" }
                          ]}
                        >
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>
        <View style={{ paddingVertical: 24, paddingHorizontal: 13 }}>
          <Text style={style.dateString}>{value.toDateString()}</Text>
        </View>
        {/** Content */}
        <View style={style.content}>
          <ListTask filled={value}></ListTask>

          <Modal
            animationType="slide"
            visible={AddTodoVisible}
            onRequestClose={() => AddTodoModal()}
          >
            <AddListModal
              createTask={CreateTask}
              closeModal={() => AddTodoModal()}
            />
          </Modal>
        </View>
      </View>
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          if (name == "bt_addNote") {
            AddTodoModal();
          }
        }}
      ></FloatingAction>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1
  },
  header: {
    paddingHorizontal: 36
  },
  divider: {
    backgroundColor: "#24A6D9",
    height: 1,
    flex: 1,
    alignSelf: "center"
  },
  title: {
    fontSize: 38,
    width: "auto",
    fontWeight: "800",
    color: "black",
    paddingHorizontal: 64
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  itemrow: {
    width,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginHorizontal: -4
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "column"
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: "300",
    color: "#737373",
    marginBottom: 4
  },
  itemDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111"
  },
  content: {
    flex: 5
  }
});

const actions = [
  {
    text: "Add new task",
    icon: require("./assets/addNote.png"),
    name: "bt_addNote",
    position: 2
  }
];
