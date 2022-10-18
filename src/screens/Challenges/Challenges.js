import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Challenges = ({navigation, route}) => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([
    {
      id: 0,
      group_name: 'Summerbody Challenge',
    },
    {
      id: 1,
      group_name: '25km',
    },
    {
      id: 2,
      group_name: 'Cyanide',
    },
    {
      id: 3,
      group_name: 'Summerbody Challenge',
    },
    {
      id: 4,
      group_name: '25km',
    },
    {
      id: 5,
      group_name: 'Cyanide',
    },
    {
      id: 6,
      group_name: 'Summerbody Challenge',
    },
    {
      id: 7,
      group_name: '25km',
    },
    {
      id: 8,
      group_name: 'Cyanide',
    },
    {
      id: 9,
      group_name: 'Summerbody Challenge',
    },
    {
      id: 10,
      group_name: '25km',
    },
    {
      id: 11,
      group_name: 'Cyanide',
    },
    {
      id: 12,
      group_name: 'Summerbody Challenge',
    },
  ]);
  const [isSuggestedVisible, setIsSuggestedVisible] = useState(true);
  const [suggestedChallenges, setSuggestedChallenges] = useState([
    {
      id: 0,
      group_name: 'Summerbody Challenge',
      status: false,
    },
    {
      id: 1,
      group_name: '25km',
      status: false,
    },
    {
      id: 2,
      group_name: 'Cyanide',
      status: false,
    },
    {
      id: 3,
      group_name: 'Challenge Name',
      status: false,
    },
    {
      id: 4,
      group_name: 'Challenge Name',
      status: false,
    },
  ]);

  const handleonJoin = id => {
    const newData = suggestedChallenges.map(item => {
      if (id == item.id) {
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
    setSuggestedChallenges(newData);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          //   flex: 1,
          flexGrow: 1,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={{height: 40, justifyContent: 'center', marginTop: 20}}>
          {isSearch ? (
            <View style={styles.headerView}>
              <View style={styles.searchView}>
                <TextInput
                  style={styles.searchTextIntput}
                  placeholder={'Search'}
                  value={searchText}
                  onChangeText={txt => setSearchText(txt)}
                />
                <Image
                  source={require('../../../assets/images/search-small.png')}
                  style={{height: 20, width: 20}}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setIsSearch(!isSearch);
                  setSearchText('');
                }}
                style={styles.btnCancel}>
                <Text style={styles.btnCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.headerView}>
              <View>
                <Image source={require('../../../assets/images/Line1.png')} />
                <Image
                  source={require('../../../assets/images/Line2.png')}
                  style={{marginTop: 5}}
                />
              </View>
              <TouchableOpacity onPress={() => setIsSearch(!isSearch)}>
                <Image source={require('../../../assets/images/search.png')} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Text style={styles.title}>Challenges</Text>
        {searchText.length > 0 ? (
          <View style={{flex: 1}}>
            {/* ----------------------Search Result List ---------------------------- */}
            <View style={{marginVertical: 15, paddingBottom: 10}}>
              <FlatList
                data={searchResults}
                numColumns={3}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={item => {
                  return (
                    <View style={{...styles.cardView, width: '28.7%'}}>
                      <Image
                        source={require('../../../assets/images/group-profile.png')}
                        style={{marginVertical: 8}}
                      />
                      <Text style={styles.cardText}>
                        {item.item.group_name}
                      </Text>
                      <View
                        style={{
                          justifyContent: 'flex-end',
                          flex: 1,
                        }}>
                        <TouchableOpacity
                          onPress={() => handleonJoin(item.item.id)}
                          style={styles.cardButton}>
                          <Text style={{color: '#ffffff', fontSize: 11}}>
                            Participate
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 16,
                }}>
                Suggested Challenges
              </Text>

              <TouchableOpacity
                style={{
                  height: 20,
                  width: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setIsSuggestedVisible(!isSuggestedVisible)}>
                {isSuggestedVisible ? (
                  <Image
                    source={require('../../../assets/images/arrow-up1.png')}
                    style={{height: 9, width: 15}}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/images/arrow-down1.png')}
                    style={{height: 9, width: 15, tintColor: '#000'}}
                  />
                )}
              </TouchableOpacity>
            </View>
            {/* ----------------------Suggested Challenges List ---------------------------- */}
            <View
              style={{
                marginVertical: 15,
                width: SCREEN_WIDTH - 15,
                paddingRight: 15,
              }}>
              {isSuggestedVisible && (
                <FlatList
                  data={suggestedChallenges}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={item => {
                    return (
                      <View
                        style={{
                          ...styles.cardView,
                          width: 101,
                        }}>
                        <Image
                          source={require('../../../assets/images/group-profile.png')}
                          style={{marginVertical: 8}}
                        />

                        <Text style={styles.cardText}>
                          {item.item.group_name}
                        </Text>
                        <View
                          style={{
                            justifyContent: 'flex-end',
                            flex: 1,
                          }}>
                          {item.item.status ? (
                            <TouchableOpacity
                              onPress={() => handleonJoin(item.item.id)}
                              style={{
                                ...styles.cardButton,
                                backgroundColor: '#d8d8d8',
                              }}>
                              <Text style={{color: '#ffffff', fontSize: 11}}>
                                Participant
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => handleonJoin(item.item.id)}
                              style={styles.cardButton}>
                              <Text style={{color: '#ffffff', fontSize: 11}}>
                                Participate
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
            <View style={{flex: 1}}>
              <Text style={{color: '#000000', fontSize: 16}}>Challenges</Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../../../assets/images/trophy.png')}
                  style={{width: 119, height: 119, resizeMode: 'contain'}}
                />

                <Text
                  style={{
                    width: 206,
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#000000',
                    marginVertical: 20,
                  }}>
                  Create and compete in Challenges with friend and other groups
                </Text>
                <TouchableOpacity
                  style={styles.btnCreateGroup}
                  onPress={() => navigation.navigate('CreateChallenges')}>
                  <Text style={{color: '#FFFFFF', fontSize: 13}}>
                    Create Challenge
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Challenges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // padding: 20,
    // paddingHorizontal: 20,
    // paddingTop: 20,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 10,
  },
  searchTextIntput: {
    flex: 1,
    borderColor: '#FFFFFF',
    padding: 8,
    color: '#000000',
  },
  btnCancel: {
    flex: 0.25,
    height: '100%',
    justifyContent: 'center',
  },
  btnCancelText: {
    textAlign: 'right',
    color: '#4e4e4e',
    fontSize: 16,
  },
  title: {
    color: '#000000',
    fontSize: 30,
    marginTop: 8,
    fontWeight: 'bold',
  },
  cardView: {
    height: 137,
    width: 92,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: 'blue',
    elevation: 5,
    padding: 5,
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 10,
    overflow: 'hidden',
  },
  cardText: {
    color: '#040103',
    textAlign: 'center',
    fontSize: 13,
    // width: 75,
  },
  cardButton: {
    backgroundColor: '#38acff',
    // width: 60,
    width: 70,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    alignSelf: 'flex-end',
    padding: 5,
  },
  btnCreateGroup: {
    width: 144,
    height: 40,
    backgroundColor: '#38acff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});