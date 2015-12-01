var _ = require('lodash')

var users = {
  'data': {'user': 'barney' ,' x': { 'user': 'fred' }, 'd': ['d','dd']}
  };

  var ages = {
    'data': {'age': 36 ,  'd': ['pankaj','kali'] }
    };

_.merge(users, ages);
console.log(users)
