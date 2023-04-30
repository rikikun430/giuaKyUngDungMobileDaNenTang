import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  AntDesign
} from "react-native";
import Colors from "../Colors";
import ToDoModal from "./ToDoModal";

import * as Font from "expo-font";
import DAO from "../Database/DAO";
import { db } from "../Database/Connection";

export default class toDoList extends React.Component {
  state = {
    showListVisible: false,
    taksInformations: this.props.RenderItems,
    listTodos: [],
    showTask: null
  };

  convertTimeToDate(customTime) {
    const today = new Date();
    const datePart = today.toISOString().split("T")[0]; // Get the date part from today's ISO string
    const customISOString = `${datePart}T${customTime}:00.000Z`;
    const date = new Date(customISOString);

    return date;
  }

  ShowListModal() {
    DAO(db)
      .getTodoByTasksID(this.state.taksInformations.id)
      .then((data) => {
        data.forEach((element) => {
          element.StartTime = this.convertTimeToDate(element.StartTime); // Convert 24-hour string time to Date object
          element.EndTime = this.convertTimeToDate(element.EndTime);
          this.state.listTodos.push(element);
          //console.log(element, "get Task");
        });
        this.state.showTask = this.taskitem();
        //console.log(this.state.listTodos);
        this.setState({ showListVisible: !this.state.showListVisible });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  CloseListModal() {
    this.state.listTodos = [];
    this.state.showTask = null;
    this.setState({ showListVisible: !this.state.showListVisible });
  }

  taskitem() {
    return (
      <ToDoModal
        TaskItem={this.state.listTodos}
        TaskID={this.state.taksInformations.id}
        closeModal={() => this.CloseListModal()}
      />
    );
  }

  async loadFonts() {
    await Font.loadAsync({
      Rubik: require("../assets/fonts/static/Rubik-Light.ttf")
    });
  }

  render() {
    const list = this.state.taksInformations;
    //console.log(list, "inviews");
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.showListVisible}
          onRequestClose={() => this.CloseListModal()}
        >
          {this.state.showTask}
        </Modal>
        <TouchableOpacity onPress={() => this.ShowListModal()}>
          <View style={[styles.listContainer, { backgroundColor: list.color }]}>
            <View>
              <TouchableOpacity>
                <Text
                  style={{
                    paddingVertical: 10,
                    textAlignVertical: "center",
                    fontSize: 20,
                    paddingRight: 20
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.elementContainer}>
              <Text style={styles.listTitle} numberOfLines={1}>
                {list.name}
              </Text>
              <View style={{ marginRight: 25 }}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.subTitle}>Total Task</Text>
                  <Text style={styles.count}>{list.total}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  listContainer: {
    width: "90%",
    height: 150,
    marginBottom: 60,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    borderRadius: 6,
    margin: 20,
    alignItems: "flex-end"
  },
  listTitle: {
    fontSize: 28,
    paddingHorizontal: 20,
    fontWeight: "500",
    color: Colors.white,
    fontFamily: "Rubik"
  },
  elementContainer: {
    backgroundColor: "#1C204B",
    width: "100%",
    height: "100%",
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  count: {
    fontSize: 49,
    fontWeight: "700",
    fontFamily: "Rubik",
    color: Colors.white
  },
  subTitle: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Rubik",
    color: Colors.white
  }
});
