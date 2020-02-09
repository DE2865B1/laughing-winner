## Hack4Impact Spring '20 Bootcamp challenge

## Bootcamp deliverable - due Feb 8th, 2020

For this project, we would like you to take the starter code and extend it so that we can send private messages. For example, you should be able to look up a receipient by email or username and then start a conversation thread with them. 
</br>

### Requirements:
Send messages privately 

### Nice to have
Persist conversation history

### Tips
Thoroughly read through the documents at https://socket.io/docs/, and look over https://socket.io/docs/emit-cheatsheet/. In order to look up users by their username or email address, you may need to implement a login system. To send messages privately, you will need the server to keep track of socket ids for each user when they sign on to the application. For this, you may want to implement a database such as mongodb: https://www.mongodb.com/what-is-mongodb. 

### Office Hours
https://calendar.google.com/calendar?cid=YnUuZWR1XzR0aDhycjVrOWMxajN0cnRmZjVxdmgyaTg0QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20


## Getting started

Install the following programs to setup your machine for the bootcamp.

Xcode: https://apps.apple.com/us/app/xcode/id497799835?mt=12 (Mac Only) </br>
OR </br>
Android Studio: https://developer.android.com/studio || https://docs.expo.io/versions/latest/workflow/android-studio-emulator/

Visual Studio Code: https://code.visualstudio.com/

NodeJs: https://nodejs.org/en/ (VERSION 13 or GREATER)

Expo: Execute this command from your command line `npm install expo-cli --global`

## Frontend dependencies

Install using `yarn add $package` in your client/ directory. 

@react-native-community/masked-view </br>
react-native-gifted-chat </br>
react-native-gesture-handler </br>
react-native-safe-area-context </br>
react-navigation </br>
react-navigation-stack </br>
