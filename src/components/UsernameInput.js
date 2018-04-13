import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import IconList from './IconList';
import NameRandomizer from './NameRandomizer';

const styles = () => ({
  text: {
    width: '100%'
  },
  joinButton: {
    width: '100%',
    position: 'fixed',
    top: 80,
    left: 0
  },

  backButton: {
    width: '49%',
    marginTop: 5,
    position: 'fixed',
    top: 120,
    left: 0
  },
  randomButton: {
    width: '49%',
    marginTop: 5,
    position: 'fixed',
    top: 120,
    right: 0
  }
});

/**
 * The class responsible to handle the username input through a text field
 * and a button to send it to the server.
 */
class UsernameInput extends Component {
  constructor(props) {
    super(props);
    this.randomizer = new NameRandomizer();
    this.state = {
      username: this.props.username,
      iconID: 0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.randomizeName = this.randomizeName.bind(this);
    this.handleIconSelect = this.handleIconSelect.bind(this);
  }

  /**
   * Is called when the Join button is pressed, callbacks to enterGameWindow in App.js
   * with the argument of what is written in the text field.
   * If no username is specified the game generates a random one for the player.
   */
  handleSubmit() {
    if (this.state.username === '') {
      this.props.showGameWindow(this.randomizer.getRandomName(), this.state.iconID);
    } else {
      this.props.showGameWindow(this.state.username, this.state.iconID);
    }
  }

  handleIconSelect(iconID) {
    this.setState({
      iconID
    });
  }

  /**
   * Set new state on input change.
   */
  handleInputChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  /**
   * Leaves this window and saves the username
   */
  goBack() {
    this.props.goBack(this.state.username);
  }

  /**
   * Changes the current username to a random one
   */
  randomizeName() {
    this.setState({ username: this.randomizer.getRandomName() });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          className={classes.text}
          value={this.state.username}
          onChange={this.handleInputChange}
          placeholder="Enter a name..."
          label="Enter playername"
          fullWidth
        />
        <Button
          className={classes.joinButton}
          variant="raised"
          color="primary"
          onClick={this.handleSubmit}
        >
          Join
        </Button>
        <Button
          className={classes.backButton}
          variant="raised"
          color="primary"
          onClick={this.goBack}
        >
          Back
        </Button>
        <Button
          className={classes.randomButton}
          variant="raised"
          color="primary"
          onClick={this.randomizeName}
        >
          Random
        </Button>
        <IconList onIconSelect={this.handleIconSelect} />
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
UsernameInput.propTypes = {
  showGameWindow: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styles)(UsernameInput);
