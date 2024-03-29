import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import { captureScreen } from "react-native-view-shot";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { api } from "../../constants/api";
import Loader from "../../Reuseable Components/Loader";
import Snackbar from "react-native-snackbar";
import firebaseNotificationApi from "../../constants/firebaseNotificationApi";

import { BASE_URL_Image } from "../../constants/Base_URL_Image";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const Groups = ({
  scale,
  showMenu,
  setShowMenu,
  moveToRight,
  setActiveTab,
}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [searchResults, setSearchResults] = useState([
    // {
    //   id: 0,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 1,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 2,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 3,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 4,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 5,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 6,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 7,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 8,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 9,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 10,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 11,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 12,
    //   group_name: "Groupname",
    // },
  ]);
  const [isSuggestedVisible, setIsSuggestedVisible] = useState(true);
  const [suggestedGroups, setSuggestedGroups] = useState([
    // {
    //   id: 0,
    //   group_name: "Incorruptible",
    //   status: false,
    // },
    // {
    //   id: 1,
    //   group_name: "Forest Foragers",
    //   status: false,
    // },
    // {
    //   id: 2,
    //   group_name: "Cyanide",
    //   status: false,
    // },
    // {
    //   id: 3,
    //   group_name: "Group Name",
    //   status: false,
    // },
    // {
    //   id: 4,
    //   group_name: "Group Name",
    //   status: false,
    // },
  ]);

  const [groupList, setGroupList] = useState([
    // {
    //   id: 0,
    //   name: "Carnage Coverage",
    // },
    // {
    //   id: 1,
    //   name: "Baseline Grid",
    // },
    // {
    //   id: 2,
    //   name: "Softlancers",
    // },
    // {
    //   id: 3,
    //   name: "PRTX",
    // },
    // {
    //   id: 4,
    //   name: "The Tungstens",
    // },
    // {
    //   id: 5,
    //   name: "The Nulls",
    // },
    // {
    //   id: 6,
    //   name: "Helium Hydroxide",
    // },
  ]);

  const [joinedGroupsList, setJoinedGroupsList] = useState([]);

  const handleonJoin = async (id, adminId, type) => {
    console.log({ id, adminId, type });

    // const newData = suggestedGroups.map(item => {
    //   if (id == item.id) {
    //     return {
    //       ...item,
    //       status: !item.status,
    //     };
    //   } else {
    //     return {
    //       ...item,
    //     };
    //   }
    // });
    // setSuggestedGroups(newData);

    let user_id = await AsyncStorage.getItem("user_id");
    setLoading(true);
    let data = {
      user_id: user_id,
      group_id: id,
      date: new Date(),
    };

    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(api.join_group, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result of join group :: ", result);
        if (result[0]?.error == false || result[0]?.error == "false") {
          if (type == "search") {
            const newData = searchResults.map((item) => {
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
            setSearchResults(newData);
          } else {
            const newData = suggestedGroups.map((item) => {
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
            setSuggestedGroups(newData);
          }
          sendPushNotification(adminId);
          Snackbar.show({
            text: result[0]?.message,
            duration: Snackbar.LENGTH_SHORT,
          });
        } else {
          Snackbar.show({
            text: result[0]?.message,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch((error) => {
        Snackbar.show({
          text: "Something went wrong.",
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => setLoading(false));
  };
  //send push notification to user
  const sendPushNotification = async (id) => {
    let logged_in_user = await AsyncStorage.getItem("user");
    let fullName = "";
    if (logged_in_user != null) {
      logged_in_user = JSON.parse(logged_in_user);
      fullName = logged_in_user?.first_name + " " + logged_in_user?.last_name;
    }

    let user = await firebaseNotificationApi.getFirebaseUser(id);
    if (!user) {
      user = await firebaseNotificationApi.getFirebaseUser(id);
    }

    if (user) {
      let token = user?.fcmToken;
      console.log("token_____", token);
      let title = "Group Request";
      let description = `${fullName} wants to join your Group...`;
      let data = {
        id: id,
        // user_id: id,
        // to_id: user?.ui
        type: "group_request",
      };
      await firebaseNotificationApi
        .sendPushNotification(token, title, description, data)
        .then((res) => console.log("notification response.....", res))
        .catch((err) => console.log(err));
      console.log("notification sent.......");
    } else {
      console.log("user not found");
    }
  };
  const handleOpenDrawer = (navigation) => {
    captureScreen({
      format: "jpg",
    })
      .then((uri) => {
        AsyncStorage.setItem("Screen", uri.toString());
        AsyncStorage.setItem("ScreenName", "Groups");
        navigation.openDrawer();
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    setLoading(true);
    // setSuggestedGroups([]);
    // getSuggestedGroupsList();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getSuggestedGroupsList();
      getLogged_in_user_groups();
      getMembersList();
      getJoinedGroups();
      getLoggedIn_user();
    }, [])
  );



  
  const getLoggedIn_user = async () => {
    let user_id = await AsyncStorage.getItem("user_id");
    console.log("logged in user id  ::: ", user_id);
  };

  const getRequestedGroupsList = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let user_id = await AsyncStorage.getItem("user_id");
        var requestOptions = {
          method: "POST",
          body: JSON.stringify({
            user_id: user_id,
          }),
          redirect: "follow",
        };
        fetch(api.get_requested_groups, requestOptions)
          .then((response) => response.json())
          .then(async (result) => {
            if (result[0]?.error == "true" || result[0]?.error == true) {
              resolve([]);
            } else {
              let responseList = result ? result : [];

              let list = [];
              for (const element of responseList) {
                // let groupInfo = await getGroup_Info(element["Group id"]);
                let groupInfo = await getGroup_Info(element?.group_id);
                if (groupInfo) {
                  if (user_id != groupInfo["Admin id"]) {
                    //not storing logged user own group list
                    let obj = {
                      // id: element["Group id"],
                      id: element?.group_id,
                      group_name: groupInfo.name,
                      adminId: groupInfo["Admin id"],
                      // status: element?.status,
                      image:
                        groupInfo !== false && groupInfo?.image_link
                          ? BASE_URL_Image + "/" + groupInfo?.image_link
                          : "",
                      status: true,
                    };
                    list.push(obj);
                  } else {
                    console.log("logged user own group");
                  }
                } else {
                  console.log(
                    "group info not found :::: ",
                    element["Group id"]
                  );
                }
              }
              resolve(list);
            }
          })
          .catch((error) => {
            console.log("error in getting requested groups", error);
            resolve([]);
          });
      } catch (error) {
        console.log("error in getting requested groups :::: ", error);
        resolve([]);
      }
    });
  };

  const getSuggestedGroupsList1 = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let user_id = await AsyncStorage.getItem("user_id");
        let data = {
          this_user_id: user_id,
        };
        var requestOptions = {
          method: "POST",
          body: JSON.stringify(data),
          redirect: "follow",
        };
        fetch(api.groupsuggestions, requestOptions)
          .then((response) => response.json())
          .then(async (result) => {
            let responseList = [];
            if (result?.length > 0) {
              // setSuggestedGroups(result);

              for (const element of result) {
                let groupInfo = await getGroup_Info(element["Group ID"]);
                if (user_id != element?.admin) {
                  //not storing logged in user created groups in suggested groups list
                  let obj = {
                    id: element["Group ID"],
                    group_name: element["Group Name"],
                    adminId: element?.admin,
                    // status: element?.status,
                    image:
                      groupInfo !== false && groupInfo?.image_link
                        ? BASE_URL_Image + "/" + groupInfo?.image_link
                        : "",
                    status: false,
                  };
                  responseList.push(obj);
                }
              }
            }
            // setSuggestedGroups(responseList);
            resolve(responseList);
          })
          .catch((error) => {
            resolve([]);
          });
      } catch (error) {
        resolve([]);
      }
    });
  };

  const getSuggestedGroupsList = async () => {
    setLoading(true);
    let requestedGroupsList = await getRequestedGroupsList();

    let suggestedGroupsList = await getSuggestedGroupsList1();
    let groupsList = requestedGroupsList.concat(suggestedGroupsList);
    setSuggestedGroups(groupsList);
    setLoading(false);
  };

  // const getSuggestedGroupsList = async () => {
  //   try {
  //     let user_id = await AsyncStorage.getItem("user_id");
  //     let data = {
  //       this_user_id: user_id,
  //     };
  //     var requestOptions = {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //       redirect: "follow",
  //     };

  //     fetch(api.groupsuggestions, requestOptions)
  //       .then((response) => response.json())
  //       .then(async (result) => {
  //         let responseList = [];
  //         if (result?.length > 0) {
  //           // setSuggestedGroups(result);

  //           for (const element of result) {
  //             let groupInfo = await getGroup_Info(element["Group ID"]);
  //             let obj = {
  //               id: element["Group ID"],
  //               group_name: element["Group Name"],
  //               adminId: element?.admin,
  //               // status: element?.status,
  //               image:
  //                 groupInfo !== false && groupInfo?.image_link
  //                   ? BASE_URL_Image + "/" + groupInfo?.image_link
  //                   : "",
  //               status: false,
  //             };
  //             responseList.push(obj);
  //           }
  //         }
  //         setSuggestedGroups(responseList);
  //       })
  //       .catch((error) => console.log("error", error))
  //       .finally(() => setLoading(false));
  //   } catch (error) {
  //     console.log("error :", error);
  //     setLoading(false);
  //   }
  // };
  const getLogged_in_user_groups = async () => {
    let user_id = await AsyncStorage.getItem("user_id");

    let data = {
      created_by_user_id: user_id,
    };
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(api.search_group_by_specific_admin, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.error == false || result?.error == "false") {
          let list = result?.Groups ? result?.Groups : [];
          // setGroupList(list);
          let list1 = [];
          for (const element of list) {
            let obj = {
              id: element?.id,
              created_by_user_id: element?.created_by_user_id,
              image: element?.image
                ? BASE_URL_Image + "/" + element?.image
                : "",
              name: element?.name,
              group_privacy: element?.group_privacy,
              group_visibility: element?.group_visibility,
              created_at: element?.created_at,
            };
            list1.push(obj);
          }
          setGroupList(list1);
        } else {
          setGroupList([]);
          Snackbar.show({
            text: result?.Message,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch((error) => {
        setGroupList([]);
        Snackbar.show({
          text: "Something went wrong.Unable to get groups.",
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => setLoading(false));
  };

  //getting login user joined groups list
  const getJoinedGroups = async () => {
    let user_id = await AsyncStorage.getItem("user_id");
    let data = {
      user_id: user_id,
    };
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(api.get_user_joined_groups, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        // console.log("groups list ::: ", result);
        if (result?.error == false || result?.error == "false") {
          let list = result?.Group ? result?.Group : [];

          let joinedGroup_List = [];
          let listOfGroups = [];
          if (list?.length > 0) {
            let filter = list?.filter(
              (item) => item?.status == "membered" || item?.status == "approved"
            );
            for (const element of filter) {
              let groupInfo = await getGroup_Info(element?.group_id);
              if (groupInfo != false) {
                if (groupInfo?.["Admin id"] == user_id) {
                  //not added is own created groups in joined group list
                } else {
                  let obj = {
                    id: element?.id,
                    group_id: element?.group_id,
                    user_id: element?.user_id,
                    status: element?.status,
                    created_at: element?.created_at,
                    group_info: {
                      id: groupInfo?.id,
                      image: groupInfo?.image_link
                        ? BASE_URL_Image + "/" + groupInfo?.image_link
                        : "",
                      name: groupInfo?.name,
                      adminId: groupInfo?.["Admin id"],
                      group_privacy: groupInfo?.group_privacy,
                      group_visibility: groupInfo?.group_visibility,
                      created_at: groupInfo?.created_at,
                    },
                  };
                  listOfGroups.push(obj);
                }
              }
            }
          }
          setJoinedGroupsList(listOfGroups);
        } else {
          setJoinedGroupsList([]);
          Snackbar.show({
            text: result?.Message,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch((error) => {
        Snackbar.show({
          text: "Something went wrong.Unable to get groups.",
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => setLoading(false));
  };

  const getjoin_group = () => {
    try {
    } catch (error) {
      console.log("error  :: ", error);
    }
  };

  //getting specific group info
  const getGroup_Info = (id) => {
    return new Promise((resolve, reject) => {
      try {
        var requestOptions = {
          method: "POST",
          body: JSON.stringify({
            id: id,
          }),
          redirect: "follow",
        };
        fetch(api.get_group_detail, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result?.length > 0) {
              resolve(result[0]);
            } else {
              resolve(false);
            }
          })
          .catch((error) => {
            resolve(false);
          });
      } catch (error) {
        resolve(false);
      }
    });
  };

  //TODO: latter on change with this spscifc user groups list
  // const getMyGroups = async () => {
  //   let user_id = await AsyncStorage.getItem("user_id");
  //   setLoading(true);
  //   setGroupList([]);
  //   let data = {
  //     created_by_user_id: "9",
  //   };
  //   var requestOptions = {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     redirect: "follow",
  //   };
  //   fetch(api.search_group_by_specific_admin, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result?.error == false || result?.error == "false") {
  //         let list = result?.Groups ? result?.Groups : [];
  //         setGroupList(list);
  //       } else {
  //         Snackbar.show({
  //           text: result?.Message,
  //           duration: Snackbar.LENGTH_SHORT,
  //         });
  //       }
  //       // let responseList = [];
  //       // if (result[0]?.profile == 'No Friends') {
  //       //   console.log('no friend found');
  //       // } else if (result[0]?.profile?.length > 0) {
  //       //   setFriendsList(result[0]?.profile);
  //       // }
  //     })
  //     .catch((error) =>
  //       console.log("error in getting my  groups list ::: ", error)
  //     )
  //     .finally(() => setLoading(false));
  // };

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     console.log('seearchy  text :::: ', searchText);
  //     // Send Axios request here
  //     searchGroup(searchText);
  //   }, 2500);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchText]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchText);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const handleSearch = (searchText) => {
    if (searchText) {
      setLoading(true);
      let data = {
        name: searchText,
      };
      var requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        redirect: "follow",
      };
      fetch(api.search_group, requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          let logged_in_user_id = await AsyncStorage.getItem("user_id");

          if (result[0]?.error == false || result[0]?.error == "false") {
            let groupsList = result[0]?.groups ? result[0]?.groups : [];
            // setSearchResults(groupsList);
            let list = [];
            if (groupsList?.length > 0) {
              groupsList.forEach((element) => {
                if (logged_in_user_id != element?.created_by_user_id) {
                  let obj = {
                    id: element?.id,
                    created_by_user_id: element?.created_by_user_id,
                    adminId: element?.created_by_user_id,
                    image: element?.image
                      ? BASE_URL_Image + "/" + element?.image
                      : "",
                    name: element?.name,
                    status: false,
                  };
                  list.push(obj);
                }
              });
            }
            setSearchResults(list);
          } else {
            setSearchResults([]);
            Snackbar.show({
              text: result[0]?.Message,
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch((error) => console.log("error in searching  group ", error))
        .finally(() => setLoading(false));
    }
  };

  const getMembersList = async () => {
    let user_id = await AsyncStorage.getItem("user_id");
    console.log("user_id ::: ", user_id);
    let data = {
      this_user_id: user_id,
    };
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(api.showmembers, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("show members list   ::: ", result);
        // let responseList = [];
        if (result[0]?.error == false) {
          let arr = result[0]?.["array of Members"]
            ? result[0]?.["array of Members"]
            : [];
          for (const element of arr) {
            console.log("element :  ", element);
          }
        } else if (result[0]?.profile?.length > 0) {
          setFriendsList(result[0]?.profile);
        }
      })
      .catch((error) => console.log("error in getting groups list ::: ", error))
      .finally(() => setLoading(false));
  };

  return (
    <Animated.View
      style={{
        zIndex: 999,
        flex: 1,
        backgroundColor: "white",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        borderRadius: showMenu ? 15 : 0,
        // transform: [{scale: scale}, {translateX: moveToRight}],
      }}
    >
      <View style={styles.container}>
        {loading && <Loader />}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            // paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              height: 40,
              justifyContent: "center",
              marginTop: 20,
              paddingHorizontal: 20,
            }}
          >
            {isSearch ? (
              <View style={styles.headerView}>
                <View style={styles.searchView}>
                  <TextInput
                    style={styles.searchTextIntput}
                    placeholder={"Search"}
                    value={searchText}
                    // onChangeText={txt => setSearchText(txt)}
                    onChangeText={(txt) => {
                      setSearchText(txt);
                      // handleSearch(txt);
                    }}
                  />
                  <Image
                    source={require("../../../assets/images/search.png")}
                    style={{ width: 23, height: 23 }}
                    resizeMode="stretch"
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setIsSearch(!isSearch);
                    setSearchText("");
                  }}
                  style={styles.btnCancel}
                >
                  <Text style={styles.btnCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.headerView}>
                {/* <Pressable onPress={() => handleOpenDrawer(navigation)}> */}
                <Pressable
                  onPress={() => {
                    Animated.timing(scale, {
                      toValue: showMenu ? 1 : 0.8,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();
                    Animated.timing(moveToRight, {
                      toValue: showMenu ? 0 : 230,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();
                    setActiveTab("Groups");
                    setShowMenu(!showMenu);
                  }}
                >
                  {/* <Image source={require('../../../assets/images/Line1.png')} />
                  <Image
                    source={require('../../../assets/images/Line2.png')}
                    style={{marginTop: 5}}
                  /> */}
                  <Image
                    source={require("../../../assets/images/menu1.png")}
                    style={{ width: 34, height: 17 }}
                  />
                </Pressable>
                <TouchableOpacity onPress={() => setIsSearch(!isSearch)}>
                  <Image
                    source={require("../../../assets/images/search.png")}
                    style={{ width: 23, height: 23 }}
                    resizeMode="stretch"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text style={{ ...styles.title, paddingHorizontal: 20 }}>Groups</Text>
          {searchText.length > 0 ? (
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
              {/* ----------------------Search Result List ---------------------------- */}
              <View style={{ marginVertical: 15, paddingBottom: 10 }}>
                <FlatList
                  data={searchResults}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  ListEmptyComponent={() => {
                    return (
                      <View
                        style={{
                          flex: 1,
                          height: SCREEN_HEIGHT * 0.7,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#000000",
                            fontSize: 16,
                          }}
                        >
                          No Record Found
                        </Text>
                      </View>
                    );
                  }}
                  renderItem={(item) => {
                    return (
                      <View style={{ ...styles.cardView, width: "28.9%" }}>
                        {item?.item?.image ? (
                          <Image
                            source={{ uri: item?.item?.image }}
                            style={{
                              marginVertical: 8,
                              width: 44,
                              height: 44,
                              borderRadius: 44,
                              backgroundColor: "#ccc",
                            }}
                          />
                        ) : (
                          <Image
                            source={require("../../../assets/images/group-profile.png")}
                            style={{ marginVertical: 8 }}
                          />
                        )}

                        <Text style={styles.cardText} numberOfLines={2}>
                          {/* {item.item.group_name} */}
                          {item?.item?.name}
                        </Text>
                        <View
                          style={{
                            justifyContent: "flex-end",
                            flex: 1,
                          }}
                        >
                          {item?.item?.status == false ? (
                            <TouchableOpacity
                              onPress={() =>
                                handleonJoin(
                                  item.item.id,
                                  item?.item?.adminId,
                                  "search"
                                )
                              }
                              style={styles.cardButton}
                            >
                              <Text style={{ color: "#ffffff", fontSize: 11 }}>
                                Join
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              // onPress={() => handleonJoin(item.item.id)}
                              style={{
                                ...styles.cardButton,
                                backgroundColor: "#d8d8d8",
                                width: 70,
                              }}
                            >
                              <Text style={{ color: "#ffffff", fontSize: 11 }}>
                                Requested
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 16,
                    fontFamily: "Rubik-Regular",
                  }}
                >
                  Suggested Groups
                </Text>

                <TouchableOpacity
                  style={{
                    height: 20,
                    width: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => setIsSuggestedVisible(!isSuggestedVisible)}
                >
                  {isSuggestedVisible ? (
                    <Image
                      source={require("../../../assets/images/arrow-up1.png")}
                      style={{ height: 9, width: 15 }}
                    />
                  ) : (
                    <Image
                      source={require("../../../assets/images/arrow-down1.png")}
                      style={{ height: 9, width: 15, tintColor: "#000" }}
                    />
                  )}
                </TouchableOpacity>
              </View>
              {/* ----------------------Suggested Groups List ---------------------------- */}
              <View
                style={{
                  marginVertical: 15,
                  paddingHorizontal: 10,
                }}
              >
                {isSuggestedVisible && (
                  <FlatList
                    data={suggestedGroups}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={(item) => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("JoinGroup", {
                              item: item?.item,
                            })
                          }
                          style={{ ...styles.cardView, width: 101 }}
                        >
                          {item?.item?.image ? (
                            <Image
                              source={{ uri: item?.item?.image }}
                              style={{
                                marginVertical: 8,
                                width: 44,
                                height: 44,
                                borderRadius: 44,
                                backgroundColor: "#ccc",
                              }}
                            />
                          ) : (
                            <Image
                              source={require("../../../assets/images/group-profile.png")}
                              style={{ marginVertical: 8 }}
                            />
                          )}

                          <Text style={styles.cardText} numberOfLines={2}>
                            {item.item.group_name}
                          </Text>
                          <View
                            style={{
                              justifyContent: "flex-end",
                              flex: 1,
                            }}
                          >
                            {item.item.status ? (
                              <TouchableOpacity
                                // onPress={() => handleonJoin(item.item.id)}
                                //onPress={() => console.log("item :: ", item)}
                                style={{
                                  ...styles.cardButton,
                                  backgroundColor: "#d8d8d8",
                                  width: 70,
                                }}
                              >
                                <Text
                                  style={{ color: "#ffffff", fontSize: 11 }}
                                >
                                  Requested
                                </Text>
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() =>
                                  handleonJoin(
                                    item.item.id,
                                    item?.item?.adminId
                                  )
                                }
                                style={styles.cardButton}
                              >
                                <Text
                                  style={{ color: "#ffffff", fontSize: 11 }}
                                >
                                  Join
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ color: "#000000", fontSize: 16 }}>Groups</Text>
                {groupList.length > 0 && (
                  <TouchableOpacity
                    style={{ ...styles.btnCreateGroup, width: 115, height: 33 }}
                    onPress={() => navigation.navigate("CreateGroup")}
                  >
                    <Text style={{ color: "#FFFFFF", fontSize: 13 }}>
                      Create a Group
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {groupList.length == 0 ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20,
                  }}
                >
                  <Image
                    source={require("../../../assets/images/group1.png")}
                    style={{ backgroundColor: "#FFFF", resizeMode: "contain" }}
                  />

                  <Text
                    style={{
                      width: 206,
                      textAlign: "center",
                      fontSize: 16,
                      color: "#000000",
                      marginVertical: 20,
                    }}
                  >
                    Create or join a group and compete in challenges with other
                    groups
                  </Text>
                  <TouchableOpacity
                    style={styles.btnCreateGroup}
                    onPress={() => navigation.navigate("CreateGroup")}
                  >
                    <Text style={{ color: "#FFFFFF", fontSize: 13 }}>
                      Create a Group
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    marginVertical: 15,
                    paddingBottom: 10,
                    paddingHorizontal: 20,
                  }}
                >
                  <FlatList
                    data={groupList}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(item) => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("GroupDetail", {
                              item: item?.item,
                            })
                          }
                          style={{
                            ...styles.cardView,
                            justifyContent: "center",
                            height: 110,
                            width: "28.9%",
                          }}
                        >
                          {item?.item?.image ? (
                            <Image
                              source={{ uri: item?.item?.image }}
                              style={{
                                marginVertical: 8,
                                height: 44,
                                width: 44,
                                borderRadius: 44,
                                backgroundColor: "#ccc",
                              }}
                            />
                          ) : (
                            <Image
                              source={require("../../../assets/images/group-profile.png")}
                              style={{ marginVertical: 8 }}
                            />
                          )}

                          <Text style={styles.cardText}>{item.item.name}</Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              )}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ color: "#000000", fontSize: 16 }}>
                  Joined Groups
                </Text>
              </View>

              <View
                style={{
                  marginVertical: 15,
                  paddingBottom: 10,
                  paddingHorizontal: 20,
                }}
              >
                <FlatList
                  data={joinedGroupsList}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  ListEmptyComponent={() => {
                    return (
                      <View
                        style={{
                          flex: 1,
                          height: 200,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#000000",
                            fontSize: 16,
                          }}
                        >
                          No Record Found
                        </Text>
                      </View>
                    );
                  }}
                  renderItem={(item) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("GroupDetail", {
                            item: item?.item?.group_info,
                            type: "joined",
                          })
                        }
                        style={{
                          ...styles.cardView,
                          justifyContent: "center",
                          height: 110,
                          width: "28.9%",
                        }}
                      >
                        {item?.item?.group_info?.image ? (
                          <Image
                            source={{ uri: item?.item?.group_info?.image }}
                            style={{
                              marginVertical: 8,
                              width: 44,
                              height: 44,
                              borderRadius: 44,
                              backgroundColor: "#ccc",
                            }}
                          />
                        ) : (
                          <Image
                            source={require("../../../assets/images/group-profile.png")}
                            style={{ marginVertical: 8 }}
                          />
                        )}

                        <Text style={styles.cardText} numberOfLines={2}>
                          {item?.item?.group_info?.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export default Groups;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    paddingHorizontal: 10,
  },
  searchTextIntput: {
    flex: 1,
    borderColor: "#FFFFFF",
    padding: 8,
    color: "#000000",
  },
  btnCancel: {
    flex: 0.25,
    height: "100%",
    justifyContent: "center",
  },
  btnCancelText: {
    textAlign: "right",
    color: "#4e4e4e",
    fontSize: 16,
  },
  title: {
    color: "#000000",
    fontSize: 30,
    marginTop: 12,
    fontFamily: "Rubik-Regular",
  },
  cardView: {
    height: 137,
    width: 92,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "blue",
    elevation: 5,
    padding: 5,
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 10,
    overflow: "hidden",
  },
  cardText: {
    color: "#040103",
    textAlign: "center",
    fontSize: 13,
    width: 75,
    fontFamily: "Rubik-Regular",
  },
  cardButton: {
    backgroundColor: "#38acff",
    width: 60,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    alignSelf: "flex-end",
    padding: 5,
  },
  btnCreateGroup: {
    width: 144,
    height: 40,
    backgroundColor: "#38acff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
