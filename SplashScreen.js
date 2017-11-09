/**
 * @file
 * This is Emergency component which represents row in timeline for every emergency.
 */
const URL = 'http://bomberos.devstec.com';
const React = require('react');
const ReactNative = require('react-native');
const {
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  Linking
} = ReactNative;

import { AppRegistry } from 'react-native';

class Emergency extends React.Component {
  _onClick = () => {
    this.props.onClick(this.props.data);
  };

  render() {
    const machines = this.props.data.machines.toString();
    const emergency_type = this.props.data.emergency_type.replace(/\s+/g, '-').toLowerCase();
    const IMAGES = {
      'accidente-vehicular': require('../images/accidente-vehicular.png'),
      'emergencia-medica': require('../images/emergencia-medica.png'),
      'incendio': require('../images/incendio.png'),
      'materiales-peligrosos': require('../images/materiales-peligrosos.png'),
      'rescate': require('../images/rescate.png'),
      'servicios-especial': require('../images/servicio-especial.png'),
    };
    /* @TODO: Replace <Image Source=... with this.props.data.emergency_type*/
    return (
     <TouchableWithoutFeedback onPress={this._onClick}>
        <View style={styles.row}>
         <View style={styles.content}>
          <View style={styles.padding_top}>
           <Image source={IMAGES[emergency_type]} style={{width: 50, height: 50}}/>
          </View>
          <View style={styles.text_center}>
            <Text style={styles.emergency_type}>
              {this.props.data.emergency_type}
            </Text>
            <Text style={styles.status}>
              {this.props.data.status}
            </Text>
            <Text style={styles.address}>
              {this.props.data.address}
            </Text>
            <Text style={styles.created}>
              {this.props.data.created}
            </Text>
            <Text style={styles.machines}>
            {machines}
            </Text>
          </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  content:{
    flex:1,
    flexDirection: 'row'
  },

  padding_left: {
    paddingLeft: 15,
  },

  emergency_type: {
    color: 'red',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 24
  },

  padding_top: {
    paddingTop: 20
  },

  address: {
    color:'black'
  },

  created: {
    color:'black'
  },

  status: {
    color: 'black',
    fontWeight: '700',
    textAlign:'center',
    fontSize: 18,
    paddingBottom: 5
  },

  machines: {
    color: 'black',
  },
  text_center: {
    textAlign: 'center',
    paddingLeft: 20
  },
  row: {
    borderWidth: 3,
    padding: 20,
    margin: 5,
    borderRadius: 10,
    borderColor: '#FF620E',
  },
  scrollview: {
    flex: 1,
  },
  address: {
    alignSelf: 'center',
    color: 'red',
  },
  emergency_type: {
    color: 'red',
  },
  status: {
    color: 'red',
  },
  created: {
    color: 'red',
  },
  machines: {
    color: 'red',
  },
});

export default Emergency;
