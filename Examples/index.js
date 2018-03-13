/**
 * Copyright (c) 2015-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import Config from 'react-native-config'
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  NativeModules,
} from 'react-native';

import {
  ViroSceneNavigator,
  ViroARSceneNavigator,
  Viro3DSceneNavigator,
  ViroVRSceneNavigator,
  ViroUtils,
} from 'react-viro';

import renderIf from './js/release_test/renderIf';

var InitialVRScene = require('./js/release_test/ViroSkyBoxTest');
var InitialARScene = require('./js/AR/release_test/ARSceneAndNavigatorTest');

var UNSET = "UNSET";
var VR_NAVIGATOR_TYPE = "VR";
var AR_NAVIGATOR_TYPE = "AR";
var SCENE_NAVIGATOR_TYPE = "3D Scene";
var VR_DEPRECATED_TYPE = "VR (deprecated)";

var isARSupportedOnDevice = ViroUtils.isARSupportedOnDevice;
export default class ViroExperienceSelector extends Component {
  constructor() {
    super();

    var sharedProps = {
      apiKey:"7EEDCB99-2C3B-4681-AE17-17BC165BF792",
    }
    console.log("Config.FLAVOR - " + Config.VR_PLATFORM);
    this.state = {
      navigatorType : Config.VR_PLATFORM == "OVR_MOBILE" ? VR_NAVIGATOR_TYPE : UNSET,
      sharedProps : sharedProps,
      vrMode : Config.FLAVOR == "ovr" ? true : UNSET,
      worldAlignment : UNSET,
      autofocus : true,
      videoQualityHigh : true,
      initial3DScene : UNSET,
    }
    this._getSelectionButtons = this._getSelectionButtons.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this._get3DSceneNavigator = this._get3DSceneNavigator.bind(this);
    this._getButtonPress = this._getButtonPress.bind(this);
    this._toggleAutofocus = this._toggleAutofocus.bind(this);
    this._toggleVideoQuality = this._toggleVideoQuality.bind(this);
    this._handleARSupported = this._handleARSupported.bind(this);
    this._handleARNotSupported = this._handleARNotSupported.bind(this);
    this._getInitialSelectionButtons = this._getInitialSelectionButtons.bind(this);
    this._getSceneSelectionButtons = this._getSceneSelectionButtons.bind(this);
  }
  componentWillMount() {
    isARSupportedOnDevice(this._handleARNotSupported,this._handleARSupported);
  }
  _handleARSupported() {
    console.log("AR supported");
  }
  _handleARNotSupported() {
    console.log("AR not supported");
  }
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getSceneSelectionButtons();
    } else if (this.state.navigatorType == VR_NAVIGATOR_TYPE || this.state.navigatorType == VR_DEPRECATED_TYPE ) {
      if (this.state.vrMode == UNSET) {
        return this._getSelectionButtons();
      } else {
        return this._getVRNavigator();
      }
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      if (this.state.worldAlignment == UNSET) {
        return this._getSelectionButtons();
      } else {
        return this._getARNavigator();
      }
    } else if (this.state.navigatorType == SCENE_NAVIGATOR_TYPE ) {
      if (this.state.initial3DScene == UNSET) {
        return this._getInitialSelectionButtons();
      } else {
        return this._get3DSceneNavigator();
      }
    } 
  }
    _getSceneSelectionButtons() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            {this._getTitleText()}
          </Text>

          <TouchableHighlight style={this.state.navigatorType == UNSET ? localStyles.buttons : localStyles.vrModeButtons}
            onPress={this._getButtonPress(1)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>
              {this._getButtonText(1)}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight style={this.state.navigatorType == UNSET ? localStyles.buttons : localStyles.vrModeButtons}
            onPress={this._getButtonPress(2)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>
              {this._getButtonText(2)}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight style={this.state.navigatorType == UNSET ? localStyles.buttons : localStyles.vrModeButtons}
            onPress={this._getButtonPress(3)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>
              {this._getButtonText(3)}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight style={this.state.navigatorType == UNSET ? localStyles.buttons : localStyles.vrModeButtons}
            onPress={this._getButtonPress(4)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>
              {this._getButtonText(4)}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  _getInitialSelectionButtons() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            {this._getTitleText()}
          </Text>

          <TouchableHighlight style={this.state.navigatorType == UNSET ? localStyles.buttons : localStyles.vrModeButtons}
            onPress={()=>{this.setState({initial3DScene : require('./js/release_test/GroupTestBasicEvents')})}}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>
              {this._getButtonText(1)}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight style={this.state.navigatorType == UNSET ? localStyles.buttons : localStyles.vrModeButtons}
            onPress={()=>{this.setState({initial3DScene : require('./js/release_test/GroupTestDragEvents')})}}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>
              {this._getButtonText(2)}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight style={this.state.navigatorType == UNSET ? localStyles.buttons : localStyles.vrModeButtons}
            onPress={()=>{this.setState({initial3DScene : require('./js/release_test/ViroVideoTest')})}}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>
              {this._getButtonText(3)}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight style={this.state.navigatorType == UNSET ? localStyles.buttons : localStyles.vrModeButtons}
            onPress={()=>{this.setState({initial3DScene : require('./js/release_test/ViroSoundTest')})}}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>
              {this._getButtonText(4)}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  _getSelectionButtons() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            {this._getTitleText()}
          </Text>

          <TouchableHighlight style={this.state.navigatorType == UNSET ? localStyles.buttons : localStyles.vrModeButtons}
            onPress={this._getButtonPress(1)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>
              {this._getButtonText(1)}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight style={this.state.navigatorType == UNSET ? localStyles.buttons : localStyles.vrModeButtons}
            onPress={this._getButtonPress(2)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>
              {this._getButtonText(2)}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  _getTitleText() {
    if (this.state.navigatorType == UNSET) {
      return "Choose your desired experience:"
    } else {
      if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
        return "VR Mode or 360?"
      } else if (this.state.navigatorType == SCENE_NAVIGATOR_TYPE) {
        return "Scene View Spot Check Options:"
      } else {
        return "World Alignment? (No effect on Android)"
      }
      
    }
  }
  _getButtonText(buttonNum) {
    if (this.state.navigatorType == UNSET) {
      switch (buttonNum) {
        case 1:
         return AR_NAVIGATOR_TYPE;
        case 2:
          return VR_NAVIGATOR_TYPE;
        case 3:
          return SCENE_NAVIGATOR_TYPE;
        case 4:
          return VR_DEPRECATED_TYPE;
      }
    } else {
      if (this.state.navigatorType == VR_NAVIGATOR_TYPE || this.state.navigatorType == VR_DEPRECATED_TYPE) {
        return (buttonNum == 1 ? "VR" : "360")
      } else if (this.state.navigatorType == SCENE_NAVIGATOR_TYPE) {
        switch (buttonNum) {
          case 1:
            return "Basic Events";
          case 2:
            return "Drag Events";
          case 3: 
            return "Videos";
          case 4:
            return "Sounds";
        }
      }else {
        return (buttonNum == 1 ? "Gravity" : "Heading");
      }
    }
  }
  _getARNavigator() {
    return (
      <View style={localStyles.viroContainer} >
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{scene: InitialARScene}}
          worldAlignment={this.state.worldAlignment}
          videoQuality={this.state.videoQualityHigh ? "High" : "Low"}
          autofocus={this.state.autofocus}
          viroAppProps={{ toggleAutofocus : this._toggleAutofocus,
                          toggleVideoQuality : this._toggleVideoQuality}} />

        <View style={localStyles.exitButtonContainer}>
          <TouchableHighlight style={localStyles.exitButton}
            onPress={()=>{this.setState({navigatorType : UNSET, vrMode : UNSET, worldAlignment : UNSET})}}
            underlayColor={'#00000000'} >
            <Text style={localStyles.buttonText}>Exit</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _getVRNavigator() {
    return (
      <View style={localStyles.viroContainer} >
        {renderIf(this.state.navigatorType == VR_NAVIGATOR_TYPE,
          <ViroVRSceneNavigator {...this.state.sharedProps}
            initialScene={{scene: InitialVRScene}}
            vrModeEnabled={this.state.vrMode}
            onExitViro={()=>{this.setState({navigatorType : UNSET, vrMode : UNSET})}}/>)}
        {renderIf(this.state.navigatorType == VR_DEPRECATED_TYPE,
          <ViroSceneNavigator {...this.state.sharedProps}
            initialScene={{scene: InitialVRScene}}
            vrModeEnabled={this.state.vrMode}
            onExitViro={()=>{this.setState({navigatorType : UNSET, vrMode : UNSET})}}/>)}

        <View style={localStyles.exitButtonContainer}>
          <TouchableHighlight style={localStyles.exitButton}
            onPress={()=>{this.setState({navigatorType : UNSET, vrMode : UNSET})}}
            underlayColor={'#00000000'} >
            <Text style={localStyles.buttonText}>Exit</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _get3DSceneNavigator() {
    return (
      <View style={localStyles.viroContainer} >
        <Viro3DSceneNavigator
          {...this.state.sharedProps}
          initialScene={{scene: this.state.initial3DScene == UNSET ? InitialVRScene : this.state.initial3DScene}}
          onExitViro={()=>{this.setState({navigatorType : UNSET, vrMode : UNSET, initial3DScene: UNSET})}}/>

        <View style={localStyles.exitButtonContainer}>
          <TouchableHighlight style={localStyles.exitButton}
            onPress={()=>{this.setState({navigatorType : UNSET, vrMode : UNSET, worldAlignment : UNSET, initial3DScene: UNSET})}}
            underlayColor={'#00000000'} >
            <Text style={localStyles.buttonText}>Exit</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _getButtonPress(buttonNum) {
    if (buttonNum == 1) {
      if (this.state.navigatorType == UNSET) {
        return ()=>{this.setState({navigatorType : AR_NAVIGATOR_TYPE})}
      } else {
        // It doesn't matter that we're changing 2 states because AR uses one and VR uses the other
        // and both get reset upon "exit".
        return ()=>{this.setState({vrMode : true, worldAlignment : "Gravity"})}
      }
    } else if (buttonNum == 2) {
      if (this.state.navigatorType == UNSET) {
        return ()=>{this.setState({navigatorType : VR_NAVIGATOR_TYPE})}
      } else {
        return ()=>{this.setState({vrMode : false, worldAlignment : "GravityAndHeading"})}
      }
    } else if (buttonNum == 3) {
      if (this.state.navigatorType == UNSET) {
        return ()=>{this.setState({navigatorType : SCENE_NAVIGATOR_TYPE})}
      }
    } else if (buttonNum == 4) {
      if (this.state.navigatorType == UNSET) {
        return ()=>{this.setState({navigatorType : VR_DEPRECATED_TYPE})}
      } else {
        return ()=>{this.setState({vrMode : false, worldAlignment : "GravityAndHeading"})}
      }
    }

    return () => {
      this.setState({
        navigatorType : navigatorType
      })
    }
  }

  _toggleAutofocus() {
    this.setState({
      autofocus : !this.state.autofocus
    });
  }

  _toggleVideoQuality() {
    this.setState({
      videoQualityHigh : !this.state.videoQualityHigh
    });
  }
}

var localStyles = StyleSheet.create({
  viroContainer : {
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  vrModeButtons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#1111aa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButtonContainer : {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    alignSelf : 'center'
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

AppRegistry.registerComponent('ViroSample', () => ViroExperienceSelector);

module.exports = ViroExperienceSelector;
