console.log("Angular is running");
var app = angular.module('patroniApp', []);

app.controller('MainController', ['$http', function($http){

  var vm = this;
  vm.personObject = {};
  vm.personList;
  vm.patronusObject = {};
  vm.patronusList;

// [[[[[[[[[[[[ People ]]]]]]]]]]]]

  vm.sendPersonData = function() {
    $http.post('/people/addPerson', vm.personObject).then(function(serverResponse){
      console.log('added this person to db:', serverResponse);
      vm.personObject = {};
      vm.getPersonData();
    })
  }

  vm.getPersonData = function() {
    $http.get('/people/allPeople').then(function(serverResponse){
      console.log('all people from db:', serverResponse.data);
      vm.personList = serverResponse.data;
    })
  }

  vm.getPersonData();

// [[[[[[[[[ Patroni ]]]]]]]]]

vm.sendPatronusData = function() {
  $http.post('/patroni/addPatronus', vm.patronusObject).then(function(serverResponse){
    console.log('added this patronus to db:', serverResponse);
    vm.patronusObject = {};
    vm.getPatronusData();
  })
}

vm.getPatronusData = function() {
  $http.get('/patroni/allPatroni').then(function(serverResponse){
    console.log('all patroni from db:', serverResponse.data);
    vm.patronusList = serverResponse.data;
  })
}

vm.getPatronusData();

//  end controller
}])
