import React, { Component } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Keyboard
} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Spinner from 'react-native-loading-spinner-overlay'
import DeviceInfo from 'react-native-device-info'
import AntDesign from 'react-native-vector-icons/AntDesign'
let hasNotch = DeviceInfo.hasNotch()
import { connect } from 'react-redux'
import {
  setPlantId,
  setPlantTitle,
  logoutAccount,
  setCopyPlant
} from '../../../store/action/plant/action'
import { setValidUserID } from '../../../store/action/auth/action'
import { gethomemyplants } from '../../../services/api.function'
import { FAB } from 'react-native-paper'
import InputField from '../../../components/InputField'

// const DATA = [
//   {
//     id: "1",
//     title: "Top Flower",
//     image: require("../../../assets/image13.png"),
//     like: 12,
//     account: "minal",
//     profile: require("../../../assets/profile2.png"),
//   },
//   {
//     id: "2",
//     title: "Top Flower",
//     image: require("../../../assets/image14.png"),
//     like: 12,
//     account: "minal",
//     profile: require("../../../assets/profile.png"),
//   },
//   {
//     id: "3",
//     title: "Sun Flower",
//     image: require("../../../assets/image14.png"),
//     like: 14,
//     account: "poonam",
//     profile: require("../../../assets/profile.png"),
//   },
// ];

