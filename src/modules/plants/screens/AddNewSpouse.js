import React, { Component } from 'react'
import {
  View,
  Platform,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  PixelRatio,
  FlatList,
  Modal
} from 'react-native'
import Header from '../../../components/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons'
import InputField from '../../../components/InputField'
import ViewButton from '../../../components/ViewButton'
import TouchableBotton from '../../../components/TouchableBotton'
import { Toast } from 'native-base'

import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import Spinner from 'react-native-loading-spinner-overlay'
import moment from 'moment'
import ImagePicker from 'react-native-image-crop-picker'
import { SliderBox } from 'react-native-image-slider-box'
import {
  registerstoreplantimage,
  createupdateplantmaster,
  getplantmaster,
  getcategorymaster,
  createupdateaddspouse
} from '../../../services/api.function'
import { connect } from 'react-redux'
import {
  setPlantImage,
  setPlantInfo,
  setPlantDesc,
  setPlantImageArr,
  setPlantId,
  setSpouseId,
  setCopyPlant
} from '../../../store/action/plant/action'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import DeviceInfo from 'react-native-device-info'

const options = [
  'Cancel',
  <View>
    <Text style={{ color: '#53a20a' }}>Gallery</Text>
  </View>,
  <Text style={{ color: '#53a20a' }}>Camera</Text>
]
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
let hasNotch = DeviceInfo.hasNotch()
// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320
class AddNewSpouse extends Component {
  constructor(props) {
    super(props)
    this.userNameInputRef = React.createRef()
    this.state = {
      addplantvisiable: false,
      isLoading: false,
      input: [],
      plantname: '',
      categoryname: '',
      form: { PD_Description: {} },
      description: {},
      viewstatus: false,
      iconvisible: true,
      imagePath: [require('../../../assets/plantname.png')],
      setplantdesc: [],
      savemyplant: false,
      title: 'Save to my plant',
      formdata: '',
      plantdescription: [],
      uploadimage: [],
      singleitem: [],
      edit: false,
      resultdata: [],
      backupcatogry: [],
      category: [],
      filterdata: [],
      modalVisible: false,
      catid: 0,
      setimage: [],
      setimagearr: [],
      listPlant: []
    }
    this.Delete = this.Delete.bind(this)
  }
  normalize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
  }
  _GetPlantMasterId = async (id) => {
    console.log('_GetPlantMasterId', id)
    this.setState({
      isLoading: true
    })
    this.props.setCopyPlant(false)

    let data = {
      Plant_PkeyID: id,
      Type: 2
    }
    console.log('_GetPlantMasterID', data, this.props.token)
    await getplantmaster(data, this.props.token)
      .then((res) => {
        console.log('_GetPlantMaster:res', res)
        this.setState({
          setplantdesc: res[0][0].plant_Description_DTOs,
          isLoading: false
        })
      })

      .catch((error) => {
        if (error.response) {
          console.log('responce_error', error.response)
        } else if (error.request) {
          console.log('request error', error.request)
        }
      })
  }
  showMessage = (message, status) => {
    if (message !== '' && message !== null && message !== undefined) {
      Toast.show({
        title: message,
        placement: 'bottom',
        status: status,
        duration: 5000
        // backgroundColor: 'red.500',
      })
    }
  }

  onPressEdit = async () => this.ActionSheet.show()
  ImageGallery = async () => {
    setTimeout(
      function () {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true,
          multiple: true,
          compressImageQuality: 0.5
        }).then((image) => {
          this.uploadImage('gallery', image)
        })
      }.bind(this),
      1000
    )
  }
  ImageCamera = async () => {
    setTimeout(
      function () {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true,
          multiple: true,
          compressImageQuality: 0.5
        }).then((image) => {
          console.log(image)
          this.uploadImage('camera', image)
        })
      }.bind(this),
      1000
    )
  }
  uploadImage = async (type, image) => {
    let setimage = []
    let setimagearr = []
    this.setState({
      isLoading: true
    })
    if (type === 'camera') {
      console.log('image', image)
      let data = JSON.stringify({
        Type: 1,
        Image_Base: 'data:image/png;base64, ' + image.data
      })
      console.log(data, this.props.token)
      // return 0;
      await registerstoreplantimage(data, this.props.token)
        .then((res) => {
          this.state.setimagearr.push(res[0].Image_Path)
          this.state.setimage.push({
            PIM_ImageName: image.modificationDate,
            PIM_ImagePath: res[0].Image_Path,
            PIM_Size: image.size
          })
          this.setState({
            isLoading: false
          })
          console.log('res:registerstoreplantimage', res[0].Image_Path)
        })
        .catch((error) => {
          if (error.request) {
            console.log(error.request)
          } else if (error.responce) {
            console.log(error.responce)
          } else {
            console.log(error)
          }
        })
      console.log('==>', setimagearr)
      this.setState(
        {
          ...this.state,
          imagePath: this.state.setimage
        },
        () => {
          this.props.setPlantImage(this.state.imagePath)
        }
      )
      this.props.setPlantImageArr(this.state.setimagearr)
    } else {
      for (let i = 0; i < image.length; i++) {
        this.setState({
          isLoading: true
        })
        let data = JSON.stringify({
          Type: 1,
          Image_Base: 'data:image/png;base64, ' + image[i].data
        })
        console.log(data, this.props.token)
        await registerstoreplantimage(data, this.props.token)
          .then((res) => {
            setimagearr.push(res[0].Image_Path)
            setimage.push({
              PIM_ImageName: `index_${i}`,
              PIM_ImagePath: res[0].Image_Path,
              PIM_Size: image[i].size,
              PIM_IsFirst: i == 0 ? true : false
            })
            console.log('res:registerstoreplantimage', res[0].Image_Path)
            this.setState({
              isLoading: false
            })
          })
          .catch((error) => {
            if (error.request) {
              console.log(error.request)
            } else if (error.responce) {
              console.log(error.responce)
            } else {
              console.log(error)
            }
          })
      }
      console.log('==>', setimagearr)
      this.setState(
        {
          ...this.state,
          imagePath: setimage
        },
        () => {
          this.props.setPlantImage(this.state.imagePath)
        }
      )
      this.props.setPlantImageArr(setimagearr)
    }
    this.Clean()
  }
  Clean = () => {
    ImagePicker.clean()
      .then(() => {
        console.log('removed all tmp images from tmp directory')
      })
      .catch((e) => {
        console.log(e)
      })
  }
  componentDidMount = async () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log(
        'componentDidMount',
        this.props.spouseid,
        this.props.copyplant
      )
      this._GetCategoryMaster()
      if (this.props.copyplant) {
        const { plantpkeyid } = this.props.route.params
        this._GetPlantMasterId(plantpkeyid)
      } else {
        if (this.props.spouseid > 0) {
          this._GetPlantMaster()

          this.setState({ spouseid: this.props.route.params.spouseid })
        } else {
          if (this.props.copyplant) {
            const { plantpkeyid } = this.props.route.params
            this._GetPlantMasterId(plantpkeyid)
          }
          this.setState({
            imagePath: [require('../../../assets/plantname.png')],
            plantname: '',
            categoryname: '',
            uploadimage: '',
            setplantdesc: [],
            setplantdesc: [],
            savemyplant: false,
            iconvisible: true
          })
        }
      }
    })
  }

  _GetPlantMaster = async () => {
    console.log('_GetPlantMaster', this.props.spouseid)
    let defualt = []
    let imagesrc = []
    let data = {
      Plant_PkeyID: this.props.spouseid,
      Type: 2
    }

    console.log('_GetPlantMaster', data, this.props.token)
    await getplantmaster(data, this.props.token)
      .then((res) => {
        console.log('res :GetPlantMaster', res)
        if (res[0][0].plant_Image_Master_DTOs.length > 0) {
          for (let i = 0; i < res[0][0].plant_Image_Master_DTOs.length; i++) {
            imagesrc.push(res[0][0].plant_Image_Master_DTOs[i].PIM_ImagePath)
          }
        } else {
          defualt = [require('../../../assets/plantname.png')]
        }
        this.setState({
          plantname: res[0][0].Plant_Name,
          categoryname: res[0][0].Plant_Cat_Name,
          catid: res[0][0].Plant_Cat_Pkey,
          plantimage: res[0][0].plant_Image_Master_DTOs,
          setplantdesc: res[0][0].plant_Description_DTOs,
          imagePath:
            res[0][0].plant_Image_Master_DTOs.length > 0 ? imagesrc : defualt,
          savemyplant: res[0][0].Plant_MyPlant,
          title: res[0][0].Plant_MyPlant
            ? 'Remove from my plant'
            : 'Save to my plant',
          isLoading: false
        })
        this.props.setPlantImageArr(this.state.imagePath)
        this.props.setPlantImage(res[0][0].plant_Image_Master_DTOs)
      })
      .catch((error) => {
        if (error.response) {
          console.log('responce_error', error.response)
        } else if (error.request) {
          console.log('request error', error.request)
        }
      })
  }
  _GetCategoryMaster = async () => {
    let data = {
      Type: 1
    }
    // console.log("_GetCategoryMaster", data, this.props.token);
    await getcategorymaster(data, this.props.token)
      .then((res) => {
        // console.log("res:_GetCategoryMaster ", res[0]);
        this.setState({ category: res[0], backupcatogry: res[0] })
      })
      .catch((error) => {
        if (error.response) {
          console.log('responce_error', error.response)
        } else if (error.request) {
          console.log('request error', error.request)
        }
      })
  }
  searchText = (e) => {
    // console.log("searchText", e);
    let text = e.toLowerCase()
    let category = this.state.backupcatogry
    let filteredCategory = category.filter((item) => {
      return item.Cat_Name.toLowerCase().match(text)
    })
    // console.log("filteredCategorybefore", filteredCategory);
    if (Array.isArray(filteredCategory)) {
      // console.log("after", filteredCategory);
      this.setState({
        filterdata: filteredCategory,
        categoryname: e,
        catid: -90
      })
    } else {
      this.setState({ categoryname: e, catid: -90 })
    }
  }

  AddInput = (key) => {
    // console.log("this.state.input", this.state.input);
    let textInput = this.state.input
    textInput.push(
      <View
        style={{ backgroundColor: '#F6F6F6', marginVertical: 10, height: 40 }}
      >
        <InputField
          onChangeText={(characteristics) =>
            this.onHandleChange(`Characteristics_${key + 3}`, characteristics)
          }
          // value={this.state.form.PD_Description.Characteristics_1}
          key={key}
          placeholder={`Characteristics`}
        />
      </View>
    )
    this.setState({ input: textInput })
  }
  AddInput1 = (key, value, index) => {
    const { PD_Description } = this.state.form
    let textInput = this.state.input
    textInput.push(
      <View
        style={{ backgroundColor: '#F6F6F6', marginVertical: 10, height: 40 }}
      >
        <InputField
          onChangeText={(characteristics) =>
            this.onHandleChange(`Characteristics_${index + 2}`, characteristics)
          }
          defaultValue={value}
          // value={}
          key={key}
          placeholder={`Characteristics`}
        />
      </View>
    )
    this.setState({ input: textInput })
  }

  AddplantvisiableClose = (item, index) => {
    this.setState({ input: [] })
    // console.log("item", item);
    console.log('input', this.state.input)
    let result = []
    let jsonarr
    if (typeof item.PD_Description === 'object') {
      jsonarr = item.PD_Description
      for (var i in item.PD_Description) result.push([i, jsonarr[i]])
      console.log('typeof', result.length)
      this.setState({
        ...this.state,
        addplantvisiable: !this.state.addplantvisiable,
        edit: true,
        input: [],
        form: {
          ...this.state.form,
          PD_Title: item.PD_Title,
          PD_Description: jsonarr
        }
      })
      {
        result.length > 3 &&
          result.splice(3).map((item, index) => {
            // console.log("descriptiondescription", item);
            return this.AddInput1(item[0], item[1], index + 4)
          })
      }
    } else {
      jsonarr = JSON.parse(item.PD_Description)
      // console.log("jsonarr", jsonarr);
      for (var i in jsonarr) result.push([i, jsonarr[i]])
      // console.log("result", result[2][0]);
      this.setState({
        ...this.state,
        addplantvisiable: !this.state.addplantvisiable,
        edit: true,
        form: {
          ...this.state.form,
          PD_Title: item.PD_Title,
          PD_Description: jsonarr
        }
      })
      {
        result.length > 3 &&
          result.splice(3).map((item, index) => {
            // console.log("descriptiondescription", item[0], item[1]);
            return this.AddInput1(item[0], item[1], index)
          })
      }
    }

    this.state.setplantdesc.splice(index, 1)
  }
  _ChangeName = (action) => {
    if (action) {
      this.props.setPlantInfo({
        PlantName: this.state.plantname,
        PlantCategory: this.state.categoryname
      })
    }
    this.setState({ iconvisible: !this.state.iconvisible })
  }
  onHandleChange = (key, value) => {
    if (key.startsWith('Characteristics_')) {
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          PD_Description: {
            ...this.state.form.PD_Description,
            [key]: value
          }
        }
      })
    } else {
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          [key]: value
        }
      })
    }
  }

  Delete = (index) => {
    const reducedArr = [...this.state.setplantdesc]
    reducedArr.splice(index, 1)
    this.setState({ setplantdesc: reducedArr })
  }
  DeleteDescription = (item, index) =>
    Alert.alert('Delete', 'Are you sure to delete description', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'OK', onPress: () => this.Delete(index) }
    ])
  _handleSave = () => {
    let form1 = {
      PD_Description: JSON.stringify(this.state.form.PD_Description),
      PD_Title: this.state.form.PD_Title
    }

    this.state.setplantdesc.push(form1)
    this.setState({ setplantdesc: [...this.state.setplantdesc, form1] })
    this.props.setPlantDesc(this.state.setplantdesc)
    console.log('setplantdesc', this.state.setplantdesc)

    this.setState({
      ...this.state,
      input: [],
      // formdata: stringdata,
      addplantvisiable: !this.state.addplantvisiable,
      form: { PD_Description: {} }
    })
  }

  _renderItem = (item, index) => {
    var arr
    if (typeof item.PD_Description === 'object') {
      arr = Object.values(item.PD_Description)
    } else {
      let jsonarr = JSON.parse(item.PD_Description)
      arr = Object.values(jsonarr)
    }
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
            // backgroundColor: "pink",
          }}
        >
          <Text
            style={{
              fontSize: this.normalize(20),
              color: '#000',
              lineHeight: 50,
              textTransform: 'capitalize'
            }}
          >
            {item.PD_Title}
            {'  '}
          </Text>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => this.AddplantvisiableClose(item, index)}
          >
            <Feather name='edit' size={18} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => this.DeleteDescription(item, index)}
          >
            <AntDesign name='delete' size={20} color={'gray'} />
          </TouchableOpacity>
        </View>
        {arr.map((comment) => {
          // console.log("descriptiondescription", comment);
          return (
            <View>
              <Text
                style={{
                  color: '#30AD4A',
                  elevation: 10,
                  lineHeight: 30
                }}
              >
                {'\u2B24'}
                {'    '}
                <Text style={{ color: 'black' }}>{comment}</Text>
              </Text>
            </View>
          )
        })}
      </View>
    )
  }

  SavePlantDecs = async () => {
    console.log('SavePlantDecs', this.state.data)
    this.setState({
      // isLoading: true,
    })
    let data = {
      Type: this.props.plantid > 0 ? 2 : 1,
      strPlant_Image_Master_DTO: JSON.stringify(this.props.plantimage),
      strPlant_Description_DTO: JSON.stringify(this.state.setplantdesc),
      Plant_Name: this.state.plantname,
      Plant_Cat_Pkey: parseInt(this.state.catid),
      Plant_Cat_Name: this.state.categoryname,
      Plant_IsParent: 0,
      Plant_MyPlant: this.state.savemyplant,
      Plant_PkeyID: this.props.spouseid,
      Plant_IsActive: 1,
      Plant_Type: 1,
      Plant_Gender: 1
    }

    console.log(data, this.props.token)
    // return 0;
    await createupdateplantmaster(data, this.props.token)
      .then((res) => {
        console.log('res:createupdateplantmaster', res[0])
        this.setState({
          isLoading: false
        })

        this.props.setSpouseId(res[0])
        this.showMessage('Plant updated successfully.', 'success')
        this.CreateUpdateAddSpouse()
      })

      .catch((error) => {
        if (error.request) {
          console.log(error.request)
        } else if (error.responce) {
          console.log(error.responce)
        } else {
          console.log(error)
        }
      })
  }
  CreateUpdateAddSpouse = async () => {
    let data = {
      Type: 2,
      ASP_Title: this.state.plantname,
      ASP_Description: null,
      ASP_Plant_PkeyID: this.props.spouseid,
      ASP_ParentID: this.props.plantid,
      ASP_Type: 1,
      ASP_Gender: 1,
      Plant_Type: 1,
      ASP_PkeyID: this.state.spouseid,
      ASP_IsActive: true
    }
    console.log(data, this.props.token)
    // return 0;
    await createupdateaddspouse(data, this.props.token)
      .then((res) => {
        console.log('res:createupdateaddspouse', res)
        this.setState({
          isLoading: false
        })
        this.showMessage('Spouse plant updated successfully.', 'success')
        this.props.navigation.goBack()
      })
      .catch((error) => {
        if (error.request) {
          console.log(error.request)
        } else if (error.responce) {
          console.log(error.responce)
        } else {
          console.log(error)
        }
      })
  }
  SaveToMyPlant = () => {
    if (this.state.savemyplant) {
      this.setState({ title: 'Save to my plant' })
    } else {
      this.setState({ title: 'Remove from my plant' })
    }
    this.setState({ savemyplant: !this.state.savemyplant })
  }
  AddCharacteristics = () => {
    this.setState({
      input: [],
      addplantvisiable: !this.state.addplantvisiable,
      form: { PD_Description: {} }
    })
  }
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808'
        }}
      />
    )
  }
  _SelectCategory = (bool, item) => {
    if (bool) {
      this.setState({
        modalVisible: !this.state.modalVisible,
        catid: -90
      })
    } else {
      this.setState({
        categoryname: item.Cat_Name,
        modalVisible: !this.state.modalVisible,
        catid: item.Cat_Pkey
      })
    }
  }
  _renderModal = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: !this.state.modalVisible })
          }}
        >
          <ScrollView>
            <View
              style={{
                marginTop: 150,
                margin: 20,
                backgroundColor: 'white',
                borderRadius: 20,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                width: '90%',
                paddingBottom: 100
              }}
            >
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  paddingRight: 20,
                  paddingTop: 10
                }}
              >
                <Entypo
                  name='circle-with-cross'
                  size={18}
                  color={'black'}
                  onPress={() =>
                    this.setState({ modalVisible: !this.state.modalVisible })
                  }
                />
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  // backgroundColor: "pink",
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <View
                  style={{
                    width: '85%',
                    paddingLeft: 20
                  }}
                >
                  <InputField
                    onChangeText={(categoryname) => {
                      this.searchText(categoryname)
                      // this.setState({ categoryname });
                    }}
                    // value={categoryname}
                    placeholder={'Category'}
                  />
                </View>

                <View
                  style={{
                    width: '15%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {this.state.filterdata.length === 0 &&
                    this.state.categoryname !== '' && (
                      <Entypo
                        name='add-to-list'
                        size={18}
                        color={'black'}
                        onPress={() => this._SelectCategory(true)}
                      />
                    )}
                </View>
              </View>
              <View
                style={{
                  width: '90%',
                  justifyContent: 'center'
                  // alignItems: "center",
                }}
              >
                <FlatList
                  data={this.state.filterdata}
                  // ItemSeparatorComponent={this.ListViewItemSeparator}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this._SelectCategory(false, item)}
                        style={{
                          marginBottom: 5,
                          paddingVertical: 5,
                          backgroundColor: '#EAF7ED',
                          // paddingHorizontal: "40%",
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '90%'
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            color: '#30AD4A',
                            width: '100%'
                          }}
                        >
                          {item.Cat_Name}
                        </Text>
                      </TouchableOpacity>
                    )
                  }}
                  enableEmptySections={true}
                  // style={{
                  //   marginTop: "40%",
                  //   position: "absolute",
                  //   zIndex: 11111,
                  // }}
                  keyExtractor={(item, index) => index.toString()}
                  ListHeaderComponent={() => {
                    return <View style={{ height: 10, width: '100%' }}></View>
                  }}
                  ListFooterComponent={() => {
                    return <View style={{ height: 10, width: '100%' }}></View>
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
    )
  }
  CopyToMyPlant = async () => {
    this.props.setCopyPlant(true)
    this.props.navigation.navigate('PlantScreen', { screen: 'AddNewSpouse' })
  }
  render() {
    const { PD_Title, PD_Description } = this.state.form
    const {
      Characteristics_0,
      Characteristics_2,
      Characteristics_1
    } = PD_Description
    const {
      addplantvisiable,
      form,
      plantname,
      categoryname,
      input
    } = this.state
    console.log(this.props.spouseid)
    return (
      <View style={{ height: '100%' }}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <Spinner visible={this.state.isLoading} />
          <View>
            <View>
              <View
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  width: '100%'
                }}
              >
                <Header
                  onpressedit={() => this.onPressEdit()}
                  edit={true}
                  share={true}
                  navigation={this.props.navigation}
                />
              </View>
              <View style={{}}>
                <SliderBox
                  imageLoadingColor={'#30AD4A'}
                  resizeMode={'cover'}
                  sliderBoxHeight={hasNotch ? 300 : 250}
                  images={
                    this.props.plantimagearr
                      ? this.props.plantimagearr
                      : this.state.images
                  }
                  // onCurrentImagePressed={(index) =>
                  //   console.warn(`image ${index} pressed`)
                  // }
                  // currentImageEmitter={(index) =>
                  //   console.warn(`current pos is: ${index}`)
                  // }
                  autoplay
                  circleLoop
                  dotColor='#FFF'
                  inactiveDotColor='#90A4AE'
                  dotStyle={{
                    bottom: 20
                  }}
                />
              </View>
            </View>
            <View
              style={{
                backgroundColor: addplantvisiable ? '#F2F2F2' : '#fff',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                marginTop: -15,
                paddingHorizontal: 20,
                height: '100%',
                paddingBottom: '90%'
              }}
            >
              {addplantvisiable ? (
                <ScrollView>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      padding: 20
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: 'bold',
                          fontSize: this.normalize(20)
                        }}
                      >
                        Title
                      </Text>
                      <Icon
                        name='close-circle-outline'
                        size={20}
                        onPress={() =>
                          this.setState({
                            addplantvisiable: !this.state.addplantvisiable
                          })
                        }
                      />
                    </View>
                    <InputField
                      onChangeText={(title) =>
                        this.onHandleChange('PD_Title', title)
                      }
                      value={PD_Title}
                      placeholder={'Title'}
                    />
                    <View>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: 'bold',
                          fontSize: this.normalize(20)
                        }}
                      >
                        Description
                      </Text>
                      <InputField
                        onChangeText={(characteristics) =>
                          this.onHandleChange(
                            `Characteristics_0`,
                            characteristics
                          )
                        }
                        placeholder={'Characteristics'}
                        value={Characteristics_0 || ''}
                      />
                      <InputField
                        onChangeText={(characteristics) =>
                          this.onHandleChange(
                            `Characteristics_1`,
                            characteristics
                          )
                        }
                        placeholder={'Characteristics'}
                        value={Characteristics_1 || ''}
                      />
                      <InputField
                        onChangeText={(characteristics) =>
                          this.onHandleChange(
                            `Characteristics_2`,
                            characteristics
                          )
                        }
                        placeholder={'Characteristics'}
                        value={Characteristics_2 || ''}
                      />
                      {this.state.input.map((value, index) => {
                        return value
                      })}

                      <View
                        style={{
                          marginTop: 20,
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}
                      >
                        <View style={{ width: '45%', height: 50 }}>
                          <Image
                            resizeMode='stretch'
                            style={{ width: '100%', height: '100%' }}
                            source={require('../../../assets/Rectangle1.png')}
                          />
                          <TouchableOpacity
                            onPress={() =>
                              this.AddInput(this.state.input.length + 1)
                            }
                            style={{
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <Text
                              style={{
                                color: '#30AD4A',
                                fontSize: this.normalize(15),
                                fontWeight: 'bold'
                              }}
                            >
                              + <Text>Add more</Text>
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{ width: '45%', height: 50 }}>
                          <Image
                            resizeMode='stretch'
                            style={{ width: '100%', height: '100%' }}
                            source={require('../../../assets/Rectangle1.png')}
                          />
                          <TouchableOpacity
                            onPress={() => this._handleSave()}
                            style={{
                              // backgroundColor: "pink",
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <Text
                              style={{
                                color: '#30AD4A',
                                fontSize: this.normalize(15),
                                fontWeight: 'bold'
                              }}
                            >
                              <Text>Save</Text>
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <KeyboardSpacer />
                    </View>
                  </View>
                </ScrollView>
              ) : (
                <View>
                  <View style={{ paddingVertical: 5 }}>
                    {this.state.iconvisible ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center'
                        }}
                      >
                        <View style={{ width: '90%', height: 50 }}>
                          {plantname === '' && categoryname == '' ? (
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: this.normalize(18),
                                color: '#000',
                                lineHeight: 40
                              }}
                            >
                              {'Plant Name'}{' '}
                              <Text style={{ fontWeight: 'normal' }}>
                                ({'Category Name'})
                              </Text>{' '}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: this.normalize(18),
                                color: '#000',
                                lineHeight: 40
                              }}
                            >
                              {plantname}{' '}
                              <Text style={{ fontWeight: 'normal' }}>
                                ({categoryname})
                              </Text>{' '}
                            </Text>
                          )}
                        </View>

                        <View>
                          <TouchableOpacity
                            onPress={() => this._ChangeName(false)}
                          >
                            <AntDesign name='edit' size={25} color={'gray'} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: 50
                        }}
                      >
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row'
                          }}
                        >
                          <View
                            style={{
                              width: '49%',
                              marginRight: 5
                            }}
                          >
                            <InputField
                              onChangeText={(plantname) =>
                                this.setState({ plantname })
                              }
                              value={plantname}
                              placeholder={'Plant Name'}
                            />
                          </View>
                          <View
                            style={{
                              // backgroundColor: "pink",
                              width: '49%',
                              zIndex: 11
                            }}
                          >
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({
                                  modalVisible: !this.state.modalVisible,
                                  categoryname: ''
                                })
                              }
                              style={{
                                backgroundColor: '#F6F6F6',
                                marginVertical: 10,
                                height: 40,
                                paddingLeft: 10,
                                // width: 300,
                                justifyContent: 'center',
                                width: '100%'
                              }}
                            >
                              {categoryname === '' ? (
                                <Text
                                  style={{
                                    textTransform: 'capitalize',
                                    color: 'lightgray'
                                  }}
                                >
                                  {'Category Name'}
                                </Text>
                              ) : (
                                <Text
                                  style={{
                                    textTransform: 'capitalize',
                                    color: 'lightgray'
                                  }}
                                >
                                  {categoryname}
                                </Text>
                              )}

                              {/* <InputField
                              editable={true}
                              // onChangeText={(categoryname) => {
                              //   this.setState({ categoryname });
                              // }}
                              value={categoryname}
                              placeholder={"Category"}
                            /> */}
                            </TouchableOpacity>
                          </View>
                        </View>

                        <View>
                          <TouchableOpacity
                            onPress={() => this._ChangeName(true)}
                          >
                            <AntDesign name='save' size={30} color={'gray'} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}

                    <Text> {moment().format('LL')}</Text>
                  </View>
                  {/* <ViewButton
                    source={require("../../../assets/ImgTree.png")}
                    title={"Hybrid Tree"}
                  /> */}

                  <View>
                    {/* {this.props.spouseid > 0 && (
                      <ViewButton
                        onpress={() =>
                          this.props.navigation.navigate('AddSpouse')
                        }
                        source={require('../../../assets/leaftree.png')}
                        title={'Add Seedling/Spouse'}
                      />
                    )} */}
                    <TouchableBotton
                      onPress={() => this.CopyToMyPlant()}
                      backgroundColor={'#EAF7ED'}
                      title={'Copy From Plant'}
                      height={50}
                      font={true}
                    />
                    <View
                      style={{
                        backgroundColor: '#F7F8FD',
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 25,
                        paddingHorizontal:
                          this.state.setplantdesc.length > 0 ? 20 : 0,
                        paddingVertical:
                          this.state.setplantdesc.length > 0 ? 10 : 0,
                        marginHorizontal: -17
                      }}
                    >
                      <FlatList
                        data={this.state.setplantdesc}
                        // data={this.props.plantdesc}
                        renderItem={({ item, index }) => {
                          return this._renderItem(item, index)
                        }}
                        keyExtractor={(item) => item.id}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // paddingVertical: 10,
                        marginBottom: 10
                        // backgroundColor: "red",
                      }}
                    >
                      {!this.state.savemyplant ? (
                        <View>
                          <MaterialCommunityIcons
                            onPress={() => this.SaveToMyPlant()}
                            name='checkbox-blank-outline'
                            size={30}
                            color={'#30AD4A'}
                          />
                        </View>
                      ) : (
                        <View>
                          <MaterialCommunityIcons
                            onPress={() => this.SaveToMyPlant()}
                            name='checkbox-intermediate'
                            size={30}
                            color={'#30AD4A'}
                          />
                        </View>
                      )}
                      <Text
                        style={{
                          marginLeft: 10,
                          color: '#30AD4A',
                          fontWeight: 'bold'
                        }}
                      >
                        {this.state.title}
                      </Text>
                    </View>
                    <TouchableBotton
                      onPress={() => this.AddCharacteristics()}
                      color={'#30AD4A'}
                      backgroundColor={'#EAF7ED'}
                      title={'+ Add Characteristics'}
                      borderWidth={2}
                      borderColor={'#30AD4A'}
                      borderStyle={'dashed'}
                      height={50}
                      font={true}
                    />

                    {this.state.categoryname !== '' &&
                      this.state.plantname !== '' && (
                        <>
                          {/* <TouchableBotton
                            onPress={() => this.SaveToMyPlant()}
                            backgroundColor={"#EAF7ED"}
                            title={this.state.title}
                            height={50}
                            font={true}
                          /> */}

                          <TouchableBotton
                            onPress={() => this.SavePlantDecs()}
                            color={'#fff'}
                            backgroundColor={'#30AD4A'}
                            title={'Save'}
                            height={50}
                            font={true}
                          />
                        </>
                      )}

                    <ActionSheet
                      ref={(o) => (this.ActionSheet = o)}
                      title={
                        <Text
                          style={{
                            color: '#53a20a',
                            fontSize: this.normalize(18)
                          }}
                        >
                          Profile Photo
                        </Text>
                      }
                      options={options}
                      cancelButtonIndex={0}
                      destructiveButtonIndex={4}
                      useNativeDriver={true}
                      onPress={(index) => {
                        if (index === 0) {
                          // cancel action
                        } else if (index === 1) {
                          this.ImageGallery()
                        } else if (index === 2) {
                          this.ImageCamera()
                        }
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        {/* {viewstatus ||
          ((this.props.plantdesc.length > 0 ||
            this.props.plantimage.length > 0) && (
            <TouchableOpacity
              onPress={() => alert("Copied")}
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
              }}
            >
              <Image
                resizeMode="contain"
                style={{ width: 100, height: 100 }}
                source={require("../../../assets/Duplicate.png")}
              />
            </TouchableOpacity>
          ))} */}
        {this._renderModal()}
      </View>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.token,
  plantdesc: state.plantReducer.plantdesc,
  plantimage: state.plantReducer.plantimage,
  plantimagearr: state.plantReducer.plantimagearr,
  plantid: state.plantReducer.plantid,
  spouseid: state.plantReducer.spouseid,
  copyplant: state.plantReducer.copyplant
})

const mapDispatchToProps = {
  setPlantInfo,
  setPlantDesc,
  setPlantImage,
  setPlantImageArr,
  setPlantId,
  setSpouseId,
  setCopyPlant
}
export default connect(mapStateToProps, mapDispatchToProps)(AddNewSpouse)
