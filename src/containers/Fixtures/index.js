import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as FixturesActions from '../../actions/fixtures';

class Counter extends Component {
  componentDidMount(){
    this.props.loadFixtures();
  }

  loadingFixtures = () => {
    return(
      <div>
        Loading Fixtures, Please Wait...
      </div>
    );
  }

  fixtureLoadingFailed = () => {
    return(
      <div>
        Failed to Load Fixtures, Please try again.
      </div>
    );
  }

  formattedDate = (date) => {
    return (new Date(date).toString().split('GMT')[0]);
  }

  endedWorldCup = () => {
    return(
      <div>
        World Cup has ended. Thanks for using this widget!
      </div>
    );
  }

  fixturesList = (fixtures) => {
    return (
      <div className="Fixtures">
        {fixtures.map((fixture, index) => {
          let score_string = fixture.status == "TIMED" ? `${fixture.homeTeamName} vs ${fixture.awayTeamName}` : `${fixture.homeTeamName} ${fixture.result.goalsHomeTeam} vs ${fixture.result.goalsAwayTeam} ${fixture.awayTeamName}`;
          return(
            <div key={index} className="Fixture">
              <span>{score_string}</span>
              <div className="date-field">{this.formattedDate(fixture.date)}</div>
              <div className="status">{fixture.status.replace('_', ' ')}</div>
              <hr/>
            </div>
          );
        })}
      </div>
    )
  }

  render(){
    if (this.props.world_cup_ended){
      return this.endedWorldCup();
    } else if (this.props.load_fixture){
      return this.fixturesList(this.props.fixtures);
    } else if (this.props.load_fixture_failure) {
      return this.fixtureLoadingFailed();
    } else {
      return this.loadingFixtures();
    }
  }
}

var mapStateToProps = (state) => {
  return {
    fixtures: state.fixtures.fixtures,
    load_fixture: state.fixtures.load_fixture,
    load_fixture_initialize: state.fixtures.load_fixture_initialize,
    load_fixture_failure: state.fixtures.load_fixture_failure,
    world_cup_ended: state.fixtures.world_cup_ended
  };
}

var mapDispatchToProps = (dispatch) => {
  return(bindActionCreators(FixturesActions, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
