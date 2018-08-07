import React from "react";
import personService from "../services/person";

class HirePersonForm extends React.Component {
  state = {
    lastName: "",
    firstName: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    const { hirePerson } = this.props;
    const newPerson = {
      ...personService.createPerson(),
      ...this.state,
      age: 18
    };
    hirePerson(newPerson);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            value={this.state.firstName}
            onChange={e => this.setState({ firstName: e.currentTarget.value })}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            value={this.state.lastName}
            onChange={e => this.setState({ lastName: e.currentTarget.value })}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

export default HirePersonForm;
