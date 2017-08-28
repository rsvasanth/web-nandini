(function () {
  'use strict';
  angular
    .module('com.module.member')
    .service('MemberService', function (CoreService, Member,Country,Membercategory,Package,Community, gettextCatalog) {

this.getMemberPackage = function () {
  return Package.find({}).$promise;
};



      this.getCommunity = function () {
        return Community.find({}).$promise;
      };
      this.getCommunityName = function (id) {
        return Community.findById({
          id: id
        }).$promise;
      };

      this.getMemberCategory = function () {
        return Membercategory.find({}).$promise;
      };

      this.getCountry = function () {
        return Country.find({

        }).$promise;
      };

      this.getMembers = function () {
        return Member.find({

        }).$promise;
      };

      this.getMember = function (id) {
        return Member.findById({
          id: id
        }).$promise;
      };

      this.upsertMember = function (member) {
        return Member.upsert(member).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Member saved'),
              gettextCatalog.getString('Your Member is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving Member '),
              gettextCatalog.getString('This Member could no be saved: ') + err
            );
          }
        );
      };

      this.deleteMember = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Member.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Member deleted'),
                gettextCatalog.getString('Your Member is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting Member'),
                gettextCatalog.getString('Your Member is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };
      this.getFormFields = function (mcategory,mpackage,community,country) {



        var mcatOptions = mcategory.map(function (mcategory) {
          return {
            name: mcategory.name,
            value: mcategory.id
          };
        });

                var mpack = mpackage.map(function (mpackage) {
                  return {
                    name: mpackage.name,
                    value: mpackage.id
                  };
                });
        var comm = community.map(function (community) {
          return {
            name: community.name,
            value: community.name
          };
        });
        var Co = country.map(function (country) {
          return {
            name: country.name,
            value: country.name
          };
        });
        return [
          {
            key: 'fullname',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Name'),
              required: true
            }
          },
          {
            key: 'categoryId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Member Category'),
              required: true,
              placeholder:'categories',
              options: mcatOptions
            }
          },
          {
            key: 'package',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Select Package'),
              required: true,
              placeholder:'Enter Package Name',
              options:mpack

            },

            expressionProperties:{

            },
            		"hideExpression": '!model.categoryId'
          },
          {
					key: 'partner',
					type: 'input',
					templateOptions: {
						label: 'Partner',
						placeholder: 'Enter Partner name'
					},
					"hideExpression": 'model.package != "59a06cbd3a144e7c243eda93"'
				},
        {
            key: 'contribution',
            type: 'input',
            templateOptions: {
              required: true,
              label: gettextCatalog.getString('Contribution')
            }
        },
          {
            key: 'accountnumber',
            type: 'input',
            templateOptions: {
                  required: true,
              label: gettextCatalog.getString('Account Number')
            }
          },
          {
            key: 'community',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Community'),
              options:comm
            }
          },
          {
            key: 'phone',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Phone')
            }
          },  {
              key: 'gender',
              type: 'select',
              templateOptions: {

                label: gettextCatalog.getString('Gender'),
                options:[{name:'male',value:'male'},{name:'female',value:'female'}]
              }
            },

            {
                key: 'status',
                type: 'input',
                templateOptions: {
                  required: true,
                  label: gettextCatalog.getString('Auroville Status')
                }
            },
            {
                key: 'nationality',
                type: 'select',
                templateOptions: {
                  required: true,
                  label: gettextCatalog.getString('Nationality'),
                  options:Co
                }
            },
            {
                key: 'birthday',
                type: 'datepicker',
                templateOptions: {
                  required: true,
                  label: gettextCatalog.getString('Date Of Birth')
                }
            }
        ];
      };



    });

})();
