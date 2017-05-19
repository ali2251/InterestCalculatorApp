import axios from 'axios'

let getPeople = function() {
  return axios.get('http://swapi.co/api/people')
}

let getPerson = function(id) {
  return axios.get('http://swapi.co/api/people/' + id)
}

export { getPeople, getPerson }
