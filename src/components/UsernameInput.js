import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import IconList from './IconList';

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
    width: '100%',
    marginTop: 5,
    position: 'fixed',
    top: 120,
    left: 0
  }
});

/**
 * The class responsible to handle the username input through a text field
 * and a button to send it to the server.
 */
class UsernameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      iconID: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIconSelect = this.handleIconSelect.bind(this);
  }

  /**
   * Is called when the Join button is pressed, callbacks to enterGameWindow in App.js
   * with the argument of what is written in the text field.
   */
  handleSubmit() {
    this.props.showGameWindow(this.state.username, this.state.iconID);
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
          onClick={this.props.goBack}
        >
          Back
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
  goBack: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styles)(UsernameInput);