class Plant extends Component {
  constructor(props) {
    super(props)
    this.userNameInputRef = React.createRef()
    this.state = {
      title: true,
      titlename: '',
      plant: []
    }
  }
  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this._GetHomeMyPlants()
    })
  }
  _GetHomeMyPlants = async () => {
    this.setState({ isLoading: true })
    let data = {
      // Plant_User_PkeyID: this.props.userid,
      Type: 2
    }
    console.log('_GetHomeMyPlants', data, this.props.token)
    await gethomemyplants(data, this.props.token)
      .then((res) => {
        console.log('res:gethomemyplants ', res[0])
        this.setState({ plant: res[0], isLoading: false })
      })
      .catch((error) => {
        if (error.response) {
          console.log('responce_error', error.response)
        } else if (error.request) {
          console.log('request error', error.request)
        }
      })
  }
  _ChangeTitle = (type) => {
    Keyboard.dismiss()
    if (type) {
      if (this.state.titlename === '') {
        alert('Please Enter title.')
      } else {
        this.props.setPlantTitle(this.state.titlename)
      }
    }
    this.setState({ title: !this.state.title })
  }
  _SelectItem = (type, item) => {
    console.log('_SelectItemcopyplant', this.props.copyplant)
    if (this.props.copyplant) {
      console.log('ifffff_SelectItem', item)
      this.props.navigation.navigate('Plant', {
        screen: this.props.route.params.screen,
        params: { plantpkeyid: item.Plant_PkeyID }
      })
    } else {
      this.props.setCopyPlant(false)
      console.log('elsle_SelectItem', item)
      if (type) {
        if (item.Plant_User_PkeyID === this.props.userid) {
          this.props.setValidUserID(true)
        } else {
          this.props.setValidUserID(false)
        }
        this.props.setPlantId(item.Plant_PkeyID)
        this.props.navigation.navigate('Addplant')
      } else {
        this.props.setValidUserID(true)
        this.props.setPlantId(0)
        this.props.logoutAccount()
        this.props.navigation.navigate('Addplant', { savemyplant: true })
      }
    }
  }
  // _SelectItem = (type, item) => {
  //   if (type) {
  //     this.props.setPlantId(item.Plant_PkeyID);
  //     this.props.navigation.navigate("Addplant", { savemyplant: true });
  //   } else {
  //     this.props.setPlantId(0);
  //     this.props.logoutAccount();
  //     this.props.navigation.navigate("Addplant", { savemyplant: true });
  //   }
  // };

  _renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => this._SelectItem(true, item)}
        style={{
          width: '50%',
          backgroundColor: '#fff',
          borderRadius: 5,
          // paddingHorizontal: 5,
          marginTop: 10,
          marginRight: 10,
          shadowOffset: { width: 1, height: 1 },
          shadowColor: 'gray',
          shadowOpacity: 0.9,
          elevation: 5,
          marginBottom: 5
        }}
      >
        {!item.PIM_ImagePath ? (
          <Image
            resizeMode='stretch'
            source={require('../../../assets/plantname.png')}
            style={{
              width: '100%',
              height: 150,
              borderRadius: 3
            }}
          />
        ) : (
          <Image
            resizeMode='stretch'
            source={{ uri: item.PIM_ImagePath }}
            style={{
              width: '100%',
              height: 150,
              borderRadius: 3
            }}
          />
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10
          }}
        >
          <View>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>
              {item.Plant_Name}
            </Text>
            <Text style={{ fontSize: 10 }}>@{item.Cat_Name}</Text>
          </View>
          {/* <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "lightgray",
              height: 20,
              width: 40,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Entypo name={"heart"} size={15} color="#30AD4A" />
            <Text style={{ fontSize: 10 }}>{item.like}</Text>
          </View> */}
        </View>
      </TouchableOpacity>
    )

    // return (
    //   <TouchableOpacity
    //     onPress={() => this._SelectItem(true, item)}
    //     style={{
    //       width: "100%",
    //       backgroundColor: "#fff",
    //       marginBottom: 30,
    //       paddingHorizontal: 10,
    //     }}
    //   >
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //       }}
    //     >
    //       <View
    //         style={{
    //           flexDirection: "row",
    //           alignItems: "center",
    //           marginBottom: 20,
    //         }}
    //       >
    //         {/* <Image
    //       resizeMode="stretch"
    //       source={item.profile}
    //       style={{ width: 50, height: 50 }}
    //     /> */}
    //         <View style={{ marginLeft: 10 }}>
    //           <Text
    //             style={{
    //               color: "black",
    //               fontWeight: "bold",
    //               lineHeight: 20,
    //             }}
    //           >
    //             {item.Plant_Name}
    //           </Text>
    //           <Text style={{ fontSize: 10, lineHeight: 20 }}>
    //             @{item.Cat_Name}
    //           </Text>
    //         </View>
    //       </View>
    //       <Feather name={"more-vertical"} size={25} color="#ACACAC" />
    //     </View>
    //     {!item.PIM_ImagePath ? (
    //       <Image
    //         resizeMode="cover"
    //         source={require("../../../assets/plantname.png")}
    //         style={{
    //           width: "100%",
    //           height: 150,
    //           borderRadius: 3,
    //         }}
    //       />
    //     ) : (
    //       <Image
    //         resizeMode="stretch"
    //         source={{ uri: item.PIM_ImagePath }}
    //         style={{
    //           width: "100%",
    //           height: 150,
    //           borderRadius: 3,
    //         }}
    //       />
    //     )}
    //     {/* <Image
    //       resizeMode="stretch"
    //       source={item.image}
    //       style={{ width: "100%", height: 200 }}
    //     /> */}
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         alignItems: "center",
    //         padding: 5,
    //         backgroundColor: "#fff",
    //         shadowOffset: { width: 0.1, height: 0.1 },
    //         shadowColor: "gray",
    //         shadowOpacity: 0.5,
    //         elevation: 1,
    //         borderBottomEndRadius: 10,
    //         borderBottomStartRadius: 10,
    //         justifyContent: "space-between",
    //       }}
    //     >
    //       {/* <View
    //     style={{
    //       flexDirection: "row",
    //       alignItems: "center",
    //     }}
    //   >
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         height: 20,
    //         width: 50,
    //         justifyContent: "space-around",
    //         alignItems: "center",
    //         marginRight: 10,
    //       }}
    //     >
    //       <Entypo name={"heart"} size={22} color="#30AD4A" />
    //       <Text style={{ fontSize: 15 }}>{item.like}</Text>
    //     </View>
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         height: 20,
    //         width: 50,
    //         justifyContent: "space-around",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Ionicons
    //         name={"chatbubble-ellipses-outline"}
    //         size={20}
    //         color="#ACACAC"
    //       />
    //       <Text style={{ fontSize: 15 }}>{item.like}</Text>
    //     </View>
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         height: 25,
    //         width: 50,
    //         justifyContent: "space-around",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Entypo name={"share"} size={20} color="#ACACAC" />
    //     </View>
    //   </View> */}
    //       {/* <View style={{}}>
    //     <Octicons
    //       name={"bookmark"}
    //       size={20}
    //       color="#ACACAC"
    //     />
    //   </View> */}
    //     </View>
    //   </TouchableOpacity>
    // );
  }
  render() {
    console.log('this.props.planttitle', this.props.planttitle)
    return (
      <View style={{ height: '100%' }}>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <Spinner visible={this.state.isLoading} />

          <View>
            <Image
              resizeMode='stretch'
              source={require('../../../assets/Main.png')}
              style={{ width: '100%', height: hasNotch ? 115 : 100 }}
            />
            <View
              style={{
                position: 'absolute',
                top: hasNotch ? 50 : 30
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  height: 50
                }}
              >
                <View
                  style={{
                    // backgroundColor: "red",
                    justifyContent: 'center',
                    width: '55%',
                    paddingLeft: 20
                  }}
                >
                  {this.state.title ? (
                    <Text
                      style={{
                        fontSize: 25,
                        color: 'black',
                        fontWeight: 'bold'
                      }}
                    >
                      {this.props.planttitle}
                    </Text>
                  ) : (
                    <View style={{ width: '100%' }}>
                      <InputField
                        onChangeText={(titlename) =>
                          this.setState({ titlename })
                        }
                        value={this.state.titlename}
                        placeholder={'Enter title'}
                      />
                    </View>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    // backgroundColor: "red",
                    width: '45%',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingRight: 20
                  }}
                >
                  {this.state.title ? (
                    <TouchableOpacity
                      onPress={() => this._ChangeTitle(false)}
                      style={styles.icon}
                    >
                      <Feather name={'edit-3'} size={25} color='#ACACAC' />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => this._ChangeTitle(true)}
                      style={styles.icon}
                    >
                      <AntDesign name='save' size={30} color={'gray'} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#fff',
                paddingVertical: 20,
                borderTopEndRadius: 30,
                borderTopStartRadius: 30,
                paddingHorizontal: 10
              }}
            >
              <FlatList
                numColumns={2}
                data={this.state.plant}
                ListHeaderComponent={() => {
                  return <View></View>
                }}
                ListFooterComponent={() => {
                  return <View></View>
                }}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        flex: 1,
                        // backgroundColor: "pink",
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30
                      }}
                    >
                      <Text style={{ fontSize: 50, fontWeight: 'bold' }}>
                        No Plant Found
                      </Text>
                    </View>
                  )
                }}
                renderItem={({ item }) => {
                  return this._renderItem(item)
                }}
                keyExtractor={(item) => item.Plant_PkeyID}
              />
            </View>
          </View>
        </ScrollView>
        <FAB
          style={styles.fab}
          icon='plus'
          onPress={() => this._SelectItem(false, 0)}
        />
      </View>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.token,
  planttitle: state.plantReducer.planttitle,
  userid: state.authReducer.userid,
  copyplant: state.plantReducer.copyplant
})
const mapDispatchToProps = {
  setPlantId,
  setPlantTitle,
  logoutAccount,
  setValidUserID,
  setCopyPlant
}
export default connect(mapStateToProps, mapDispatchToProps)(Plant)
const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#fff',
    borderRadius: 45,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#30AD4A'
  }
})
