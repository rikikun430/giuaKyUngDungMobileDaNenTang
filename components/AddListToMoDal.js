import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from '@expo/vector-icons'
import Colors from '../Colors';
import tempData from "../tempData";

export default class AddListModal extends React.Component {
    backgroundColor = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#1234D9", "#591BD9", "#4834D9"]
    state = {
        name: "",
        color: this.backgroundColor[0],
    }

    CreateToDo = () => {
        const { name, color } = this.state

        const list = { name, color };

        this.props.addList(list);

        this.setState({ name: "" });
        this.props.closeModal();
    }
    RenderColor() {
        return this.backgroundColor.map(color => {
            return (
                <TouchableOpacity key={color} style={[styles.colorSelect, { backgroundColor: color }]} onPress={() => this.setState({ color })} />
            )
        })
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity style={{ position: "absolute", top: 64, right: 32 }} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={Colors.black} />
                </TouchableOpacity>
                <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>

                    <Text style={styles.title}> Create todo list</Text>

                    <TextInput style={styles.input} placeholder="List Name?" onChangeText={text => this.setState({ name: text })} />

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
                        {this.RenderColor()}
                    </View>

                    <TouchableOpacity style={[styles.create, { backgroundColor: this.state.color }]} onPress={this.CreateToDo}>
                        <Text style={{ color: Colors.white, fontWeight: "600" }}>Create!</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView >
        );
    }
}
const styles = StyleSheet.create({
    containter: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: Colors.black,
        alignSelf: "center",
        marginBottom: 16,
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4,
    },
})