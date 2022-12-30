import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Header from "../../Reuseable Components/Header";
import RBSheet from "react-native-raw-bottom-sheet";

import moment from "moment";
import { api } from "../../constants/api";
import Loader from "../../Reuseable Components/Loader";
import Snackbar from "react-native-snackbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { BASE_URL_Image } from "../../constants/Base_URL_Image";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const ChallengesDetail = ({ navigation, route }) => {
  const bottomSheetRef = useRef();
  const bottomSheetAddMemberRef = useRef();
  const bottomSheetRemoveMemberRef = useRef();
  const [participantList, setParticipantList] = useState([
    // {
    //   id: 0,
    //   name: "Me",
    //   steps: 9000,
    //   avater: require("../../../assets/images/user1.png"),
    // },
    // {
    //   id: 1,
    //   name: "Nahla",
    //   steps: 8000,
    //   avater: require("../../../assets/images/user2.png"),
    // },
    // {
    //   id: 2,
    //   name: "Saffa",
    //   steps: 7000,
    //   avater: require("../../../assets/images/user3.png"),
    // },
    // {
    //   id: 3,
    //   name: "Rui",
    //   steps: 6000,
    //   avater: require("../../../assets/images/friend-profile.png"),
    // },
    // {
    //   id: 4,
    //   name: "Anum",
    //   steps: 5000,
    //   avater: require("../../../assets/images/friend-profile.png"),
    // },
    // {
    //   id: 5,
    //   name: "Zaina",
    //   steps: 4000,
    //   avater: require("../../../assets/images/friend-profile.png"),
    // },
    // {
    //   id: 6,
    //   name: "Noami",
    //   steps: 3000,
    //   avater: require("../../../assets/images/friend-profile.png"),
    // },
    // {
    //   id: 7,
    //   name: "Noami",
    //   steps: 2000,
    //   avater: require("../../../assets/images/friend-profile.png"),
    // },
    // {
    //   id: 8,
    //   name: "Noami",
    //   steps: 1000,
    //   avater: require("../../../assets/images/friend-profile.png"),
    // },
    // {
    //   id: 9,
    //   name: "Noami",
    //   steps: 500,
    //   avater: require("../../../assets/images/friend-profile.png"),
    // },
  ]);

  const [allMembersList, setAllMembersList] = useState([
    {
      id: 0,
      name: "Me",
      avater: require("../../../assets/images/friend-profile.png"),
      selected: false,
    },
    {
      id: 1,
      name: "Nahla",
      avater: require("../../../assets/images/friend-profile.png"),
      selected: false,
    },
    {
      id: 2,
      name: "Saffa",
      avater: require("../../../assets/images/friend-profile.png"),
      selected: false,
    },
    {
      id: 3,
      name: "Rui",
      avater: require("../../../assets/images/friend-profile.png"),
      selected: false,
    },
    {
      id: 4,
      name: "Anum",
      avater: require("../../../assets/images/friend-profile.png"),
      selected: false,
    },
    {
      id: 5,
      name: "Zaina",
      avater: require("../../../assets/images/friend-profile.png"),
      selected: true,
    },
    // {
    //   id: 6,
    //   name: 'Noami',
    // avater:require('../../../assets/images/friend-profile.png')
    // selected: false,
    // },
  ]);
  const [addMembersList, setAddMembersList] = useState([]);

  const [challenge_GroupsList, setChallenge_GroupsList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [logged_in_user_id, setLogged_in_user_id] = useState("");
  const [endDate, setEndDate] = useState("");
  const [profile, setProfile] = useState("");
  const [adminId, setAdminId] = useState("");
  const [name, setName] = useState("");
  const [challenge_type, setChallenge_type] = useState("");
  const [type, setType] = useState("");
  const [metric_no, setMetric_no] = useState("");
  const [step_type, setStep_type] = useState("");
  const [challengeId, setChallengeId] = useState("");

  const [ends_in, setEnds_in] = useState("");

  const [challengeImage, setchallengeImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const getLoggedInUser = async () => {
    let user_id = await AsyncStorage.getItem("user_id");
    setLogged_in_user_id(user_id);
  };
  useEffect(() => {
    getLoggedInUser();
    if (route?.params) {
      let {
        id,
        created_by_user_id,
        image,
        name,
        challenge_type,
        end_date,
        challenge_metric_no,
        challenge_metric_step_type,
      } = route?.params?.item;

      getChallengeDetail(id);

      var now = moment(new Date()); //todays date
      var end = moment(end_date); // another date
      var duration = moment.duration(end.diff(now));
      var days = duration.asDays();
      setEnds_in(days?.toFixed(0));
    }
  }, [route?.params]);

  const getChallengeDetail = (id) => {
    setLoading(true);
    let data = {
      challenge_id: id,
    };
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(api.get_challenge_details, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.error == false || result?.error == "false") {
          let detail = result?.Challenge[0] ? result?.Challenge[0] : null;
          if (detail == null) {
            Snackbar.show({
              text: "Challenge Detail Not Found",
              duration: Snackbar.LENGTH_SHORT,
            });
          } else {
            setChallengeId(detail?.id);
            setAdminId(detail?.created_by_user_id);
            setName(detail?.name);
            let imageUrl = detail?.image
              ? BASE_URL_Image + "/" + detail?.image
              : "";

            setchallengeImage(imageUrl);
            setChallenge_type(detail?.challenge_type);

            // if challenge type is individual the  get group members list. if challenge type is group then get challenge groups list
            if (detail?.challenge_type == "group") {
              //getting groups list that is added in this  challenge
              getGroupsInChallenge(id);
            } else {
              //get add members list
              getAddMembersList(id);
            }

            setEndDate(detail?.end_date);
            setMetric_no(detail?.challenge_metric_no);
            setType(detail?.challenge_metric_step_type);

            //getting challenge participants ranking
            getIndividualChallengeRanking(
              detail?.id,
              detail?.challenge_metric_no
            );
          }
        } else {
          Snackbar.show({
            text: result?.message,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch((error) => {
        console.log("error :: ", error);
        Snackbar.show({
          text: "Something went wrong.",
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => setLoading(false));
  };

  //get individual challenge ranlking
  const getIndividualChallengeRanking = (id, metric_no) => {
    console.log("challenge _ id ::: ", id);
    setLoading(true);
    let data = {
      challenge_id: id,
    };
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(api.get_individual_challenge_ranking, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.error == true || result?.error == "true") {
          Snackbar.show({
            text: result[0]?.message,
            duration: Snackbar.LENGTH_SHORT,
          });
        } else {
          let rankingList = result ? result : [];
          let list = [];
          for (const element of rankingList) {
            let user_id = element["user id"];
            if (user_id) {
              let user_info = await getUser_Info(user_id);
              //getting false when user detail not found

              if (user_info !== false) {
                let percentage = element?.steps
                  ? (element?.steps / metric_no) * 100
                  : 0;

                let obj = {
                  id: element?.id,
                  steps: element?.steps ? element?.steps : 0,
                  percentage: parseFloat(percentage.toFixed(2)),
                  // percentage: 10,

                  user_info: {
                    id: user_id,
                    first_name: user_info?.first_name,
                    last_name: user_info?.last_name,
                    image: user_info["profile image"]
                      ? BASE_URL_Image + "/" + user_info["profile image"]
                      : "",
                  },
                };
                list.push(obj);
              }
            }
          }
          if (list?.length > 0) {
            list.sort(function (a, b) {
              return b?.steps - a?.steps;
            });
          }
          setParticipantList(list);
        }
      })
      .catch((error) => {
        console.log("error :: ", error);
        Snackbar.show({
          text: "Something went wrong.",
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => setLoading(false));
  };

  //get groups in a challenge

  const getGroupsInChallenge = async (challangeId) => {
    setLoading(true);
    let data = {
      challenge_id: challangeId,
    };
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(api.get_groups_of_specific_challenge, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        // console.log("groups list :::: ", result);
        if (result?.error == false || result?.error == "false") {
          let responseList = result?.Challenges ? result?.Challenges : [];
          let list = [];
          for (const element of responseList) {
            let groupInfo = await getGroup_Info(element?.group_id);
            if (groupInfo !== false) {
              let obj = {
                id: element?.id,
                noti_type_id: element?.noti_type_id,
                challenge_id: element?.challenge_id,
                group_id: element?.group_id,
                status: element?.status,
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
              list?.push(obj);
            }
          }
          setChallenge_GroupsList(list);
        } else {
          Snackbar.show({
            text: result?.Message,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch((error) => {
        console.log("error :: ", error);
        Snackbar.show({
          text: "Something went wrong.",
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => setLoading(false));
  };

  //getting user detail
  const getUser_Info = (id) => {
    return new Promise((resolve, reject) => {
      try {
        var requestOptions = {
          method: "POST",
          body: JSON.stringify({
            user_id: id,
          }),
          redirect: "follow",
        };
        fetch(api.get_specific_user, requestOptions)
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
            console.log("error in getting user detail ::", error);
            resolve(false);
          });
      } catch (error) {
        console.log("error occur in getting user profile detail ::", error);
        resolve(false);
      }
    });
  };

  //getting those memebers list that are not added yet in this challenge
  const getAddMembersList = async (challengeId) => {
    let user_id = await AsyncStorage.getItem("user_id");
    setLoading(true);
    let data = {
      this_user_id: user_id,
      challenge_id: challengeId,
    };
    console.log("add memmber data :: ", data);
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };

    fetch(api.show_challenge_participants, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        // if (result[0]?.error == false || result[0]?.error == false) {

        // console.log("add member list response  ::: ", result);
        // console.log("cjhallgennge paticipatns list :: ", result);
        // let list = result[0]["array of Members"]
        //   ? result[0]["array of Members"]
        //   : [];

        let response = result ? result : [];
        let last_item = response?.pop();
        console.log("last item  ::", last_item);
        let list = last_item["array of participants"]
          ? last_item["array of participants"]
          : [];
        let responseList = [];
        for (const element of list) {
          let user_info = await getUser_Info(element);
          if (user_info == false) {
            console.log("user detail not found ....");
          } else {
            // let obj = {
            //   id: element, //userid
            //   name: user_info?.first_name,
            //   profile: user_info["profile image"]
            //     ? BASE_URL_Image + "/" + user_info["profile image"]
            //     : "",
            //   status: false,
            // };

            let obj = {
              // id: 0,
              steps: 0,
              percentage: 0,
              id: element, //userid
              name: user_info?.first_name,
              profile: user_info["profile image"]
                ? BASE_URL_Image + "/" + user_info["profile image"]
                : "",
              status: false,
              user_info: {
                id: element,
                first_name: user_info?.first_name,
                last_name: user_info?.last_name,
                image: user_info["profile image"]
                  ? BASE_URL_Image + "/" + user_info["profile image"]
                  : "",
              },
            };

            responseList.push(obj);
          }
        }
        setAddMembersList(responseList);
        // } else {
        //   Snackbar.show({
        //     text: result[0]?.message,
        //     duration: Snackbar.LENGTH_SHORT,
        //   });
        // }
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  };

  //add selected to members to this challenge
  const handleAddMemberToChallenge = () => {
    let memberList = addMembersList
      ?.filter((item) => item?.status == true)
      ?.map((element) => element?.user_info?.id);
    console.log("selected members list  ::: ", memberList);
    if (memberList?.length > 0) {
      bottomSheetAddMemberRef?.current?.close();
      setLoading(true);

      let data = {
        user_id: memberList,
        challenge_id: challengeId,
        created_by_user_id: adminId,
      };
      console.log("data pass  to add members in challgee api  : ", data);
      var requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        redirect: "follow",
      };

      fetch(api.add_participants_to_Challenge, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          Snackbar.show({
            text: result[0]?.message,
            duration: Snackbar.LENGTH_SHORT,
          });

          //TODO: getting selected memberes to add in group
          const newData = addMembersList.filter(
            (item) => item?.status === true
          );
          setParticipantList(participantList.concat(newData));
          //TODO: also remove selected memebers from addedmembers list
          const newData1 = addMembersList.filter(
            (item) => item.status === false
          );
          setAddMembersList(newData1);
        })
        .catch((error) => {
          console.log("error in add members  ::::  ", error);
          Snackbar.show({
            text: "Something went wrong.Members are not added to challenge.",
            duration: Snackbar.LENGTH_SHORT,
          });
        })
        .finally(() => setLoading(false));
    } else {
      console.log("please select memes to add");
      Snackbar.show({
        text: "Please Select Members to add.",
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  //hanale select member to add
  const handleAddMemberSelect = (id) => {
    console.log("user id select :: ", id);
    const newData = addMembersList.map((item) => {
      console.log("item :: ", item);
      if (id === item?.user_info?.id) {
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
    setAddMembersList(newData);
  };
  //handle selecet memebers to remove from challenge
  const handleSelectMember_ToRemove = (id) => {
    const newData = participantList.map((item) => {
      if (id === item?.user_info?.id) {
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
    setParticipantList(newData);
  };

  //handle remove memebers from challenge
  const handleRemoveMember_FromChallenge = () => {
    let memberList = participantList
      ?.filter((item) => item?.status == true)
      ?.map((element) => element?.user_info?.id);
    console.log(
      "selected members list to remove from challenge ::: ",
      memberList
    );
    let count = 0;
    if (memberList?.length > 0) {
      bottomSheetRemoveMemberRef?.current?.close();
      setLoading(true);
      for (const element of memberList) {
        count++;
        let data = {
          user_id: element,
          challenge_id: challengeId,
        };
        console.log("data pass  to add members in challgee api  : ", data);
        var requestOptions = {
          method: "POST",
          body: JSON.stringify(data),
          redirect: "follow",
        };

        fetch(api.remove_participant_from_challenge, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log("result  :: ", result);
            if (result?.error == false || result?.error == "false") {
              const filter = participantList?.filter(
                (item) => item?.user_info?.id != element
              );
              setParticipantList(filter);
            }
            // Snackbar.show({
            //   text: result[0]?.message,
            //   duration: Snackbar.LENGTH_SHORT,
            // });
          })
          .catch((error) => {
            console.log("error in remove members  ::::  ", error);
            Snackbar.show({
              text: "Something went wrong.Members are not removed to challenge.",
              duration: Snackbar.LENGTH_SHORT,
            });
          })
          .finally(() => {
            if (count >= memberList?.length) {
              Snackbar.show({
                text: "Members are successfully removed.",
                duration: Snackbar.LENGTH_SHORT,
              });
              setLoading(false);
            }
          });
      }
    } else {
      setLoading(false);
      Snackbar.show({
        text: "Please Select Members to remove.",
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };
  const pickImage = async () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    await launchImageLibrary(options)
      .then((res) => {
        console.log("images selected :: ", res.assets[0]?.fileName);
        setFileName(res.assets[0]?.fileName);
        setFileType(res.assets[0]?.type);
        setchallengeImage(res.assets[0].uri);
        handleUploadImage(
          challengeId,
          res.assets[0].uri,
          res.assets[0]?.fileName,
          res.assets[0]?.type
        );
      })
      .catch((error) => console.log(error));
  };

  const handleUploadImage = (challangeId, image, fileName, fileType) => {
    if (challangeId && image) {
      setLoading(true);
      let formData = new FormData();
      formData.append("id", challangeId);
      let obj = {
        uri: image,
        type: fileType,
        name: fileName,
      };
      console.log("image obj  : ", obj);
      formData.append("image", obj);

      // body.append('Content-Type', 'image/png');
      var requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };

      fetch(api.upload_challenge_image, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          Snackbar.show({
            text: result[0]?.message,
            duration: Snackbar.LENGTH_SHORT,
          });
        })
        .catch((error) =>
          console.log("error in uploading group image :: ", error)
        )
        .finally(() => setLoading(false));
    }
  };

  //handle leave challenge

  const handleLeaveChallenge = async () => {
    let user_id = await AsyncStorage.getItem("user_id");
    if (challengeId) {
      setLoading(true);
      let data = {
        user_id: user_id,
        challenge_id: challengeId,
      };
      var requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        redirect: "follow",
      };

      fetch(api.leave_challenges, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("result  :: ", result);
          if (result[0]?.error == false || result[0]?.error == "false") {
            Snackbar.show({
              text: "You Leave Challenge Successfully.",
              duration: Snackbar.LENGTH_SHORT,
            });
            navigation?.goBack();
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
        .finally(() => {
          setLoading(false);
        });
    } else {
      Snackbar.show({
        text: "Challenge Id not found.",
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  //handel delete challenge
  const handleDeleteChallenge = async () => {
    if (challengeId) {
      setLoading(true);
      let data = {
        challenge_id: challengeId,
      };
      var requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        redirect: "follow",
      };

      fetch(api.delete_challenge, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log("result  :: ", result);
          // if (result[0]?.error == false || result[0]?.error == "false") {
          //   Snackbar.show({
          //     text: "You Leave Challenge Successfully.",
          //     duration: Snackbar.LENGTH_SHORT,
          //   });
          //   navigation?.goBack();
          // } else {
          Snackbar.show({
            text: result[0]?.message,
            duration: Snackbar.LENGTH_SHORT,
          });
          // }
        })
        .catch((error) => {
          console.log("error :: ", error);

          Snackbar.show({
            text: "Something went wrong.",
            duration: Snackbar.LENGTH_SHORT,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      Snackbar.show({
        text: "Challenge Id not found.",
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <Header title={name} navigation={navigation} />
        </View>
        {loading && <Loader />}
        <View
          style={{
            marginVertical: 10,
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          {/* <Image
            source={require("../../../assets/images/Challenge.png")}
            style={{
              marginVertical: 12,
              height: 123,
              width: 123,
            }}
          /> */}

          <View style={{}}>
            {challengeImage == null || challengeImage == "" ? (
              <Image
                source={require("../../../assets/images/Challenge.png")}
                style={{
                  marginVertical: 10,
                  height: 123,
                  width: 123,
                }}
              />
            ) : (
              <Image
                source={{ uri: challengeImage }}
                style={{
                  marginVertical: 10,
                  height: 123,
                  width: 123,
                  borderRadius: 123,
                  backgroundColor: "#ccc",
                }}
              />
            )}

            {adminId == logged_in_user_id && (
              <TouchableOpacity
                onPress={() => pickImage()}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 20,
                }}
              >
                <Image
                  source={require("../../../assets/images/camera.png")}
                  style={{
                    width: 30,
                    height: 28,
                    borderRadius: 30,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            {logged_in_user_id == adminId && (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => bottomSheetAddMemberRef?.current?.open()}
              >
                <Text style={{ color: "#FFF", fontSize: 16 }}>Add Members</Text>
              </TouchableOpacity>
            )}
            {route?.params?.type == "joined" ? (
              <TouchableOpacity
                onPress={() => handleLeaveChallenge()}
                style={{
                  ...styles.btn,
                  backgroundColor: "transparent",
                  borderColor: "#38ACFF",
                  borderWidth: 1,
                }}
              >
                <Text style={{ color: "#38ACFF", fontSize: 14 }}>
                  Leave Challenge
                </Text>
              </TouchableOpacity>
            ) : (
              adminId == logged_in_user_id && (
                <TouchableOpacity
                  onPress={() => handleDeleteChallenge()}
                  style={{
                    ...styles.btn,
                    backgroundColor: "transparent",
                    borderColor: "#38ACFF",
                    borderWidth: 1,
                  }}
                >
                  <Text style={{ color: "#38ACFF", fontSize: 14 }}>
                    Delete Challenge
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "90%",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View>
              <Text
                style={{
                  color: "#000",
                  fontSize: 14,
                  fontFamily: "Rubik-Regular",
                }}
              >
                Ends in:
              </Text>
              <Text
                style={{
                  color: "#38ACFF",
                  fontSize: 14,
                  marginTop: 4,
                  fontFamily: "Rubik-Medium",
                }}
              >
                {ends_in} Days:
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#000",
                  fontSize: 14,
                  fontFamily: "Rubik-Regular",
                }}
              >
                Challenge:
              </Text>
              <Text
                style={{
                  color: "#38ACFF",
                  fontSize: 14,
                  marginTop: 4,
                  fontFamily: "Rubik-Medium",
                }}
              >
                {metric_no} Total Steps
              </Text>
            </View>
          </View>
        </View>

        {challenge_type == "group" ? (
          <View style={{ marginTop: 10 }}>
            {/* ____________________________________Groups _____________________________________________ */}
            <Text
              style={{
                color: "#000000",
                fontSize: 16,
                fontFamily: "Rubik-Regular",
                paddingHorizontal: 20,
              }}
            >
              Groups/Results
            </Text>

            <View
              style={{
                marginVertical: 15,
                paddingBottom: 10,
                paddingHorizontal: 20,
              }}
            >
              <FlatList
                data={challenge_GroupsList}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        flex: 1,
                        height: SCREEN_HEIGHT * 0.4,
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
                        No Result Found
                      </Text>
                    </View>
                  );
                }}
                renderItem={(item) => {
                  return (
                    <View
                      style={{
                        ...styles.cardView,
                        justifyContent: "center",
                        height: 120,
                        width: "28.9%",
                      }}
                    >
                      <View style={{ marginBottom: 3 }}>
                        {item?.item?.group_info?.image != "" ? (
                          <Image
                            source={{ uri: item.item?.group_info.image }}
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
                            source={require("../../../assets/images/friend-profile.png")}
                            style={{
                              marginVertical: 8,
                              width: 44,
                              height: 44,
                            }}
                          />
                        )}
                      </View>
                      <Text style={styles.cardText} numberOfLines={2}>
                        {item?.item?.group_info?.name}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        ) : (
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  color: "#000000",
                  fontSize: 16,
                  fontFamily: "Rubik-Regular",
                  // paddingHorizontal: 20,
                }}
              >
                Participants/Results
              </Text>
              {logged_in_user_id == adminId && (
                <TouchableOpacity
                  onPress={() => bottomSheetRemoveMemberRef?.current?.open()}
                >
                  <Text
                    style={{
                      color: "#6f92c9",
                      fontSize: 16,
                      fontFamily: "Rubik-Regular",
                    }}
                  >
                    Remove Member
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View
              style={{
                marginVertical: 15,
                paddingBottom: 10,
                paddingHorizontal: 20,
              }}
            >
              <FlatList
                data={participantList}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        flex: 1,
                        height: SCREEN_HEIGHT * 0.4,
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
                        No Result Found
                      </Text>
                    </View>
                  );
                }}
                renderItem={(item) => {
                  let itemColor = generateColor();
                  return (
                    <View
                      style={{
                        ...styles.cardView,
                        justifyContent: "center",
                        height: 120,
                        width: "28.9%",
                      }}
                    >
                      <Text
                        style={{
                          color: "#000",
                          position: "absolute",
                          right: 10,
                          top: 5,
                        }}
                      >
                        {item.index + 1}
                      </Text>
                      <View style={{ height: 18, width: 18 }}>
                        {item.index < 3 && (
                          <Image
                            source={require("../../../assets/images/crown.png")}
                            style={{
                              width: "100%",
                              height: "100%",
                              resizeMode: "contain",
                            }}
                          />
                        )}
                      </View>
                      <View style={{ marginBottom: 3 }}>
                        <AnimatedCircularProgress
                          rotation={360}
                          size={55}
                          width={2.5}
                          fill={item?.item?.percentage}
                          // tintColor="#38ACFF"
                          tintColor={itemColor}
                          backgroundColor="#eee"
                        >
                          {(fill) => (
                            <>
                              {item?.item?.user_info?.image != "" ? (
                                <Image
                                  source={{ uri: item.item.image }}
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
                                  source={require("../../../assets/images/friend-profile.png")}
                                  style={{
                                    marginVertical: 8,
                                    width: 44,
                                    height: 44,
                                  }}
                                />
                              )}
                            </>
                          )}
                        </AnimatedCircularProgress>
                      </View>
                      <Text style={styles.cardText} numberOfLines={2}>
                        {item?.item?.user_info?.first_name}
                      </Text>
                      <Text
                        style={{
                          ...styles.cardText,
                          color: itemColor,
                          fontFamily: "Rubik-Medium",
                        }}
                      >
                        {item.item.steps}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>

            {/* ------------------------------------------Add Member Bottom Sheet-------------------------------------------- */}
            <RBSheet
              ref={bottomSheetAddMemberRef}
              openDuration={250}
              closeOnDragDown={true}
              closeOnPressMask={false}
              dragFromTopOnly
              animationType={"slide"}
              customStyles={{
                container: {
                  padding: 5,
                  height: 460,
                  backgroundColor: "#ffffff",
                  borderRadius: 30,
                },
                draggableIcon: {
                  backgroundColor: "#003e6b",
                },
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    color: "#003e6b",
                    fontSize: 18,
                    textAlign: "center",
                    fontFamily: "Rubik-Regular",
                    marginTop: 5,
                  }}
                >
                  Add Members
                </Text>
                <View
                  style={{
                    marginVertical: 15,
                    paddingHorizontal: 20,
                    flex: 1,
                    width: "100%",
                  }}
                >
                  <FlatList
                    data={addMembersList}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => {
                      return (
                        <View
                          style={{
                            flex: 1,
                            height: SCREEN_HEIGHT * 0.4,
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
                            No Result Found
                          </Text>
                        </View>
                      );
                    }}
                    renderItem={(item) => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            handleAddMemberSelect(item.item?.user_info?.id)
                          }
                          style={{
                            ...styles.bootSheetCardView,
                            width: "28.9%",
                            marginVertical: 5,
                            marginHorizontal: 7,
                            borderWidth: item.item.status ? 1 : 0,
                            borderColor: item.item.status
                              ? "#38ACFF"
                              : "transparent",
                          }}
                        >
                          {item?.item?.image != "" ? (
                            <Image
                              source={{ uri: item.item.image }}
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
                              source={require("../../../assets/images/friend-profile.png")}
                              style={{
                                marginVertical: 8,
                                width: 44,
                                height: 44,
                              }}
                            />
                          )}

                          <Text
                            numberOfLines={2}
                            style={{
                              color: "#040103",
                              fontFamily: "Rubik-Regular",
                            }}
                          >
                            {item?.item?.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handleAddMemberToChallenge()}
                  style={{
                    backgroundColor: "#38ACFF",
                    marginBottom: 10,
                    height: 50,
                    width: "92%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontSize: 16,
                      fontFamily: "Rubik-Regular",
                    }}
                  >
                    Add to Challenge
                  </Text>
                </TouchableOpacity>
              </View>
            </RBSheet>

            {/* ------------------------------------------Remove Member Bottom Sheet-------------------------------------------- */}
            <RBSheet
              ref={bottomSheetRemoveMemberRef}
              openDuration={250}
              closeOnDragDown={true}
              closeOnPressMask={false}
              dragFromTopOnly
              animationType={"slide"}
              customStyles={{
                container: {
                  padding: 5,
                  height: 460,
                  backgroundColor: "#ffffff",
                  borderRadius: 30,
                },
                draggableIcon: {
                  backgroundColor: "#003e6b",
                },
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    color: "#003e6b",
                    fontSize: 18,
                    textAlign: "center",
                    fontFamily: "Rubik-Regular",
                    marginTop: 5,
                  }}
                >
                  Remove Members
                </Text>
                <View
                  style={{
                    marginVertical: 15,
                    paddingHorizontal: 20,
                    flex: 1,
                    width: "100%",
                  }}
                >
                  <FlatList
                    data={participantList}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => {
                      return (
                        <View
                          style={{
                            flex: 1,
                            height: SCREEN_HEIGHT * 0.4,
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
                            No Result Found
                          </Text>
                        </View>
                      );
                    }}
                    renderItem={(item) => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            handleSelectMember_ToRemove(
                              item.item?.user_info?.id
                            )
                          }
                          style={{
                            ...styles.bootSheetCardView,
                            width: "28.9%",
                            marginVertical: 5,
                            marginHorizontal: 7,
                            borderWidth: item.item.status ? 1 : 0,
                            borderColor: item.item.status
                              ? "#38ACFF"
                              : "transparent",
                          }}
                        >
                          {item?.item?.user_info?.image != "" ? (
                            <Image
                              source={{ uri: item.item.image }}
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
                              source={require("../../../assets/images/friend-profile.png")}
                              style={{
                                marginVertical: 8,
                                width: 44,
                                height: 44,
                              }}
                            />
                          )}

                          <Text
                            numberOfLines={2}
                            style={{
                              color: "#040103",
                              fontFamily: "Rubik-Regular",
                            }}
                          >
                            {item?.item?.user_info?.first_name}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handleRemoveMember_FromChallenge()}
                  style={{
                    backgroundColor: "#38ACFF",
                    marginBottom: 10,
                    height: 50,
                    width: "92%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontSize: 16,
                      fontFamily: "Rubik-Regular",
                    }}
                  >
                    Remove From Challenge
                  </Text>
                </TouchableOpacity>
              </View>
            </RBSheet>

            {/* -------------------------------------------------------------- */}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ChallengesDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  btn: {
    flex: 1,
    backgroundColor: "#38ACFF",
    marginHorizontal: 10,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  bootSheetCardView: {
    height: 100,
    width: 101,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "blue",
    elevation: 6,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
});
