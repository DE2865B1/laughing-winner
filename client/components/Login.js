import React from "react";
import {View, Text, TextInput, Button} from "react-native";

export default class Login extends React.Component {

	static navigationOptions = {
		title: "NathansWhatsAppLite"
	}

    constructor(){
        super();
        this.state = {
            displayName: "",
            password: "",
        }
    }

    enterChatroom() {
		// Must have a nonempty username
        if (this.state.displayName == "") {
            alert("Please enter a display name");
			return;
        }
		// Must have a nonempty password
		if (this.state.password == "") {
            alert("Please enter a password");
			return;
        }
		// Transition screens
		this.props.navigation.navigate("ListConvos", 
			{
				displayName: this.state.displayName,
				password: this.state.password,
			}
		);
    }

    render() {
        return(
            <View>
                <TextInput onChangeText={(text) => this.setState({displayName: text})} placeholder="Username"/>
                <TextInput onChangeText={(text) => this.setState({password: text})} placeholder="Password"/>
                <Button title="Enter" onPress={() => this.enterChatroom()}/>
            </View>
        )
    }
}