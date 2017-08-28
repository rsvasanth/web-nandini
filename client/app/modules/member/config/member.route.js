
(function () {
  'use strict';
  angular
    .module('com.module.member')
    .provider('modalState', ['$stateProvider', function($stateProvider) {
      var provider = this;
      this.$get = function() {
        return provider;
      }
      this.state = function(stateName, options) {
        var modalInstance;
        options.onEnter = onEnter;
        options.onExit = onExit;
        if (!options.resolve) options.resolve = [];
        var resolveKeys = angular.isArray(options.resolve) ? options.resolve : Object.keys(options.resolve);
        $stateProvider.state(stateName, omit(options, ['template', 'templateUrl', 'controller', 'controllerAs']));
        onEnter.$inject = ['$modal', '$state', '$timeout'].concat(resolveKeys);
        function onEnter($modal, $state, $timeout) {
          options.resolve = {};
          for (var i = onEnter.$inject.length - resolveKeys.length; i < onEnter.$inject.length; i++) {
            (function(key, val) {
              options.resolve[key] = function() { return val }
            })(onEnter.$inject[i], arguments[i]);
          }
          $timeout(function() { // to let populate $stateParams
            modalInstance = $modal.open(options);
            modalInstance.result.finally(function() {
              $timeout(function() { // to let populate $state.$current
                if ($state.$current.name === stateName)
                $state.go(options.parent || '^.index');
              });
            });
          });
        }
        function onExit() {
          if (modalInstance)
          modalInstance.close();
        }
        return provider;
      }

    }])
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.member', {
          abstract: true,
          url: '/member',
          templateUrl: 'modules/member/views/main.html'
        })
        .state('app.member.index', {
          url: '',
          templateUrl: 'modules/member/views/list.html',
          controllerAs: 'ctrl',
          controller: 'MemberCtrl2',
          resolve: {
            members: function (MemberService) {
              return MemberService.getMembers();
            }
          }
        }).state('app.member.edit', {
          url: '/:memberId/edit',
          templateUrl: 'modules/member/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, MemberService,categories, member) {
            console.log(member);
            this.config = {
              itemsPerPage: 5,
              fillLastPage: true
            };
            this.member = member;
            this.categories = categories;
            this.formFields = MemberService.getFormFields(categories);
            this.formOptions = {};
            this.submit = function () {
              MemberService.upsertMember(this.member).then(function () {
                $state.go('^.index');
              });
            };
          },
          resolve: {
            categories: function (CategoriesService) {
              return CategoriesService.getCategories();
            },
            member: function ($stateParams, MemberService) {
              return MemberService.getMember($stateParams.memberId);
            }
          }
        }).state('app.member.add', {
          url: '/add',
          templateUrl: 'modules/member/views/form.html',
            controllerAs: 'ctrl',
          controller: function ($state, MemberService,mcategory,mpackage,community, country,member) {
            this.community = community;
            this.mpackage = mpackage;
            this.mcategory = mcategory;
            this.country = country;
            this.member = member;
            this.formFields = MemberService.getFormFields(mcategory,mpackage,community,country);
            this.formOptions = {};
            this.submit = function () {
              MemberService.upsertMember(this.member).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            member: function () {
              return {};
            },
            mcategory: function (MemberService) {
              return MemberService.getMemberCategory();
            },
            mpackage: function (MemberService) {
              return MemberService.getMemberPackage();
            },
            community: function (MemberService) {
              return MemberService.getCommunity();
            },
            country: function (MemberService) {
              return MemberService.getCountry();
            }

          }
        });//stateProvider end
    }
  ).config(['modalStateProvider', function(modalStateProvider) {
  modalStateProvider
  .state('app.member.view', {
        url: '/:memberId',
        templateUrl: 'modules/member/views/view.popup.html',
        controller:'MemberCtrl',
            resolve: {
          member: function ($stateParams, MemberService) {
            return MemberService.getMember($stateParams.memberId);

          }
        }
    })
}]);
    function omit(object, forbidenKeys) {
      var prunedObject = {};
      for (var key in object)
        if (forbidenKeys.indexOf(key) === -1)
          prunedObject[key] = object[key];
      return prunedObject;
    }
})();
