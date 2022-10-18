import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Platform,
  Dimensions,
} from 'react-native';
import moment from 'moment/moment';
import Header from '../../Reuseable Components/Header';
import DropDownPicker from 'react-native-dropdown-picker';
const SCREEN_WIDTH = Dimensions.get('screen').width;
const CreateGroup = ({navigation}) => {
  const [groupName, setGroupName] = useState('');
  const [isValidGroupName, setIsValidGroupName] = useState(true);
  // membership list
  const [isMembershipopen, setIsMembershipopen] = useState(false);
  const [membershipList, setMembershipList] = useState([
    {label: 'Anyone can join', value: 'Anyone can join'},
    {label: 'Permission Required', value: 'Permission Required'},
  ]);
  const [selectedMembership, setSelectedMembership] = useState(
    membershipList[0].value,
  );

  //   members list

  const [membersList, setMembersList] = useState([
    {
      id: 0,
      name: 'Groupname',
      status: false,
    },
    {
      id: 1,
      name: 'Groupname',
      status: false,
    },
    {
      id: 2,
      name: 'Groupname',
      status: false,
    },
    {
      id: 3,
      name: 'Groupname',
      status: false,
    },
  ]);

  const handleonAdd = id => {
    const newData = membersList.map(item => {
      if (id === item.id) {
        return {
          ...item,
          status: !item.status,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    setMembersList(newData);
  };

  const handleCreateGroup = () => {
    if (groupName.length === 0) {
      setIsValidGroupName(false);
    } else {
      setIsValidGroupName(true);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}>
        <Header title={'Create Group'} navigation={navigation} />
        <View style={{marginVertical: 10, alignItems: 'center'}}>
          <View style={{}}>
            <Image
              source={require('../../../assets/images/group-profile2.png')}
              style={{
                marginVertical: 10,
                height: 123,
                width: 123,
              }}
            />
            <Image
              source={require('../../../assets/images/camera.png')}
              style={{
                width: 30,
                height: 28,
                resizeMode: 'contain',
                position: 'absolute',
                right: 0,
                top: 20,
              }}
            />
          </View>

          <Text style={{color: '#000000', fontSize: 17}}>Group image</Text>
        </View>
        <View>
          <View style={styles.textInputView}>
            <Text style={styles.textInputHeading}>Group Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Enter Group Name'}
              value={groupName}
              onChangeText={txt => setGroupName(txt)}
            />
            {!isValidGroupName && (
              <Text style={styles.errorText}>Please enter a group name</Text>
            )}
          </View>
          <View style={styles.textInputView}>
            <Text style={styles.textInputHeading}>Group Membership</Text>
            <DropDownPicker
              zIndex={isMembershipopen ? 999 : 0}
              open={isMembershipopen}
              value={selectedMembership}
              items={membershipList}
              setOpen={setIsMembershipopen}
              setValue={setSelectedMembership}
              setItems={setMembershipList}
              containerStyle={{
                width: '100%',
              }}
              dropDownContainerStyle={{
                padding: 0,
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 4,
              }}
              showTickIcon={false}
              selectedItemContainerStyle={{
                backgroundColor: '#0496ff',
                marginHorizontal: 5,
              }}
              selectedItemLabelStyle={{
                color: '#FFF',
              }}
              scrollViewProps={{
                showsVerticalScrollIndicator: false,
                showsHorizontalScrollIndicator: false,
              }}
              labelStyle={{
                fontSize: 14,
                textAlign: 'left',
                paddingLeft: 5,
              }}
              style={{
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#ccc',
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            />
          </View>

          <View
            style={{
              marginVertical: 15,
              width: SCREEN_WIDTH - 15,
              paddingRight: 15,
            }}>
            <Text
              style={{
                color: '#000000',
                fontSize: 16,
              }}>
              Add Members
            </Text>
            {membersList.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 150,
                }}>
                <Text style={{color: '#000000', fontSize: 16}}>
                  No friends to add
                </Text>
              </View>
            ) : (
              <FlatList
                data={membersList}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={item => {
                  return (
                    <View style={styles.cardView}>
                      <Image
                        source={require('../../../assets/images/friend-profile.png')}
                        style={{marginVertical: 8, width: 44, height: 44}}
                      />
                      <Text style={styles.name}>{item.item.name}</Text>
                      <View
                        style={{
                          justifyContent: 'flex-end',
                          flex: 1,
                        }}>
                        {item.item.status ? (
                          <TouchableOpacity
                            onPress={() => handleonAdd(item.item.id)}
                            style={styles.cardButton}>
                            <Text style={{color: '#ffffff', fontSize: 11}}>
                              Added
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => handleonAdd(item.item.id)}
                            style={{
                              ...styles.cardButton,
                              backgroundColor: '#38acff',
                              width: 60,
                            }}>
                            <Text style={{color: '#ffffff', fontSize: 11}}>
                              Add
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  );
                }}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleCreateGroup()}>
            <Text style={styles.btnText}>Create Group</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  textInputView: {
    marginVertical: 12,
  },
  textInputHeading: {
    color: '#000000',
    fontSize: 17,
    marginVertical: 5,
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 9,
    paddingHorizontal: 17,
    borderRadius: 5,
  },

  cardView: {
    height: 137,
    width: 101,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: 'blue',
    elevation: 5,
    padding: 5,
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 25,
    overflow: 'hidden',
  },
  cardButton: {
    backgroundColor: '#d8d8d8',
    width: 70,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    alignSelf: 'flex-end',
    padding: 5,
  },
  name: {
    color: '#040103',
    textAlign: 'center',
    fontSize: 13,
    width: 75,
  },
  btn: {
    backgroundColor: '#38acff',
    marginBottom: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnText: {color: '#ffffff', fontSize: 17},
  errorText: {
    color: '#D66262',
    fontSize: 12,
    marginLeft: 10,
    marginTop: 3,
  },
});