import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import Socket from "../socket";
const Message = require("../Message");

export default class ConvoThread extends React.Component {

	static navigationOptions = {
		title: ""
	}

    constructor(props) {
        super();
        
		this.displayName = props.navigation.state.params.displayName
		this.password = props.navigation.state.params.password
		this.secret = props.navigation.state.params.secret
		this.recipient = props.navigation.state.params.recipient
		this.recipientSecret = props.navigation.state.params.recipientSecret
		
		ConvoThread.navigationOptions.title = "".concat("You are talking to ", this.recipient, "_", this.recipientSecret)
		
		this.state = {
            messages: []
        }
		
        this.socket = new Socket(this.displayName, this.password, this.secret);
		
		// Register on read message
        this.socket.socket.on("privateMessage", (message) => {
			const content = this.deconstructPrivateMessage(message.text)
			if (content == null) {return;}
			
			var inThisConvo = false
			if (content[0] == this.recipient && content[2] == this.displayName) {inThisConvo = true}
			if (content[0] == this.displayName && content[2] == this.recipient) {inThisConvo = true}
			if (!inThisConvo) {return}
			
			message.text = content[4]
			this.readMessage(message)
        })
		
		// Download message history
        this.socket.socket.on("downloadPrivateHistoryReply", (message) => {this.readDownloadPrivateHistoryReply(message.text)})
		this.socket.downloadPrivateHistory()
    }

	// Draw stuff
    render() {
        return (
            <GiftedChat
            messages={this.state.messages}
            onSend={(message) => {this.sendPrivateMessage(this.recipient, this.recipientSecret, message[0].text)}}
            inverted={false}
            />
        )
    }

	// Wrapper function
    sendPrivateMessage(recipient, recipientSecret, message) {
        this.socket.sendPrivateMessage(recipient, recipientSecret, message);
    }

	assertMessage(username, password, message) {
		if (!matches('[A-Za-z0-9]*', username)) {return false;}
		if (!matches('[A-Za-z0-9]*', password)) {return false;}
		if (!matches('[^_]*', message)) {return false;}
		return true
	}

	matches(pattern, item) {
		const res = (new RegExp(pattern)).exec(item);
		if (res == null) {return false;}
		if (res.index != 0) {return false;}
		if (res[0].length != res.input.length) {return false;}
		return true;
	}

	deconstructPrivateMessage(text) {
		const res = (new RegExp('([A-Za-z0-9]*)_([A-Za-z0-9]*)_([A-Za-z0-9]*)_([A-Za-z0-9]*)_((?:a|[^a])*)')).exec(text);
		if (res == null) {return null;}
		if (res.index != 0) {return null;}
		if (res[0].length != res.input.length) {return null;}
		return [res[1], res[2], res[3], res[4], res[5]]
	}

	readMessage(text) {
		const updatedMessages = [...this.state.messages, text];
		this.setState({messages: updatedMessages})
	}
	
	deconstructPrivateHistory(history) {
		if (history == "") {return []}
		const res = (new RegExp('_([A-Za-z0-9]*)_([A-Za-z0-9]*)_([A-Za-z0-9]*)_([A-Za-z0-9]*)_([^_]*)((?:_[A-Za-z0-9]*_[A-Za-z0-9]*_[A-Za-z0-9]*_[A-Za-z0-9]*_[^_]*)*)')).exec(history);
		if (res == null) {return null;}
		if (res.index != 0) {return null;}
		if (res[0].length != res.input.length) {return null;}
		var subResult = this.deconstructPrivateHistory(res[6])
		if (subResult == null) {return null}
		subResult.unshift([res[1], res[2], res[3], res[4], res[5]])
		return subResult
	}
	
	readDownloadPrivateHistoryReply(text) {
		var messages = this.deconstructPrivateHistory(text)
		if (messages == null) {return;}
		for (var i = 0; i < messages.length; i++) {
			const content = messages[i]
			var inThisConvo = false
			if (content[0] == this.displayName && content[1] == this.secret && content[2] == this.recipient && content[3] == this.recipientSecret) {inThisConvo = true}
			if (content[0] == this.recipient && content[1] == this.recipientSecret && content[2] == this.displayName && content[3] == this.secret) {inThisConvo = true}
			if (!inThisConvo) {continue}

			this.readMessage(Message.format(content[4], content[0]))
		}
	}
}