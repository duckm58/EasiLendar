angular.module('MainApp.controllers.home',[]).controller("HomeController",function($scope,$ionicPopover){$scope.calendarPopover=$ionicPopover.fromTemplate(template,{scope:$scope,});$ionicPopover.fromTemplateUrl('templates/calendar-select-popover.html',{scope:$scope,}).then(function(popover){$scope.calendarPopover=popover;});$scope.selectPopover=function($event){$scope.tabActive("friend");$scope.calendarPopover.show($event);};$scope.closeSelect=function(){$scope.calendarPopover.hide();};$scope.$on('$destroy',function(){$scope.calendarPopover.remove();});})