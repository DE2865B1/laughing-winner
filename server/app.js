const port = 3050; 
const io = require("socket.io")(port);
const Message = require("./Message");

var allPrivateMessages = []

console.log("Server running on port " + port);

io.on("connection", function(socket) {

	console.log("User connected");

	socket.on("privateMessage", function(data){
		const username = data.username
		const message = data.message; 
		console.log("Private Message received from ".concat(username));
		
		// Relay information
		messageRepresentation = Message.format(message, username)
		console.log(messageRepresentation)
		io.emit("privateMessage", messageRepresentation);
		
		// Store message
		allPrivateMessages.push(message)
	})

	socket.on("downloadPrivateHistory", function(data){
		const username = data.username
		history = constructPrivateHistory()
		for (var i = 0; i < allPrivateMessages.length; i++) {history = appendPrivateHistory(history, allPrivateMessages[i])}
		socket.emit("downloadPrivateHistoryReply", Message.format(history, username))
	})
})

function assertMessage(username, password, message) {
	if (!matches('[A-Za-z0-9]*', username)) {return false;}
	if (!matches('[A-Za-z0-9]*', password)) {return false;}
	if (!matches('[^_]*', message)) {return false;}
	return true
}

function matches(pattern, item) {
	const res = (new RegExp(pattern)).exec(item);
	if (res == null) {return false;}
	if (res.index != 0) {return false;}
	if (res[0].length != res.input.length) {return false;}
	return true;
}

// list of messages
function constructPrivateHistory() {
	return ""
}

function appendPrivateHistory(history, message) {
	return "".concat(history, "_", message)
}