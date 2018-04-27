import React, { Component } from 'react';
import NoSleep from 'nosleep.js';
import PropTypes from 'prop-types';

import { DrawOneButton, DrawTwoButtons, DrawThreeButtons, DrawFourButtons } from './GameButton';
import SensorManager from '../SensorManager';
import KeyboardManager from '../KeyboardManager';
import GameHeader from './GameHeader';
import IconPreview from './IconPreview';

/*
Try to make screen fullscreen and lock orientation.
The extent to which these actions can be performed is browser dependent.
*/
function lockScreen() {
  if (
    !(
      document.mozFullScreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.fullscreenEnabled
    )
  ) {
    return;
  }

  if (typeof document.documentElement.webkitRequestFullscreen !== 'undefined') {
    // Chrome
    document.documentElement.webkitRequestFullscreen();
  } else if (typeof document.documentElement.mozRequestFullScreen !== 'undefined') {
    // Firefox
    document.documentElement.mozRequestFullScreen();
  }

  if (Document.fullscreenElement !== null) {
    // Is in fullscreen mode
    // Screen orientation lock currently only works properly in chrome
    // https://developer.mozilla.org/en-US/docs/Web/API/Screen/lockOrientation
    window.screen.orientation.lock('landscape-primary').catch(() => {});
  }
}

/*
Unlock screen rotation and exit fullscreen if applicable
*/
function unlockScreen() {
  if (typeof document.webkitCancelFullScreen !== 'undefined') {
    // Chrome
    document.webkitCancelFullScreen();
  } else if (typeof document.mozCancelFullScreen !== 'undefined') {
    // Firefox
    document.mozCancelFullScreen();
  }
}

/**
 * This class handles all the element being displayed while a game is in progress
 */
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { ping: '-' };
    this.sensorManager = new SensorManager(props.onSensorChange);
    this.sensorManager.calibrate = this.sensorManager.calibrate.bind(this);

    this.keyboardManager = new KeyboardManager(props.onSensorChange, props.gameButtonPressed);

    this.wakeLock = new NoSleep();
  }

  componentWillMount() {
    lockScreen();
    this.wakeLock.enable();
  }

  componentDidMount() {
    this.sensorManager.bindEventListener();
    this.keyboardManager.bindEventListener();

    this.intervalId = setInterval(() => {
      this.setState({ ping: this.props.com.currentPing });
    }, 1000);
  }

  componentWillUnmount() {
    unlockScreen();
    this.wakeLock.disable();
    this.sensorManager.unbindEventListener();
    this.keyboardManager.unbindEventListener();

    clearInterval(this.intervalId);
  }

  render() {
    let renderHelper;

    if (this.props.numberOfButtons === 0) {
      renderHelper = <div />;
    } else if (this.props.numberOfButtons === 1) {
      renderHelper = <DrawOneButton gameButtonPressed={this.props.gameButtonPressed} />;
    } else if (this.props.numberOfButtons === 2) {
      renderHelper = <DrawTwoButtons gameButtonPressed={this.props.gameButtonPressed} />;
    } else if (this.props.numberOfButtons === 4) {
      renderHelper = <DrawThreeButtons gameButtonPressed={this.props.gameButtonPressed} />;
    } else if (this.props.numberOfButtons === 3) {
      renderHelper = <DrawFourButtons gameButtonPressed={this.props.gameButtonPressed} />;
    } else {
      renderHelper = <div>Invaild amount of buttons requested </div>;
    }

    return (
      <div>
        <GameHeader
          goBack={this.props.goBack}
          ping={this.state.ping}
          calibrate={this.sensorManager.calibrate}
        />
        {renderHelper}
        <div className="gameIcon">
          <IconPreview
            iconID={this.props.iconID}
            iconColor={this.props.iconColor}
            backgroundColor={this.props.backgroundColor}
          />
        </div>
      </div>
    );
  }
}
// classes: PropTypes.object.isRequired
Game.propTypes = {
  numberOfButtons: PropTypes.number.isRequired,
  gameButtonPressed: PropTypes.func.isRequired,
  onSensorChange: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  // eslint-disable-next-line
  com: PropTypes.object.isRequired,
  iconID: PropTypes.number.isRequired,
  iconColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default Game;
