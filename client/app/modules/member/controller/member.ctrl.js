(function () {
  'use strict';
  angular
  .module('com.module.member')
  .controller('MemberCtrl',  function ($scope, $state, $log,member,MemberService) {

            $scope.members = "members";
            $scope.member = member;
            // $scope.data = MemberService.getCommunityName($scope.member.community).then(function(results){
            //   $scope.bardata = results.name;
            // });


})  .controller('MemberCtrl2',  function ($scope, $state,$http,$q,$log,members,MemberService) {


            $scope.members = members;


});
})();
