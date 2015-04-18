angular.module("MainApp.controllers.search",[]).controller("SearchController",function($scope,$rootScope,toastr,toastrConfig,$state){$scope.searchInput="";$rootScope.searchFriends=[];$rootScope.searchEvents=[];$rootScope.searchType={type:"All"};$rootScope.$on("$stateChangeStart",function(event,toState){if(toState.name=="search")resetData()});var resetData=function(){$scope.searchInput="";$rootScope.searchFriends=[];$rootScope.searchEvents=[]};$scope.search=function(){if($rootScope.searchType.type=="All"||$rootScope.searchType.type=="People"){$rootScope.searchFriend($scope.searchInput);console.log($rootScope.searchFriends)}if($rootScope.searchType.type=="All"||$rootScope.searchType.type=="Events"){$rootScope.searchEvent($scope.searchInput);console.log($rootScope.searchEvents)}};$scope.addPerson=function(ID){$rootScope.request(ID);$rootScope.toastSuccess("Sending request.",2E3)};$scope.isHide=function(ID){if(ID==$rootScope.eUser.uID)return true;if($rootScope.isFriend(ID))return true;if($rootScope.isRequested(ID))return true;return false};$scope.changeCall=function(event){$rootScope.toastSuccess("Coming soon...",2E3)};$scope.isEmptyResult=function(){return $rootScope.searchType.type=="All"&&$rootScope.searchFriends.length==0&&$rootScope.searchEvents.length==0||$rootScope.searchType.type=="People"&&$rootScope.searchFriends.length==0||$rootScope.searchType.type=="Events"&&$rootScope.searchEvents.length==0};$scope.isShowPeople=function(){return $rootScope.searchType.type=="All"||$rootScope.searchType.type=="People"};$scope.isShowEvents=function(){return $rootScope.searchType.type=="All"||$rootScope.searchType.type=="Events"}});