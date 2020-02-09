const uuidv1 = require("uuid/v1");

class Message {

    /**
     * 
     * @param {String} messageText 
     * @param {String} userId
     * @param {String} username
     * @return Return a message in the format that the client is expecting
     */
    static format = (messageText, username) => {
        return {
            _id: uuidv1(),
            text: messageText, 
            createdAt: Date.now(),
            user: {
                _id: this.generateUserId(),
                name: username
            }
        }
    }

    static generateUserId() {
        return uuidv1();
    }
}

module.exports = Message;