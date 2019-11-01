import axios from 'axios';

export default axios.create({
    //baseURL: 'https://uat.api.agzaya.yazahtani.net/api/',
    baseURL: 'http://127.0.0.1:9005/api/v1/',
    headers: {
      // Authorization : Bearer ${saveData},
      // 'Accept': 'application/json',
      //'Content-Type': 'application/json',
      // Authorization: `Bearer ${saveToken}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded'
    }
  });
  
  