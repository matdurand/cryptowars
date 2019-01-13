import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Center from "../components/Center";
import Text from "../components/Text";
import Button from "../components/Button";
import Zone from "../components/Zone";
import { isEmpty } from "../utils/strings";

class NewWarriorPage extends React.Component {
  state = {
    warriorName: ""
  };

  constructor(props) {
    super(props);

    this.handleWarriorName = this.handleWarriorName.bind(this);
    this.onCreateWarrior = this.onCreateWarrior.bind(this);
  }

  handleWarriorName(event) {
    this.setState({ warriorName: event.target.value });
  }

  onCreateWarrior() {
    const warriorNameEmpty = isEmpty(this.state.warriorName);
    if (!warriorNameEmpty) {
      this.props.createWarrior({
        warriorName: this.state.warriorName
      });
    }
  }

  render() {
    const warriorNameEmpty = isEmpty(this.state.warriorName);
    return (
      <div>
        <Center>
          <Text>Create your new warrior</Text>
        </Center>
        <Zone>
          <label htmlFor="warriorName">
            Your hero name
            <input
              type="text"
              id="warriorName"
              name="warriorName"
              value={this.state.warriorName}
              onChange={this.handleWarriorName}
            />
          </label>
        </Zone>
        <div>
          <Button disabled={warriorNameEmpty} onClick={this.onCreateWarrior}>
            <p>Create</p>
          </Button>
        </div>
      </div>
    );
  }
}

const mapToDispatch = dispatch => ({
  createWarrior: dispatch.warriors.createWarrior
});

const NewWarriorPageContainer = connect(
  null,
  mapToDispatch
)(NewWarriorPage);

export default withRouter(NewWarriorPageContainer);
