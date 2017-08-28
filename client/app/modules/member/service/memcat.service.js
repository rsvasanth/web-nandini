(function () {
  'use strict';
  angular
    .module('com.module.member')
    .service('MemberCatService', function (CoreService, Membercategories,Country, gettextCatalog) {

      this.getMemberscat = function () {
        return Membercategories.find({

        }).$promise;
      };
    



    });

})();
