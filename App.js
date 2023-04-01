import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import Colors from './Colors';
import { AntDesign } from "@expo/vector-icons"
import tempData from './tempData';
import ToDoList from './components/ToDoList';
import React from 'react';
import AddListModal from './components/AddListToMoDal';

export default class App extends React.Component {
  state = {
    addToDoVisble: false,
    lists: tempData,
  };

  toggleAddToDoModal() {
    this.setState({ addToDoVisble: !this.state.addToDoVisble });
  }

  renderList = list => {
    return <ToDoList list={list} updateList={this.updateList} />
  }

  addList = list => {
    this.setState({ lists: [...this.state.lists, { ...list, id: this.state.lists.length + 1, todos: [] }] })

  };

  updateList = list => {
    this.setState({
      lists: this.state.lists.map(item => {
        return item.id === list.id ? list : item;
      })
    });
  }

  render() {
    return (
      <View style={styles.container} >
        <Modal animationType="slide" visible={this.state.addToDoVisble} onRequestClose={() => this.toggleAddToDoModal()}>
          <AddListModal closeModal={() => this.toggleAddToDoModal()} addList={this.addList} />
        </Modal>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            To do <Text style={{ fontWeight: "300", color: Colors.blue }}>List</Text>
          </Text>
        </View>
        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity style={styles.addList} >
            <AntDesign name="plus" size={16} color={Colors.blue} onPress={() => this.toggleAddToDoModal()}
            />
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>
        </View>
        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList data={this.state.lists}
            keyExtractor={item => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  divider: {
    backgroundColor: Colors.lightblue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: Colors.black,
    paddingHorizontal: 64
  },
  addList: {
    borderWidth: 2,
    borderColor: Colors.lightblue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  add: {
    color: Colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8
  }
});
