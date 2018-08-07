import { Map, List } from "immutable";
import personService from "../services/person";

const HIRE_PERSON_PENDING = "HIRE_PERSON_PENDING";
const HIRE_PERSON_FULFILLED = "HIRE_PERSON_FULFILLED";
const HIRE_PERSON_REJECTED = "HIRE_PERSON_REJECTED";

const FIRE_PERSON_PENDING = "FIRE_PERSON_PENDING";
const FIRE_PERSON_FULFILLED = "FIRE_PERSON_FULFILLED";
const FIRE_PERSON_REJECTED = "FIRE_PERSON_REJECTED";

const GET_PERSONS_PENDING = "GET_PERSONS_PENDING";
const GET_PERSONS_REJECTED = "GET_PERSONS_REJECTED";
const GET_PERSONS_FULFILLED = "GET_PERSONS_FULFILLED";

export const hirePerson = person => {
  return async dispatch => {
    dispatch({
      type: HIRE_PERSON_PENDING
    });
    try {
      await personService.hirePerson(person);
      dispatch({
        type: HIRE_PERSON_FULFILLED,
        payload: person
      });
    } catch (e) {
      dispatch({
        type: HIRE_PERSON_REJECTED,
        payload: e,
        error: true
      });
    }
  };
};

// thunk module handles function payload as async dispatching PENDING, REJECTED and FULFILLED
export const firePerson = id => {
  return {
    type: "FIRE_PERSON",
    payload: { promise: personService.firePerson(id), data: id }
  };
};

export const getPersons = () => {
  return async dispatch => {
    dispatch({
      type: GET_PERSONS_PENDING
    });
    try {
      const persons = await personService.getPersons();
      dispatch({
        type: GET_PERSONS_FULFILLED,
        payload: persons
      });
    } catch (e) {
      dispatch({
        type: GET_PERSONS_REJECTED,
        payload: e,
        error: true
      });
    }
  };
};

const defaultState = Map({
  persons: List()
});

export default function personReducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case FIRE_PERSON_PENDING:
      return state.updateIn(
        ["persons", state.get("persons").findIndex(p => p.id === payload)],
        p => {
          return {
            ...p,
            firing: true
          };
        }
      );
    case FIRE_PERSON_FULFILLED:
      return state.update("persons", persons =>
        persons.filter(p => p.id !== payload.id)
      );

    case HIRE_PERSON_FULFILLED:
      return state.update("persons", persons => persons.push(payload));

    case GET_PERSONS_FULFILLED:
      return state.update("persons", () => List(payload));

    default:
      return state;
  }
}
