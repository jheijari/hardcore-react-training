import App from "../App";
import { connect } from "react-redux";
import { firePerson, hirePerson, getPersons } from "../../ducks/person";
import { withRouter } from "react-router";

export default withRouter(
  connect(
    state => ({
      persons: state.person.get("persons"),
      loading: state.ui.get("loading")
    }),
    {
      firePerson,
      hirePerson,
      getPersons
    }
  )(App)
);
