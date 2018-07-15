// Code goes here

(function() {

  var lastId = 0;
  var myApp = angular.module("sponsorApp", []);


  var MainController = function($scope, $http, $log) {

    $scope.selectUser = function(id) {
      var found = $scope.datam.find(function(element) {
        return element.Id == id;
      });

      $scope.selectedSponsor = JSON.parse(JSON.stringify(found));
    };

    $scope.editUser = function(sponsor) {


      var found = $scope.datam.find(function(element) {
        return element.Id == sponsor.Id;
      });

      found.FirstName = sponsor.FirstName;
      found.LastName = sponsor.LastName;
      found.Email = sponsor.Email;
      found.Amount = sponsor.Amount;
      found.Type = sponsor.Type;


    };

    $scope.createUser = function() {
      console.log($scope.selectedSponsor);

      var newSponsor = JSON.parse(JSON.stringify($scope.selectedSponsor));
      newSponsor.Id = lastId + 1;
      lastId += 1;

      $scope.datam.push(newSponsor);
    };

    $scope.deleteUser = function(id) {
      var found = $scope.datam.find(function(element) {
        return element.Id == id;
      });
      //adding alert to make sure user is okay with deleting

      console.log(id);
      console.log(found);

     
if ( confirm("Are you sure you want to delete this sponsor entry?")) {
    //some code
     var index = $scope.datam.indexOf(found);
      console.log(index);
      $scope.datam.splice(index, 1);
}
else {
    //some code

}

     

    };

    $scope.cancelUser = function(sponsor) {
      $scope.selectedSponsor = null;
    };

    //Initial load
    var onFileRead = function(response) {
      var config = {
        header: true
      };
      // Parse CSV string
      var returnFromPapa = Papa.parse(response.data, config);
      $scope.datam = returnFromPapa.data;

      //Set the id
      lastId = parseInt($scope.datam[$scope.datam.length - 1].Id);
    };

    var onError = function(reason) {
      $scope.error = "Sorry - Something is wrong";
    };

    $scope.saveXSL = function() {
      var config = {
        header: true
      };
      var returnFromPapa = Papa.unparse($scope.datam, config);

      console.log(returnFromPapa);

      var blob = new Blob([returnFromPapa], {
        type: "text/plain;charset=utf-8"
      });
      
      saveAs(blob, "backup"+Date().toString()+".csv");
     saveAs(blob, "tst.csv");

    };

    var init = function() {
      $http.get("./tst.csv")
        .then(onFileRead, onError);
    };
    init();

  };



  myApp.controller("MainController", MainController);



}());