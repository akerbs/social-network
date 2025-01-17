import React, { ChangeEvent } from "react";

type PropsType = {
  status: string;
  updateStatus: (newStatus: string) => void;
};

type StateType = {
  editMode: boolean;
  status: string;
};

class ProfileStatus extends React.Component<PropsType, StateType> {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    // debugger;
    // console.log("this:", this);
    this.setState({
      editMode: true,
    });
    // this.state.editMode = true;
    // this.forceUpdate();
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  componentDidUpdate = (prevProps: PropsType, prevState: StateType) => {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }

    // console.log("componentDidUpdate");
  };

  render() {
    // console.log("render");
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "---"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
              onChange={this.onStatusChange}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
