import React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal
} from "react-native";
import Colors from "../Colors";
import moment from "moment";
import Timetable from "react-native-calendar-timetable";

import ToDoItem from "./ToDoItem";
import AddTodoItem from "./AddTodoItem";

//import DAO from "../Database/DAO";

export default ToDoModal = function (props) {
  const [isVisible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!isVisible);

  const [date] = React.useState(new Date());
  const [from] = React.useState(moment().subtract(3, "days").toDate());
  const [till] = React.useState(moment().add(3, "days").toISOString());
  const range = { from, till };

  const [items, setItems] = React.useState([
    {
      title: "Go to cafe",
      Color: "lightblue",
      Content: "Meet my friends",
      startDate: moment().subtract(1, "hour").toDate(),
      endDate: moment().add(1, "hour").toDate()
    }
  ]);

  // toggleTodoCompleted = (index) => {
  //   let list = props.list;
  //   list.todos[index].completed = !list.todos[index].completed;

  //   this.props.updateList(list);
  // };

  // addTodo = () => {
  //   let list = props.list;
  //   list.todos.push({ title: this.state.newTodo, completed: false });

  //   this.props.updateList(list);
  //   this.setState({ newTodo: "" });
  // };

  const TaskDetail = props?.TaskItem;

  const CreateTodo = (title, content, color, StartTime, EndTime) => {
    setItems((currentItem) => [
      ...currentItem,
      {
        title: title,
        Content: content,
        Color: color,
        startDate: StartTime,
        endDate: EndTime
      }
    ]);
  };
  const taskCount = TaskDetail.todos.length;
  const completedCount = TaskDetail.todos.filter(
    (todo) => todo.completed
  ).length;
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.section,
            styles.header,
            { borderBottomColor: TaskDetail.color }
          ]}
        >
          <View>
            <Text style={styles.title}> {TaskDetail.name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>

        <View style={styles.timetableContainer}>
          <ScrollView>
            <Timetable
              // these two are required
              items={items}
              renderItem={(props) => {
                console.log(props);
                return <ToDoItem {...props} />;
              }}
              // provide only one of these
              date={date}
            />
          </ScrollView>
        </View>
        {/* input */}
        <View style={[styles.section, styles.footer]}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <TouchableOpacity
              onPress={props.closeModal}
              style={[styles.addTodo, { backgroundColor: "red" }]}
            >
              <Text style={{ color: Colors.white, fontWeight: "600" }}>
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addTodo, { backgroundColor: Colors.blue }]}
              onPress={toggleVisibility}
            >
              <Text style={{ color: Colors.white, fontWeight: "600" }}>
                Add ToDo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal visible={isVisible} animationType="fade" transparent={true}>
          <AddTodoItem
            onClose={toggleVisibility}
            onCreate={CreateTodo}
          ></AddTodoItem>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  section: {
    flex: 1,
    alignSelf: "stretch"
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 24,
    borderBottomWidth: 3
  },
  title: {
    fontSize: 32,
    fontWeight: 800,
    Colors: Colors.black
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    marginLeft: 10,
    color: Colors.gray,
    fontWeight: "600"
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8
  },
  addTodo: {
    width: 130,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row"
  },
  todo: {
    color: Colors.black,
    fontWeight: "700",
    fontSize: 16
  },
  timetableContainer: {
    height: "70%",
    marginTop: 10,
    padding: 10
  }
});
