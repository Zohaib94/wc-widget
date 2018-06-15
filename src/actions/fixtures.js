import * as Types from './types';
import { WorldCupAPI } from '../lib/api';
const END_DATE = new Date('2018', '7', '16');

export function loadFixtures(){
  return (dispatch, getState) => {
    let today = new Date();
    if(today >= END_DATE){
      return dispatch(worldCupEndedDispatcher());
    } else {
      dispatch(loadFixturesInitializeDispatcher())
      WorldCupAPI.getFixtures()
        .then((response) => {
          let fixtures = {}
          fixtures = response.data.fixtures;
          fixtures = fixtures.filter(fixture => {
            let fixture_date = new Date(fixture.date)
            return (today.getDate() == fixture_date.getDate() && today.getMonth() == fixture_date.getMonth() && today.getYear() == fixture_date.getYear())
          });
          dispatch(loadFixturesDispatcher(fixtures));
        }).catch(error => {
          console.log(error)
          return dispatch(loadFixturesFailureDispatcher());
        });
    }
  }
}

function loadFixturesDispatcher(fixtures){
  return {
    type: Types.LOAD_FIXTURES,
    fixtures: fixtures,
    load_fixtures_failure: false,
    load_fixtures_initialize: false,
    load_fixtures: true
  };
}

function loadFixturesInitializeDispatcher(){
  return {
    type: Types.LOAD_FIXTURES_INITIALIZE,
    fixtures: [],
    load_fixtures_failure: false,
    load_fixtures_initialize: true,
    load_fixtures: false
  };
}

function loadFixturesFailureDispatcher(){
  return {
    type: Types.LOAD_FIXTURES_FAILURE,
    fixtures: [],
    load_fixtures_failure: true,
    load_fixtures_initialize: false,
    load_fixtures: false,
  }
}

function worldCupEndedDispatcher(){
  return {
    type: Types.WORLD_CUP_ENDED,
    world_cup_ended: true
  };
}


