/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 13/03/2015
 * type: month controller
 */

angular.module('MainApp.controllers.month', [])

.controller("MonthController", function($scope) {
    $scope.currentDate = new Date();
    $scope.currentDateNumber = $scope.currentDate.getDate();
    $scope.currentMonthNumber = $scope.currentDate.getMonth();
    $scope.currentYear = $scope.currentDate.getFullYear(); 
    $scope.months = [
                    'January', 'February','March', 'April', 'May',
                    'June', 'July', 'August', 'September','October',
                     'November', 'December'
                    ];
    $scope.weeks = [
                {days: [
                    {numberDate: 1, month: 2}, {numberDate: 2, month: 2}, {numberDate: 3, month: 2}, {numberDate: 4, month: 2}, {numberDate: 5, month: 2}, {numberDate: 6, month: 2}, {numberDate: 7, month: 2}
                ]},
                {days: [
                    {numberDate: 8, month: 2}, {numberDate: 9, month: 2}, {numberDate: 10, month: 2}, {numberDate: 11, month: 2}, {numberDate: 12, month: 2}, {numberDate: 13, month: 2}, {numberDate: 14, month: 2}
                ]},
                {days: [
                    {numberDate: 15, month: 2}, {numberDate: 16, month: 2}, {numberDate: 17, month: 2}, {numberDate: 18, month: 2}, {numberDate: 19, month: 2}, {numberDate: 20, month: 2}, {numberDate: 21, month: 2}
                ]},
                {days: [
                    {numberDate: 22, month: 2}, {numberDate: 23, month: 2}, {numberDate: 24, month: 2}, {numberDate: 25, month: 2}, {numberDate: 26, month: 2}, {numberDate: 27, month: 2}, {numberDate: 28, month: 2}
                ]},
                {days: [
                    {numberDate: 29, month: 2}, {numberDate: 30, month: 2}, {numberDate: 31, month: 2}, {numberDate: 1, month: 3}, {numberDate: 2, month: 3}, {numberDate: 3, month: 3}, {numberDate: 4, month: 3}
                ]}
            ];
    $scope.currentMonthString = $scope.months[$scope.currentMonthNumber];


    $scope.previousMonth = function(form){
        form.$setPristine();
        form.$setUntouched();
        $scope.currentMonthNumber = ($scope.currentMonthNumber-1 >= 0 ? 0 : 12) + ($scope.currentMonthNumber-1);
        $scope.currentMonthString = $scope.months[$scope.currentMonthNumber];
        if($scope.currentMonthNumber == 11) { $scope.currentYear --; }
        $scope.buildWeeks();
    };
    
    $scope.nextMonth = function(form){
        form.$setPristine();
        form.$setUntouched();
        $scope.currentMonthNumber = ($scope.currentMonthNumber+1) - ($scope.currentMonthNumber+1 > 11 ? 12 : 0);
        $scope.currentMonthString = $scope.months[$scope.currentMonthNumber];
        if($scope.currentMonthNumber == 0) { $scope.currentYear ++; }
        $scope.buildWeeks();
    }

    $scope.buildWeeks = function(){
    	$scope.newWeeks = angular.copy($scope.weeks);
    	delete $scope.weeks;
        var firstDatePreviousMonth = new Date($scope.currentYear,$scope.currentMonthNumber,1);
        var dayOfFirstDate = firstDatePreviousMonth.getDay(); 
        var numberDaysPreviousMonth = (new Date($scope.currentYear,$scope.currentMonthNumber,0)).getDate();
        var numberDaysCurrentMonth = (new Date($scope.currentYear,$scope.currentMonthNumber+1,0)).getDate();
        //alert(dayOfFirstDate.toString());
        //alert(numberDaysPreviousMonth.toString() + numberDaysCurrentMonth.toString() + $scope.currentMonthNumber.toString());
        var j = 0;
        $scope.newWeeks[0].days[dayOfFirstDate].numberDate = 1;
        $scope.newWeeks[0].days[dayOfFirstDate].month = $scope.currentMonthNumber;
        for(j=0;j<dayOfFirstDate;j++){
            $scope.newWeeks[0].days[j].numberDate = numberDaysPreviousMonth - (dayOfFirstDate-1-j);
            $scope.newWeeks[0].days[j].month =  $scope.currentMonthNumber-1;
        }
        for(j=6;j>dayOfFirstDate;j--){
            $scope.newWeeks[0].days[j].numberDate = 1 + (j-dayOfFirstDate);
            $scope.newWeeks[0].days[j].month =  $scope.currentMonthNumber;
        }
        
        for(var i=1;i<5;i++){
            for(j=0;j<7;j++){
                if(i==1) { var numberDaysMonth = numberDaysPreviousMonth; }
                else { numberDaysMonth = numberDaysCurrentMonth; }
                $scope.newWeeks[i].days[j].numberDate = ($scope.newWeeks[i-1].days[j].numberDate+7) - (($scope.newWeeks[i-1].days[j].numberDate+7) > numberDaysMonth ? numberDaysMonth:0);
                
                $scope.newWeeks[i].days[j].month =  $scope.currentMonthNumber;
                if(i >= 3 && $scope.newWeeks[i-1].days[j].numberDate+7 > numberDaysCurrentMonth){
                    $scope.newWeeks[i].days[j].month =  $scope.currentMonthNumber+1;
                    //alert($scope.newWeeks[i].days[j].month.toString() + $scope.newWeeks[i].days[j].numberDate.toString());
                }
            }
        }
        
        if($scope.newWeeks[4].days[6].numberDate < numberDaysCurrentMonth && $scope.newWeeks[4].days[6].month == $scope.currentMonthNumber) {
            var days = angular.copy($scope.newWeeks[4].days);
            for(j=0;j<7;j++){
                days[j].numberDate = (days[j].numberDate+7) - ((days[j].numberDate+7) > numberDaysCurrentMonth ? numberDaysCurrentMonth:0);
                days[j].month = $scope.currentMonthNumber;
                if($scope.newWeeks[4].days[j].numberDate+7 > numberDaysCurrentMonth){
                    days[j].month =  $scope.currentMonthNumber+1;
                }
            }
            $scope.newWeeks.push( {days:days} );
        }
        else { $scope.newWeeks.splice(5,1); }

        $scope.weeks = angular.copy($scope.newWeeks);
        delete $scope.newWeeks;
    }

    $scope.backgroundMonth = function(){
        if($scope.currentMonthString == 'January'){
            $scope.backgroundMonthName = 'bkg-01';
        }
        else if($scope.currentMonthString == 'February'){
            $scope.backgroundMonthName = 'bkg-02';
        }
        else if($scope.currentMonthString == 'March'){
            $scope.backgroundMonthName = 'bkg-03';
        }
        else if($scope.currentMonthString == 'April'){
            $scope.backgroundMonthName = 'bkg-04';
        }
        else if($scope.currentMonthString == 'May'){
            $scope.backgroundMonthName = 'bkg-05';
        }
        else if($scope.currentMonthString == 'June'){
            $scope.backgroundMonthName = 'bkg-06';
        }
        else if($scope.currentMonthString == 'July'){
            $scope.backgroundMonthName = 'bkg-07';
        }
        else if($scope.currentMonthString == 'August'){
            $scope.backgroundMonthName = 'bkg-08';
        }
        else if($scope.currentMonthString == 'September'){
            $scope.backgroundMonthName = 'bkg-09';
        }
        else if($scope.currentMonthString == 'October'){
            $scope.backgroundMonthName = 'bkg-10';
        }
        else if($scope.currentMonthString == 'November'){
            $scope.backgroundMonthName = 'bkg-11';
        }
        else{
            $scope.backgroundMonthName = 'bkg-12';
        }
        return $scope.backgroundMonthName;
    };
})

