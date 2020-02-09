import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import Socket from "../socket";
const Message = require("../Message");

export default class ListConvos extends React.Component {

	static navigationOptions = {
		title: ""
	}
	
	peopleYoureTalkingTo = this.constructSet()

    constructor(props) {
        super();
        
		this.displayName = props.navigation.state.params.displayName
		this.password = props.navigation.state.params.password
		this.secret = this.deriveSecret(this.displayName, this.password)
		
		ListConvos.navigationOptions.title = "".concat("You are ", this.displayName, "_", this.secret)
		
		this.state = {
            messages: []
        }
		
        this.socket = new Socket(this.displayName, this.password, this.secret);
		
		// Register on read message
        this.socket.socket.on("privateMessage", (message) => {
			const content = this.deconstructPrivateMessage(message.text)
			if (content == null) {return;}
			
			if (content[0] == this.displayName && content[1] == this.secret && this.addSet(this.peopleYoureTalkingTo, "".concat(content[2], "_", content[3]))) {this.registerConversation(content[2], content[3])}
			if (content[2] == this.displayName && content[3] == this.secret && this.addSet(this.peopleYoureTalkingTo, "".concat(content[0], "_", content[1]))) {this.registerConversation(content[0], content[1])}
        })
		
		// Download message history
        this.socket.socket.on("downloadPrivateHistoryReply", (message) => {this.readDownloadPrivateHistoryReply(message.text)})
		this.socket.downloadPrivateHistory()
    }

	// Draw stuff
    render() {
        return (
            <GiftedChat
            placeholder ="To whomst'd've'ly'yaint'nt'ed'ies's'y'es would you like to speak?"
            messages={this.state.messages}
			onPressAvatar={(userAndSecret) => {
					const res = (new RegExp("([A-Za-z0-9]*)_([A-Za-z0-9]*)")).exec(userAndSecret.name);
					if (res == null) {return;}
					if (res.index != 0) {return;}
					if (res[0].length != res.input.length) {return;}
					
					this.props.navigation.navigate("ConvoThread", 
						{
							displayName: this.displayName,
							password: this.password,
							secret: this.secret,
							recipient: res[1],
							recipientSecret: res[2],
						}
					)
				}
			}
            onSend={(message) => {
					const res = (new RegExp("([A-Za-z0-9]*)_([A-Za-z0-9]*)")).exec(message[0].text);
					if (res == null) {return;}
					if (res.index != 0) {return;}
					if (res[0].length != res.input.length) {return;}

					this.props.navigation.navigate("ConvoThread", 
						{
							displayName: this.displayName,
							password: this.password,
							secret: this.secret,
							recipient: res[1],
							recipientSecret: res[2],
						}
					)
				}
			}
            inverted={false}
            />
        )
    }
	
	deriveSecret(username, password) {
		return "00"
	}
	
	constructSet() {
		return []
	}
	
	addSet(set, item) {
		for (var i = 0; i < set.length; i++) {if (item == set[i]) {return false}}
		set.push(item)
		return true
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

	registerConversation(username, secret) {
		const message = Message.format("".concat(username, "_", secret, " is a hot single in your area!"), "".concat(username, "_", secret))
		const updatedMessages = [...this.state.messages, message];
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
			if (content[0] == this.displayName && content[1] == this.secret && this.addSet(this.peopleYoureTalkingTo, "".concat(content[2], "_", content[3]))) {this.registerConversation(content[2], content[3])}
			if (content[2] == this.displayName && content[3] == this.secret && this.addSet(this.peopleYoureTalkingTo, "".concat(content[0], "_", content[1]))) {this.registerConversation(content[0], content[1])}
		}
	}
}

// TODO: Finish signature scheme
// This signature scheme is based on Schnorr signatures

// n = 69169
// g = 42069

// keyGen(username, password) {
	// const input = "".concat(username, password)
	// var secret = 0
	// var power = 1
	// for (var i = 0; i < input.length; i++) {
		// const code = input.charCodeAt(i)
		// if ("0".charCodeAt(0) <= code && code <= "9".charCodeAt(0)) {
			// secret += power * (code - "0".charCodeAt(0))
		// }
		// if ("A".charCodeAt(0) <= code && code <= "Z".charCodeAt(0)) {
			// secret += power * (code - "A".charCodeAt(0) + 10)
		// }
		// if ("a".charCodeAt(0) <= code && code <= "z".charCodeAt(0)) {
			// secret += power * (code - "a".charCodeAt(0) + 36)
		// }
		// power *= 62
		// secret %= n
		// power %= n
	// }
	
	// return [secret, g * secret]
// }

// sign(message, signingKey) {
	// signature = 0
	// a_t = Math.floor(Math.random(n))
	// u_t = g * a_t
	// c = h(u_t, message)
	// a_z = signingKey * c + a_t
	// return [u_t, a_z]
// }

// verify(u_t, a_z, verificationKey, message) {
	// return g * a_z == u_t + verificationKey * h(u_t, message)
// }

// h(u_t, message) {
	// var state = u_t
	// var power = 1
	// for (var i = 0; i < input.length; i++) {
		// const code = input.charCodeAt(i)
		// if ("0".charCodeAt(0) <= code && code <= "9".charCodeAt(0)) {
			// state += power * (code - "0".charCodeAt(0))
		// }
		// if ("A".charCodeAt(0) <= code && code <= "Z".charCodeAt(0)) {
			// state += power * (code - "A".charCodeAt(0) + 10)
		// }
		// if ("a".charCodeAt(0) <= code && code <= "z".charCodeAt(0)) {
			// state += power * (code - "a".charCodeAt(0) + 36)
		// }
		// power *= 62
		// state %= n
		// power %= n
	// }
	// return state
// }