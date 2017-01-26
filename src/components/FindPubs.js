import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Card, Container, Content, Button,
  Input, Icon, Item, Title, Thumbnail,
} from 'native-base';
import { Image, View, Text } from 'react-native'

import {
  inputUpdate,
  fetchBreweryLocations,
  fetchBreweryLocation,
  reverseGeoLocLookup,
} from '../actions'

class FindPubs extends Component {

  state = {
    initialPosition: {},
    lastPosition: ''
  }

  onSearchButtonPress() {
    if (!this.props.locationChoice) {
      this.props.inputUpdate({ prop: 'locationChoice', value: 'Location Required' })
      console.log('no location choice')
    }
    else if (this.props.pubChoice) {
      this.props.fetchBreweryLocation(this.props.pubChoice, this.props.locationChoice)
    }
    else {
      this.props.fetchBreweryLocations(this.props.locationChoice)
    }
  }

  onCurrentLocationButtonPress() {
    console.log('Find current location')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position)
        // let initialPosition = JSON.stringify(position);
        let initialPosition = position;
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.props.reverseGeoLocLookup()
    // console.log(`Current Position: ${this.state.initialPosition}`)
  }

  render() {
    // <Text>{this.state.initialPosition}</Text>
    const barleylogo = require('./img/hops_and_barley.png')
    const hopIcon = require('./img/barley-icon.png')
    return (
      <Container style={styles.containerStyle}>
      <Content>
        <Title sytle={styles.titleStyle}>Brewery And Pub Locations </Title>

        <Thumbnail source={barleylogo} style={styles.imageStyle} />

          <Input
            style={styles.inputStyle}
            placeholder="Enter City"
            autoCorrect={false}
            autoCapitalize={'none'}
            value={this.props.locationChoice}
            onChangeText={value => this.props.inputUpdate({ prop: 'locationChoice', value })}
          />


        <Button
          rounded
          style={styles.buttonSearchStyle}
          onPress={this.onSearchButtonPress.bind(this)}
          >
          Search
        </Button>

        <Text style={styles.textStyle}><Thumbnail source={hopIcon} style={styles.iconStyle} /></Text>
        <Button
          bordered rounded small
          style={styles.buttonStyle}
          onPress={this.onCurrentLocationButtonPress.bind(this)}
          >
          Or Use Current Location
        </Button>
      </Content>

      </Container>

    )
  }
}

const styles = {

  containerStyle: {
    backgroundColor: '#ffffcc'
  },

  titleStyle: {
    marginTop: 30
  },

  textStyle: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
  },

  buttonStyle: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: 200,
    backgroundColor: '#ffffe6'
  },

  buttonSearchStyle: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: 300
  },

  inputStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 20,
    backgroundColor: '#ffffff',
    width: 300
  },

  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  imageStyle: {
    marginTop: 30,
    width: 300,
    height: 125,
    alignSelf: 'center',
  },

  iconStyle: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  }
}

const mapStatetoProps = (state) => {
  const { pubChoice, locationChoice } = state.user
  return { pubChoice, locationChoice };
}

export default connect(mapStatetoProps, {
  inputUpdate,
  fetchBreweryLocations,
  fetchBreweryLocation,
  reverseGeoLocLookup,
})(FindPubs)
