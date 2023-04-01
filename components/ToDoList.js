import React from "react";
import react from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import Colors from "../Colors";
import ToDoModal from './ToDoModal'

export default class toDoList extends React.Component {
    state = {
        showListVisible: false
    }

    toogleListModal() {
        this.setState({ showListVisible: !this.state.showListVisible })
    }

    render() {
        const list = this.props.list;

        const completedCount = list.todos.filter(todo => todo.completed).length;
        const remainingCount = list.todos.length - completedCount;
        return (
            <View>
                <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={() => this.toogleListModal()}>
                    <ToDoModal list={list} closeModal={() => this.toogleListModal()} updateList={this.props.updateList} />

                </Modal>
                <TouchableOpacity style={[styles.listContainer, { backgroundColor: list.color }]} onPress={() => this.toogleListModal()} >
                    <Text style={styles.listTitle} numberOfLines={1}>
                        {list.name}
                    </Text>
                    <View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.count}>{remainingCount}</Text>
                            <Text style={styles.subTitle}>remaining</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.count}>{completedCount}</Text>
                            <Text style={styles.subTitle}>completed</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

};
const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200,
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.white,
        marginBottom: 18,
    },
    count: {
        fontSize: 40,
        fontWeight: "200",
        color: Colors.white,
    },
    subTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.white,
    }

})