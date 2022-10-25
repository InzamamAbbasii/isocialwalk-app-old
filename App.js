import React, {useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DrawerNavigations from './src/screens/Navigation/DrawerNavigations';

import Home from './src/screens/Home';
import SplashScreen from './src/screens/SplashScreen';
import AuthScreen from './src/screens/AuthScreen';
import Welcome from './src/screens/Welcome';
import TabNavigation from './src/screens/Navigation/TabNavigation';

//challenges
import CreateChallenges from './src/screens/Challenges/CreateChallenges';
import ChallengesDetail from './src/screens/Challenges/ChallengesDetail';

//groups
import CreateGroup from './src/screens/Groups/CreateGroup';
import GroupDetail from './src/screens/Groups/GroupDetail';
import JoinGroup from './src/screens/Groups/JoinGroup';

import Verification from './src/screens/Verification/Verification';
import AccountCreated from './src/screens/Verification/AccountCreated';
import ShareableInvitationLink from './src/screens/Friends/ShareableInvitationLink';
import Notification from './src/screens/Notification/Notification';

// friends
import FriendProfile from './src/screens/Friends/FriendProfile';
import FriendRequest from './src/screens/Friends/FriendRequest';
import AddFriend from './src/screens/Friends/AddFriend';

//history
import History from './src/screens/History/History';

import ChangePassword from './src/screens/ChangePassword';
import ForgotPassword from './src/screens/ForgotPassword';

import PrivacyPolicy from './src/screens/PrivacyPolicy';
import ConnectDevices from './src/screens/ConnectDevices';
import UpdateGoals from './src/screens/UpdateGoals';

// chat
import Chat from './src/screens/Chat/Chat';
import Conversations from './src/screens/Chat/Conversations';

import Summary from './src/screens/Summary';
import DaySummary from './src/screens/History/DaySummary';

import DrawerTest from './src/screens/DrawerTest';
import RNBootSplash from 'react-native-bootsplash';
function App() {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    // setTimeout(() => {
    // }, 1000);
    RNBootSplash.hide(); // immediate
    // cdmeo comment
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
      <Stack.Navigator>
        {/* <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DrawerTest"
          component={DrawerTest}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateChallenges"
          component={CreateChallenges}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateGroup"
          component={CreateGroup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Verification"
          component={Verification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AccountCreated"
          component={AccountCreated}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShareableInvitationLink"
          component={ShareableInvitationLink}
          options={{headerShown: false}}
        />
        {/* groups */}
        <Stack.Screen
          name="GroupDetail"
          component={GroupDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JoinGroup"
          component={JoinGroup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
        {/*  friends  */}
        <Stack.Screen
          name="FriendProfile"
          component={FriendProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FriendRequest"
          component={FriendRequest}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddFriend"
          component={AddFriend}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConnectDevices"
          component={ConnectDevices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdateGoals"
          component={UpdateGoals}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Conversations"
          component={Conversations}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Summary"
          component={Summary}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DaySummary"
          component={DaySummary}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChallengesDetail"
          component={ChallengesDetail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
// function App() {
//   return (
//     <NavigationContainer>
//       <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
//       <DrawerNavigations />
//     </NavigationContainer>
//   );
// }

// export default App;

// import * as React from 'react';
// import {View, Text, StatusBar} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import AuthScreen from './src/screens/AuthScreen';
// import Welcome from './src/screens/Welcome';
// import Home from './src/screens/Home';
// import TabNavigation from './src/screens/Navigation/TabNavigation';

// import CreateChallenges from './src/screens/Challenges/CreateChallenges';
// //groups
// import CreateGroup from './src/screens/Groups/CreateGroup';
// import GroupDetail from './src/screens/Groups/GroupDetail';
// import JoinGroup from './src/screens/Groups/JoinGroup';

// import Verification from './src/screens/Verification/Verification';
// import AccountCreated from './src/screens/Verification/AccountCreated';
// import ShareableInvitationLink from './src/screens/Friends/ShareableInvitationLink';
// import Notification from './src/screens/Notification/Notification';
// // friends
// import FriendProfile from './src/screens/Friends/FriendProfile';
// import FriendRequest from './src/screens/Friends/FriendRequest';

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Welcome"
//           component={Welcome}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="AuthScreen"
//           component={AuthScreen}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="TabNavigation"
//           component={TabNavigation}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="Home"
//           component={Home}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="CreateChallenges"
//           component={CreateChallenges}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="CreateGroup"
//           component={CreateGroup}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="Verification"
//           component={Verification}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="AccountCreated"
//           component={AccountCreated}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="ShareableInvitationLink"
//           component={ShareableInvitationLink}
//           options={{headerShown: false}}
//         />
//         {/* groups */}
//         <Stack.Screen
//           name="GroupDetail"
//           component={GroupDetail}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="JoinGroup"
//           component={JoinGroup}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="Notification"
//           component={Notification}
//           options={{headerShown: false}}
//         />
//         {/*  friends  */}
//         <Stack.Screen
//           name="FriendProfile"
//           component={FriendProfile}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="FriendRequest"
//           component={FriendRequest}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;
