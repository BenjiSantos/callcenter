/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 const URL = 'http://www.mocky.io/v2/5a049b28300000a806fe0891';
 const React = require('react');
 const ReactNative = require('react-native');
 const {
   ScrollView,
   StyleSheet,
   RefreshControl,
   Button,
   Text,
   TextInput,
   TouchableHighlight,
   TouchableWithoutFeedback,
   View,
   Image,
   Linking
 } = ReactNative;

import { AppRegistry } from 'react-native';
 // Emergency.
import Emergency from './src/components/Emergency';
// Adds SpalshScreen thanks to crazycodeboy/react-native-splash-screen
import SplashScreen from 'react-native-splash-screen';

import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';

import { StackNavigator } from 'react-navigation';

class EmergenciesListScreen extends React.Component {

  static navigationOptions = {
    header: null
  };
  static title = '<RefreshControl>';
  static description = 'Adds pull-to-refresh support to a scrollview.';

  state = {
    isRefreshing: false,
    loaded: 0,
    text: '',
    rowData: Array.from(new Array(1)).map(
      (val, i) => (
        {
          address: 'AV. CERRO CAMACHO 880 SANTIAGO DE SURCO',
          emergency_type: 'EMERGENCIA MEDICA',
          status: 'ATENDIENDO',
          created: '03/06/2017 09:53:42 a.m.',
          number: "2017-028208",
          machines: ["AMB124-2", "AMB-96"],
          fire_stations: [],
          map: {
            "latitude": -76.9623405856671,
            "longitude": -12.0858319188482
          }
        }
      )),
  };

  _onClick = (row) => {
    //let url = 'waze://app';
    let url = `waze://?ll=${row.map.longitude},${row.map.latitude}&navigate=yes`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // @TODO: Remove and use a Log technique.
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  };

  _onChangeSearchText = (text) => {
    this.setState({text});
  };

  componentDidMount() {
    this.fetchData().done();
    SplashScreen.hide();
  }
  /**
   * Get firefighters data in json format.
   */
  async fetchData() {
    const response = await fetch(URL)
    const json = await response.json()

    this.setState({rowData: json})
  }

  render() {
    const { navigate } = this.props.navigation;
    const rows = this.state.rowData.map((row, ii) => {
      // @TODO: Change machines to station.
      if (row.fire_stations.includes(this.state.text)) {
        return <Emergency key={ii} data={row} onClick={this._onClick}/>;
      }
      else if(this.state.text == '') {
        return <Emergency key={ii} data={row} onClick={this._onClick}/>;
      }
    });
    return (
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Cargando..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }>
        <Text style={styles.titleMain}>
          Call Autonoma
        </Text>
        <View style={styles.inlineNav}>
          <View style={styles.leftNav}>
            <TouchableHighlight onPress={() => navigate('EmergenciesListScreen')}>
              <Image  source={require("./src/images/icons/flame_1.png")}/>
            </TouchableHighlight>
          </View>
          <View style={styles.centerNav}>
            <TouchableHighlight onPress={() => navigate('RadioScreen')}>
              <Image source={require("./src/images/icons/radio_1.png")}/>
            </TouchableHighlight>
          </View>
          <View style={styles.rightNav}>
            <TouchableHighlight onPress={() => navigate('ThanksScreen')}>
              <Image  source={require("./src/images/icons/helmet_1.png")}/>
            </TouchableHighlight>
          </View>
        </View>
        <TextInput
          style={styles.searchForm}
          placeholder="Buscar por número"
          onChangeText={this._onChangeSearchText}
          underlineColorAndroid='transparent'
          placeholderTextColor="#CECECE"
        />
        {rows}
      </ScrollView>

    );
  }

  _onRefresh = () => {
    this.setState({isRefreshing: true});
    this.fetchData().done();
    this.setState({isRefreshing: false});
  };
}

class RadioScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  turnOnOrOff() {
    const url = "http://audio7.broadcastify.com/s4rn6m17kbhx.mp3";
    ReactNativeAudioStreaming.play(url, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text style={styles.titleMain}>
          Call Autonoma
        </Text>
        <View style={styles.inlineNav}>
          <View style={styles.leftNav}>
            <TouchableHighlight onPress={() => navigate('EmergenciesListScreen')}>
              <Image  source={require("./src/images/icons/flame_1.png")}/>
            </TouchableHighlight>
          </View>
          <View style={styles.centerNav}>
            <TouchableHighlight onPress={() => navigate('RadioScreen')}>
              <Image source={require("./src/images/icons/radio_1.png")}/>
            </TouchableHighlight>
          </View>
          <View style={styles.rightNav}>
            <TouchableHighlight onPress={() => navigate('ThanksScreen')}>
              <Image  source={require("./src/images/icons/helmet_1.png")}/>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.backgroundRadio}>
          <View style={styles.marginTopText}>
            <Text style={styles.colorWhite}>Presionar para iniciar y vuelve a</Text>
            <Text style={styles.colorWhite}>presionar para pausear</Text>
          </View>
          <TouchableHighlight style={styles.centerImage} onPress={this.turnOnOrOff}>
            <Image style={styles.centerImage} source={require("./src/images/icons/group.png")}>
              <Image source={require("./src/images/icons/radio_1.png")}/>
            </Image>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}


class ThanksScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
              <Text style={styles.titleMain}>
                Call Autonoma
              </Text>
              <View style={styles.inlineNav}>
                <View style={styles.leftNav}>
                  <TouchableHighlight onPress={() => navigate('EmergenciesListScreen')}>
                    <Image  source={require("./src/images/icons/flame_1.png")}/>
                  </TouchableHighlight>
                </View>
                <View style={styles.centerNav}>
                  <TouchableHighlight onPress={() => navigate('RadioScreen')}>
                    <Image source={require("./src/images/icons/radio_1.png")}/>
                  </TouchableHighlight>
                </View>
                <View style={styles.rightNav}>
                  <TouchableHighlight onPress={() => navigate('ThanksScreen')}>
                    <Image  source={require("./src/images/icons/helmet_1.png")}/>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={styles.marginContent}>
                <Text style={styles.colorBlackBold}>Sobre Nosotros</Text>
                <View style={styles.margTop}>
                  <Text style={styles.marginContent}>App móvil para el reporte de llamadas - Call Center</Text>
                </View>
                <View style={styles.margTop}>
                  <Text style={styles.colorBlackBold}>Creditos:</Text>
                  <Text style={styles.marginContent}>
                    <Text>
                      Especial agradecimiento a:{"\n"}
                      <Text style={styles.fontGod}>Dios todo poderoso{"\n"} </Text>
                      ● Benji Santos{"\n"} santsben@gmail.com{"\n"} 
                        <Text style={styles.colorOrange}> programemos{"\n"} </Text>
                      ● Carolina Gomez{"\n"} carola.masnaki@gmail {"\n"}
                        <Text style={styles.colorOrange}> carmen24{"\n"} </Text>
                      ● Carmen Enriquez{"\n"}(carmen.camuchita@gmail.com){"\n"}
                      <Text style={styles.colorOrange}> sandro24{"\n"} </Text>
                      ● Sandro Cruz{"\n"}(sangro.low_gg@gmail.com){"\n"}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },

  backgroundRadio: {
    backgroundColor: '#404040',
    flexDirection: 'column',
    tintColor: '#404040',
    height: 1000
  },

  marLeft: {
    textAlign: 'left'
  },

  margTop: {
    marginTop: 10,
    textAlign: 'left'
  },

  marginContent: {
    margin: 15
  },

  fontGod: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  marginTopText: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },

  colorBlackBold: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  },
  colorOrange: {
    color: 'orange'
  },

  colorWhite: {
    color: 'white'
  },

  centerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },

  searchForm: {
    height: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CECECE',
    textAlign: 'center',
    color: '#CECECE',
    margin: 5
  },

  titleMain: {
    color: '#4A4A4A',
    fontSize: 28,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif'
  },

  inlineNav: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 15
  }
});

const bomberos = StackNavigator(
  {
    EmergenciesListScreen: { screen: EmergenciesListScreen },
    RadioScreen: { screen: RadioScreen },
    ThanksScreen: { screen: ThanksScreen },
  },
  { headerMode: 'screen' }
);

AppRegistry.registerComponent('bomberos', () => bomberos);