.directive('radioCalendar', function(){
    return{
        restrict: 'A',
        link: function(scope,element,attr){
            /*
            var labelRadio = element.next();
            labelRadio.bind('mousedown',function(){
                if(element.prop("checked") == true){
                    labelRadio.bind('mouseup',function(){
                        setTimeout(function(){
                            element.prop('checked',false);
                            element.parent().removeClass('radio-month-selected');
                        },5);
                    });
                    var modelName = element.attr("data-ng-model");
                }
                else{
                    labelRadio.bind('mouseup',function(){
                        setTimeout(function(){
                            element.prop('checked',true);
                            element.parent().addClass('radio-month-selected');
                        },5);
                    });
                }      
            });
            */
            element.bind('focus',function(){
                    element.parent().addClass('radio-month-selected');
            });
            element.bind('blur',function(){
                element.parent().removeClass('radio-month-selected');
            });

        }
    };
})

.directive('differentMonth',function(){
    return{
        restrict: 'A',
        scope: {
            isDifferent: "=differentMonth",
            isCurrentDay: "=currentDay"
        },
        link: function(scope,element,attr){
        	var month = attr.currentMonth;
        	var year = attr.currentYear;
        	var toDay = new Date();
            scope.$watch('isCurrentDay', function(){
            	if(scope.isCurrentDay == toDay.getDate() && scope.isDifferent == toDay.getMonth() 
            	   && year == toDay.getFullYear()){
            		element.addClass('current-date-style');
            	}
            });

            scope.$watch('isDifferent', function(){
            	if(scope.isDifferent != month){
            		element.addClass('different-month-color');
            	}
            })
        }
    };
})
