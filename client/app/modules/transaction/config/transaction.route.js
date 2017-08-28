(function () {
  'use strict';
  angular
    .module('com.module.transaction')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.transaction', {
          abstract: true,
          url: '/transaction',
          templateUrl: 'modules/transaction/views/main.html'
        })
        .state('app.transaction.index', {
          url: '',
          templateUrl: 'modules/transaction/views/add.html',
          controller: 'transactionCtrl'
        })  .state('app.transaction.list', {
            url: '',
            templateUrl: 'modules/transaction/views/list.html',
            controller: 'transactionCtrl'
          });
    });

})();
