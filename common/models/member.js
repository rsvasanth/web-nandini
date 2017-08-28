'use strict';

module.exports = function(Member) {
  var re = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

  Member.validatesInclusionOf('gender', {in: ['male', 'female']});
  Member.validatesNumericalityOf('phone', {int: true});
  Member.validatesUniquenessOf('accountnumber', {message: 'Account is not unique'});
  Member.validatesFormatOf('fullname', {with: re, message: 'Must provide a valid Name'});
  Member.validatesFormatOf('partner', {with: re, message: 'Must provide a valid Name'});
  Member.beforeRemote('upsert', function(ctx, created, next) {
    ctx.args.data.created = Date.now();
    console.log(ctx.methodString, 'was invoked remotely'); // customers.prototype.save was invoked remotely
    next();
  });


};
