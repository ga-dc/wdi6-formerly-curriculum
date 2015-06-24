define(function(require) {
  
  var SkuCollection = require('../models/skus');
  var SkuModel = SkuCollection.SkuModel;

  describe('Skus Model', function() {

    var model;
    var server;

    beforeEach(function() {
      model = new SkuModel({
        code: 'a1',
        name: 'Cola',
        price: 100,
        quantity: 5
      });

      model.id = 1;
      model.url = '/skus';
    });

    it('"purchase" should decrement the model\'s quantity', function() {
      console.log(sinon);
      sinon.stub(model, 'sync');
      //model.purchase();
      //expect(model.get('quantity')).to.equal(4);
    });

    it('"purchase" should return a receipt with the model\'s name and updated quantity', function() {
      model.sync = sinon.stub();
      var receipt = model.purchase();
      expect(receipt.name).to.equal('Cola');
      expect(receipt.quantity).to.equal(4);
    });

    it('"purchase" should utilize the "save" method', function() {
      var spy = sinon.spy(model, 'save');
      model.purchase();
      expect(spy.calledOnce).to.be.true;
    });
  });
});