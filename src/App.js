import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InstancePicker from './components/InstancePicker';
import SplashScreen from './components/SplashScreen';
import CharacterSelection from './components/CharacterSelection';
import Communication from './networking/Communication';
import settings from './config';
import Game from './components/Game';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowState: 'splashScreen',
      gameButtons: [],
      username: '',
      instanceName: '',
      iconID: -1,
      iconColor: '#FFFFFF',
      backgroundColor: '#000000',
    };

    // Make sure to not create communication when we're running as a test.
    // This is because of a weird TravisCI error.
    if (!props.test) {
      // Use local Deepstream server instead of remote.
      if (process.env.REACT_APP_LOCAL) {
        /* eslint-disable-next-line */
        console.log('Using local Deepstream server');
        const ip = document.location.href.split('://')[1].split(':')[0];
        const ipPort = `${ip}:60020`;
        settings.communication.host_ip = ipPort;
      }
      this.com = new Communication(settings.communication);
    }

    // Double check when back button is used
    window.addEventListener('beforeunload', e => {
      const confirmationMessage = 'No leave';
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    });

    // Bind
    this.enterCharacterSelection = this.enterCharacterSelection.bind(this);
    this.enterGame = this.enterGame.bind(this);
    this.enterInstancePicker = this.enterInstancePicker.bind(this);
    this.gameButtonPressed = this.gameButtonPressed.bind(this);
    this.renderInstancePicker = this.renderInstancePicker.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
    this.updatePlayerInfo = this.updatePlayerInfo.bind(this);
  }

  /**
   * Enters the detailed-session-window and passes information to App.js
   * @param instanceName The name of the instance to join
   * @param buttons An array containing the names of the buttons used in
   * the session's gamemode
   */
  enterCharacterSelection(instanceName, buttons) {
    this.setState({ instanceName, windowState: 'characterSelection', gameButtons: buttons });
  }

  /**
   * Used to switch to the main window where all Instances
   * are being displayed.
   */
  enterInstancePicker() {
    this.setState({ windowState: 'instancePicker' });
  }

  /**
   * Used to switch to the game window where all instances
   * are being displayed. Automatically tries to connect to the game instace.
   */
  enterGame() {
    /* eslint-disable-next-line */
    this.setState({
      windowState: 'game',
    });
    // eslint-disable-next-line
    this.com.joinInstance(
      this.state.instanceName,
      this.state.username,
      this.state.iconID,
      this.state.backgroundColor,
      this.state.iconColor,
      () => {}
    );
  }

  /** This function is called when leaving the CharacterSelection screen and stores the
   * players chosen presets.
   * @param username The players current username
   * @param iconID The players current icon
   * @param backgroundColor The players current background color
   * @param iconColor The players current icon color
   */
  updatePlayerInfo(username, iconID, backgroundColor, iconColor) {
    this.setState({
      username,
      iconID,
      backgroundColor,
      iconColor,
    });
  }

  /**
   * This function is called whenever a button in the gamescreen is pressed
   * @param buttonNumber is an integer identifying which of the buttons was pressed
   */
  gameButtonPressed(buttonNumber) {
    this.com.sendButtonPress(buttonNumber);
  }

  /**
   * Leaves the gamescreen and disconnects the player
   */
  leaveGame() {
    this.com.stopTick();
    this.setState({ windowState: 'instancePicker' });
  }

  renderSplashScreen() {
    return <SplashScreen buttonPressed={this.enterInstancePicker} />;
  }

  renderInstancePicker() {
    return (
      <InstancePicker
        enterCharacterSelection={this.enterCharacterSelection}
        communication={this.com}
      />
    );
  }

  renderCharacterSelection() {
    return (
      <CharacterSelection
        instanceName={this.state.instanceName}
        enterGame={this.enterGame}
        onInputSubmit={this.com.joinInstance}
        goBack={this.enterInstancePicker}
        username={this.state.username}
        updatePlayerInfo={this.updatePlayerInfo}
        iconID={this.state.iconID}
        iconColor={this.state.iconColor}
        backgroundColor={this.state.backgroundColor}
      />
    );
  }

  renderGame() {
    return (
      <Game
        buttons={this.state.gameButtons}
        gameButtonPressed={this.gameButtonPressed}
        onSensorChange={this.com.updateSensorData}
        username={this.state.username}
        instanceName={this.state.instanceName}
        goBack={this.leaveGame}
        com={this.com}
        iconID={this.state.iconID}
        iconColor={this.state.iconColor}
        backgroundColor={this.state.backgroundColor}
      />
    );
  }

  render() {
    let stateRender;

    if (this.state.windowState === 'splashScreen') {
      stateRender = this.renderSplashScreen();
    } else if (this.state.windowState === 'instancePicker') {
      stateRender = this.renderInstancePicker();
    } else if (this.state.windowState === 'characterSelection') {
      stateRender = this.renderCharacterSelection();
    } else if (this.state.windowState === 'game') {
      stateRender = this.renderGame();
    } else {
      return <div>no state is selected to show!</div>;
    }
    return <div>{stateRender}</div>;
  }
}

App.defaultProps = {
  test: false,
};

App.propTypes = {
  test: PropTypes.bool,
};

export default App;
