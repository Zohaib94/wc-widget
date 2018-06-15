import createReducer from '../lib/create_reducer';
import * as Types from '../actions/types';

var initialState = {
  fixtures: [],
  count: 0,
  load_fixture: false,
  load_fixture_initialize: true,
  load_fixture_failure: false,
  world_cup_ended: false
};

export default createReducer(initialState, {
  [Types.LOAD_FIXTURES](state, action) {
    return {...state, fixtures: action.fixtures, load_fixture: true, load_fixture_failure: false, load_fixture_initialize: false};
  },
  [Types.LOAD_FIXTURES_FAILURE](state, action) {
    return {...state, fixtures: action.fixtures, load_fixture: false, load_fixture_failure: true, load_fixture_initialize: false};
  },
  [Types.LOAD_FIXTURES_INITIALIZE](state, action) {
    return {...state, fixtures: action.fixtures, load_fixture: false, load_fixture_failure: false, load_fixture_initialize: true};
  },
  [Types.WORLD_CUP_ENDED](state, action) {
    return {...state, world_cup_ended: true}
  }
});
