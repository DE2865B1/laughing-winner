## Hack4Impact Spring '20 Bootcamp challenge

## Using the app

1. In terminal, cd to the [server/](/server/) folder and execute the command `node app`
1. In terminal, cd to the [client/](/client/) folder and execute the command `expo start`
	* Executing this command should have opened a web browser to the Metro Bundler page. If not, then in terminal, look for the URL that Expo DevTools is running at and open your web browser to that URL.
1. In the Metro Bundler page, click Run in web browser
	* A new web page should open up to the chat app's login screen.
1. Type a username.
1. Type a password.
	* At the moment, the password doesn't do anything.
1. Hit the enter button.
1. You are now at the list of conversations page. Here, you see all the people with whom you have an existing private conversation. You can enter into a conversation in one of two ways:
	* Clicking on the avatar icon in the list of conversations.
	* Typing the name of the recipient at the bottom and hitting send.
1. You are now at the private conversation page. You can type messages at the bottom and hit send to send the message. You can click the left arrow at the top left corner to go back to the list of conversations page.

## Dependencies

Install the following programs to setup your machine.

NodeJs: https://nodejs.org/en/ (VERSION 13 or GREATER)

Expo: Execute this command from your command line `npm install expo-cli --global`

Install using `yarn add $package` in your client/ directory. 

@react-native-community/masked-view </br>
react-native-gifted-chat </br>
react-native-gesture-handler </br>
react-native-safe-area-context </br>
react-navigation </br>
react-navigation-stack </br>
