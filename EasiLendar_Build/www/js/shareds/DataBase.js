var database=angular.module('MainApp.shareds.dataBase',[]);database.run(function($rootScope,$ionicLoading,toastr,toastrConfig){var toString=function(){if($rootScope.eUser.uGmailCalendar!=null){var temp=[];for(var x in $rootScope.eUser.uGmailCalendar){temp[x]=$rootScope.eUser.uGmailCalendar[x];for(var y in temp[x]){temp[x][y].start.dateTime=temp[x][y].start.dateTime.toString();temp[x][y].end.dateTime=temp[x][y].end.dateTime.toString();}temp[x]=angular.copy(temp[x]);}$rootScope.eUser.uGmailCalendar=temp;}};$rootScope.convertCal=function(calendar){if(calendar!=null&&calendar!=""){var temp=[];for(var x in calendar){temp[x]=calendar[x];for(var y in temp[x]){temp[x][y].start.dateTime=new Date(temp[x][y].start.dateTime);temp[x][y].end.dateTime=new Date(temp[x][y].end.dateTime);}}
return temp;}};$rootScope.databaseLoading=function(){$ionicLoading.show({template:'<div id="followingBallsG"><div id="followingBallsG_1" class="followingBallsG"></div><div id="followingBallsG_2" class="followingBallsG"></div><div id="followingBallsG_3" class="followingBallsG"></div><div id="followingBallsG_4" class="followingBallsG"></div></div>',hideOnStateChange:true,});};$rootScope.setUFRL=function(){if($rootScope.eUser.uFRequest==null){$rootScope.eUser.uFRLength=0;}else{$rootScope.eUser.uFRLength=Object.keys($rootScope.eUser.uFRequest).length;}};$rootScope.setUFAL=function(){if($rootScope.eUser.uFAccepted==null){$rootScope.eUser.uFALength=0;}else{$rootScope.eUser.uFALength=Object.keys($rootScope.eUser.uFAccepted).length;}};var clearData=function(){$rootScope.eSettings={sEvent:true,sHoliday:true,sBirthday:true,sLocalCalendar:true,sGmailCalendar:true,sDefaultView:'month',sDayView:'eventList',sFirstDay:'Monday',sShowWeekNumber:true,sAutoSync:null,sSyncWith:'both 3G and wifi',sDefaultDuration:60,sDeviceTimeZone:true,sTimeZone:0,}
$rootScope.eUser={uID:'',uName:'',uAvatar:'0',uEmail:'',uPassword:'',uRemember:false,uFriend:[],uVIP:0,uGmailCalendar:null,uLocalCalendar:null,isLogin:false,uRequested:[],uFRequest:{},uFAccepted:{},uFRLength:0,uFALength:0,}};var checkSignIn=function(){if($rootScope.eUser.uID!=""&&$rootScope.eUser.uID!=null&&$rootScope.eUser.isLogin==true){return true;}else return false;};$rootScope.signOutEasi=function(){clearData();$rootScope.goToState("form");toastrConfig.positionClass='toast-sign-out';toastrConfig.preventDuplicates=true;toastr.success('Sign out successfully!',{timeOut:3000,extendedTimeout:2000});};$rootScope.addFriend=function(id){if(checkSignIn()&&id!=null&&id!=""){var ref=new Firebase("https://radiant-inferno-3243.firebaseio.com/Users");var idRef=ref.child(id);$rootScope.databaseLoading();var onComplete=function(error){if(error){console.log("failed");}else{$ionicLoading.hide();}};if($rootScope.eUser.uFRequest!=null&&$rootScope.eUser.uFRequest[id]!=null){idRef.once("value",function(snapshot){var user=snapshot.val();if(user==null){$rootScope.showAlert(id+"does not exist");}else{var name=user.name;var ava=user.avatar;var vip=user.VIP;var fFriend=idRef.child("friends/"+$rootScope.eUser.uID);fFriend.set({id:$rootScope.eUser.uID,name:$rootScope.eUser.uName,ava:$rootScope.eUser.uAvatar,VIP:vip,});var fAccept=idRef.child("noti/fAccept/"+$rootScope.eUser.uID);fAccept.set({id:$rootScope.eUser.uID,name:$rootScope.eUser.uName,ava:$rootScope.eUser.uAvatar,});var fRequested=idRef.child("requested/"+$rootScope.eUser.uID);fRequested.set(null);delete $rootScope.eUser.uFRequest[id];$rootScope.setUFRL();if($rootScope.eUser.uFriend==null)$rootScope.eUser.uFriend=[];$rootScope.eUser.uFriend[id]={id:id,name:name,ava:ava,VIP:vip,};var uFriend=ref.child($rootScope.eUser.uID+"/friends/"+id);uFriend.set({id:id,name:name,ava:ava,VIP:vip,});var uFRequest=ref.child($rootScope.eUser.uID+"/noti/fRequest/"+id);uFRequest.set(null,onComplete);}},function(errorObject){console.log("Failed to access"+ref);});}}};$rootScope.getCalendar=function(id){if(checkSignIn()&&id!=null&&id!=""){var ref=new Firebase("https://radiant-inferno-3243.firebaseio.com/Users/"+id);$rootScope.databaseLoading();ref.once("value",function(snapshot){var user=snapshot.val();if(user==null){$rootScope.showAlert(id+"does not exist");}else{user.g_calendar=$rootScope.convertCal(user.g_calendar);user.local_calendar=$rootScope.convertCal(user.local_calendar);var temp=[user.g_calendar,user.local_calendar];$rootScope.eFriend.fMultiCal=$rootScope.newMultiCal(temp);$ionicLoading.hide();}},function(errorObject){console.log("Failed to access"+ref);});}};$rootScope.request=function(id){if(checkSignIn()&&id!=null&&id!=""){if(id==$rootScope.eUser.uID)return null;var ref=new Firebase("https://radiant-inferno-3243.firebaseio.com/Users");var uRequest=ref.child($rootScope.eUser.uID+"/requested/"+id);var friend=ref.child(id);$rootScope.databaseLoading();var onComplete=function(error){if(error){console.log("failed");}else{$ionicLoading.hide();}};friend.once("value",function(snapshot){var user=snapshot.val();if(user==null){$rootScope.showAlert(id+"does not exist");}else{var fRequest=friend.child("noti/fRequest/"+$rootScope.eUser.uID);fRequest.set({id:$rootScope.eUser.uID,name:$rootScope.eUser.uName,ava:$rootScope.eUser.uAvatar,});if($rootScope.eUser.uRequested==null)$rootScope.eUser.uRequested=[];$rootScope.eUser.uRequested[id]={id:id,name:user.name,ava:user.avatar,};uRequest.set({id:id,name:user.name,ava:user.avatar,},onComplete);}},function(errorObject){console.log("Failed to access"+ref);});}};$rootScope.deleteFN=function(id){if(checkSignIn()&&id!=null&&id!=""){delete $rootScope.eUser.uFAccepted[id];$rootScope.setUFAL();var uAccept=new Firebase("https://radiant-inferno-3243.firebaseio.com/Users/"
+$rootScope.eUser.uID+"/noti/fAccept/"+id);$rootScope.databaseLoading();var onComplete=function(error){if(error){console.log("failed");}else{$ionicLoading.hide();}};uAccept.set(null,onComplete);}};$rootScope.deleteF=function(id){if(checkSignIn()&&id!=null&&id!=""){delete $rootScope.eUser.uFriend[id];var uFriend=new Firebase("https://radiant-inferno-3243.firebaseio.com/Users/"
+$rootScope.eUser.uID+"/friends/"+id);$rootScope.databaseLoading();uFriend.set(null);var onComplete=function(error){if(error){console.log("failed");}else{$ionicLoading.hide();}};var fFriend=new Firebase("https://radiant-inferno-3243.firebaseio.com/Users/"
+id+"/friends/"+$rootScope.eUser.uID);fFriend.set(null,onComplete);}};$rootScope.rejectF=function(id){if(checkSignIn()&&id!=null&&id!=""){delete $rootScope.eUser.uFRequest[id];$rootScope.setUFRL();var uRequest=new Firebase("https://radiant-inferno-3243.firebaseio.com/Users/"
+$rootScope.eUser.uID+"/noti/fRequest/"+id);var fRequested=new Firebase("https://radiant-inferno-3243.firebaseio.com/Users/"
+id+"/requested/"+$rootScope.eUser.uID);$rootScope.databaseLoading();var onComplete=function(error){if(error){console.log("failed");}else{$ionicLoading.hide();}};fRequested.set(null);uRequest.set(null,onComplete);}};$rootScope.searchFriend=function(str){$rootScope.searchFriends=[];if(checkSignIn()&&str!=''&&str!=null){var ref=new Firebase("https://radiant-inferno-3243.firebaseio.com/Users");$rootScope.databaseLoading();ref.once("value",function(snapshot){var ids=[];var names=[];var avas=[];var users=snapshot.forEach(function(child){ids.push(child.key());names.push(child.val().name);avas.push(child.val().avatar);});var length=0;for(var i=0;i<ids.length;i++){var found1=ids[i].search(str);var found2=names[i].search(str);if(found1!=-1||found2!=-1){$rootScope.searchFriends[length++]={id:ids[i],name:names[i],ava:avas[i],};}}
$ionicLoading.hide();});}};$rootScope.searchEvent=function(str){$rootScope.searchEvents=[];if(checkSignIn()&&str!=''&&str!=null){var length=0;for(var x in $rootScope.eUser.uGmailCalendar){for(var y in $rootScope.eUser.uGmailCalendar[x]){var found1=$rootScope.eUser.uGmailCalendar[x][y].summary.search(str);var found2=-1;if($rootScope.eUser.uGmailCalendar[x][y].location!=null){found2=$rootScope.eUser.uGmailCalendar[x][y].location.search(str);}
if(found1!=-1||found2!=-1){$rootScope.searchEvents[length++]=$rootScope.eUser.uGmailCalendar[x][y];}}}}};$rootScope.getInformation=function(id){if(checkSignIn()&&id!=null&&id!=""){var ref=new Firebase("https://radiant-inferno-3243.firebaseio.com/Users/"+id);$rootScope.databaseLoading();ref.once("value",function(snapshot){var user=snapshot.val();if(user==null){$rootScope.showAlert(id+"does not exist");}else{$rootScope.eFriend.fID=id;$rootScope.eFriend.fName=user.name;$rootScope.eFriend.fAvatar=user.avatar;$rootScope.eFriend.fVIP=user.VIP;$ionicLoading.hide();}},function(errorObject){console.log("Failed to access"+ref);});}};$rootScope.refresh=function(){if(checkSignIn()){var ref=new Firebase("https://radiant-inferno-3243.firebaseio.com/Users/"+$rootScope.eUser.uID);$rootScope.databaseLoading();ref.once("value",function(snapshot){var user=snapshot.val();$rootScope.eUser={uID:$rootScope.eUser.uID,uName:user.name,uAvatar:user.avatar,uEmail:user.gmail,uPassword:user.password,uRemember:false,uFriend:user.friends,uVIP:user.VIP,isLogin:true,uRequested:user.requested,uGmailCalendar:user.g_calendar,uLocalCalendar:user.local_calendar,uFRequest:(user.noti==null?null:user.noti.fRequest),uFAccepted:(user.noti==null?null:user.noti.fAccept),uFRLength:0,uFALength:0,};$rootScope.eUser.uGmailCalendar=$rootScope.convertCal($rootScope.eUser.uGmailCalendar);$rootScope.eUser.uLocalCalendar=$rootScope.convertCal($rootScope.eUser.uLocalCalendar);$rootScope.setUFRL();$rootScope.setUFAL();$ionicLoading.hide();},function(errorObject){$rootScope.goToState('warning');});}};$rootScope.updateCalendar=function(){if(checkSignIn()){toString();var user=new Firebase("https://radiant-inferno-3243.firebaseio.com/Users/"
+$rootScope.eUser.uID);$rootScope.databaseLoading();var onComplete=function(error){if(error){console.log("failed");}else{$ionicLoading.hide();}};var uGC=user.child("g_calendar");if($rootScope.eUser.uGmailCalendar!=null){uGC.set($rootScope.eUser.uGmailCalendar);}else{uGC.set(null);}
var uLocal=user.child("local_calendar");if($rootScope.eUser.uLocalCalendar!=null){uLocal.set($rootScope.eUser.uLocalCalendar,onComplete);}else{uLocal.set(null,onComplete);}}};$rootScope.viewProfile=function(id){if(checkSignIn()&&id!=null&&id!=""){var ref=new Firebase("https://radiant-inferno-3243.firebaseio.com/Users/"+id);$rootScope.databaseLoading();ref.once("value",function(snapshot){var user=snapshot.val();if(user==null){$rootScope.showAlert(id+"does not exist");}else{$rootScope.eFriend.fID=id;$rootScope.eFriend.fName=user.name;$rootScope.eFriend.fAvatar=user.avatar;$rootScope.eFriend.fVIP=user.VIP;$rootScope.eFriend.fFriend=user.friends;user.g_calendar=$rootScope.convertCal(user.g_calendar);user.local_calendar=$rootScope.convertCal(user.local_calendar);var temp=[user.g_calendar,user.local_calendar];$rootScope.eFriend.fMultiCal=$rootScope.newMultiCal(temp);$ionicLoading.hide();$rootScope.goToState("profile");}},function(errorObject){console.log("Failed to access"+ref);});}};$rootScope.getFriend=function(id){if(checkSignIn()&&id!=null&&id!=""){var ref=new Firebase("https://radiant-inferno-3243.firebaseio.com/Users/"+id);$rootScope.databaseLoading();ref.once("value",function(snapshot){var user=snapshot.val();if(user==null){$rootScope.showAlert(id+"does not exist");}else{$rootScope.eFriend.fFriend=user.friends;$ionicLoading.hide();}},function(errorObject){console.log("Failed to access"+ref);});}}});