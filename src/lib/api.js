import axios from 'axios';
import * as APIDetails from '../environment_variables';

const request_headers = {
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': APIDetails.API_KEY
  }
};

export class WorldCupAPI {
  static getFixtures () {
    return axios.get(APIDetails.API_ENDPOINT, this.data, request_headers);
  }
}
