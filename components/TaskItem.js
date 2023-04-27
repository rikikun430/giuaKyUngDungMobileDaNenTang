import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import Colors from "../Colors";
import ToDoModal from "./ToDoModal";

import * as Font from "expo-font";

export default class toDoList extends React.Component {
  state = {
    showListVisible: false
  };

  toogleListModal() {
    this.setState({ showListVisible: !this.state.showListVisible });
  }
  async loadFonts() {
    await Font.loadAsync({
      Rubik: require("../assets/fonts/static/Rubik-Light.ttf")
    });
  }

  render() {
    const list = this.props.list;
    console.log(list);
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.showListVisible}
          onRequestClose={() => this.toogleListModal()}
        >
          <ToDoModal
            TaskItem={list}
            closeModal={() => this.toogleListModal()}
          />
        </Modal>
        <TouchableOpacity onPress={() => this.toogleListModal()}>
          <View style={[styles.listContainer, { backgroundColor: list.color }]}>
            <View>
              <TouchableOpacity></TouchableOpacity>
            </View>
            <View style={styles.elementContainer}>
              <Text style={styles.listTitle} numberOfLines={1}>
                {list.name}
              </Text>
              <View style={{ marginRight: 25 }}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.subTitle}>Total Task</Text>
                  <Text style={styles.count}>{list.todos.length}</Text>
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
    height: 180,
    paddingTop: 45,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    borderRadius: 6,
    margin: 20,
    alignItems: "center"
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
