//import retrieve from "../../api/managed-records";
const retrieve = require('../../api/managed-records.js');
import fetch from '../../util/fetch-fill';
import URI from 'urijs';

describe("Records", function() {

  it('should return unfiltered results', function(done){
    var expected = {"previousPage":null,"nextPage":2,"ids":[1,2,3,4,5,6,7,8,9,10],"open":[{"id":2,"color":"yellow","disposition":"open","isPrimary":true},{"id":4,"color":"brown","disposition":"open","isPrimary":false},{"id":6,"color":"blue","disposition":"open","isPrimary":true},{"id":8,"color":"green","disposition":"open","isPrimary":false},{"id":10,"color":"red","disposition":"open","isPrimary":true}],"closedPrimaryCount":1};
    retrieve().then(function(output){
      expect(output).toEqual(expected);
    }).then(done);
  });

  describe('should return results for', function(){
    it('first page', function(done){
      var expected = {"previousPage":null,"nextPage":2,"ids":[1,2,3,4,5,6,7,8,9,10],"open":[{"id":2,"color":"yellow","disposition":"open","isPrimary":true},{"id":4,"color":"brown","disposition":"open","isPrimary":false},{"id":6,"color":"blue","disposition":"open","isPrimary":true},{"id":8,"color":"green","disposition":"open","isPrimary":false},{"id":10,"color":"red","disposition":"open","isPrimary":true}],"closedPrimaryCount":1};
      retrieve({page: 1}).then(function(output){
        expect(output).toEqual(expected);
      }).then(done);
    });
    it('third page', function(done){
      var expected = {"previousPage":2,"nextPage":4,"ids":[21,22,23,24,25,26,27,28,29,30],"open":[{"id":23,"color":"red","disposition":"open","isPrimary":true},{"id":24,"color":"red","disposition":"open","isPrimary":true},{"id":25,"color":"red","disposition":"open","isPrimary":true},{"id":28,"color":"blue","disposition":"open","isPrimary":true}],"closedPrimaryCount":3};
      retrieve({page: 3}).then(function(output){
        expect(output).toEqual(expected);
      }).then(done);
    });
    it('twelth page with colors', function(done){
      var expected = {"previousPage":11,"nextPage":13,"ids":[213, 214, 215, 222, 224, 227, 228, 230, 232, 235],"open":[{id: 213, color: 'blue', disposition: 'open', isPrimary: true},{id: 215, color: 'red', disposition: 'open', isPrimary: true},{id: 227, color: 'red', disposition: 'open', isPrimary: true},{id: 228, color: 'blue', disposition: 'open', isPrimary: true},{id: 232, color: 'blue', disposition: 'open', isPrimary: true},{id: 235, color: 'brown', disposition: 'open', isPrimary: false}],"closedPrimaryCount":4};
      retrieve({page: 12, colors: ["red", "blue", "brown"]}).then(function(output){
        expect(output).toEqual(expected);
      }).then(done);
    });
    it('thirtieth page', function(done){
      var expected = {"previousPage":29,"nextPage":31,"ids":[333,334,338,339,340,341,342,343,344,345],"open":[{id: 334, color: 'green', disposition: 'open', isPrimary: false},{id: 339, color: 'green', disposition: 'open', isPrimary: false},{id: 340, color: 'red', disposition: 'open', isPrimary: true},{id: 341, color: 'yellow', disposition: 'open', isPrimary: true},{id: 343, color: 'red', disposition: 'open', isPrimary: true},{id: 344, color: 'brown', disposition: 'open', isPrimary: false},{id: 345, color: 'blue', disposition: 'open', isPrimary: true}],"closedPrimaryCount":1};
      retrieve({page: 30}).then(function(output){
        expect(output).toEqual(expected);
      }).then(done);
    });
    it('last page', function(done){
      var expected = {"previousPage":44,"nextPage":null,"ids":[495,496,497,498,499,500],"open":[{"id":495,"color":"red","disposition":"open","isPrimary":true}],"closedPrimaryCount":5};
      retrieve({page: 45}).then(function(output){
        expect(output).toEqual(expected);
      }).then(done);
    });
  });

  it('should return an empty set of results for pages after the last page', function(done){
    var expected = {"previousPage":45,"nextPage":null,"ids":[],"open":[],"closedPrimaryCount":0};
    retrieve({page: 46}).then(function(output){
      expect(output).toEqual(expected);
    }).then(done);
  });

  it('should return results filtered by multiple colors', function(done){
    var expected = {"previousPage":null,"nextPage":2,"ids":[5,6,10,11,15,16,17,22,23,24],"open":[{"id":6,"color":"blue","disposition":"open","isPrimary":true},{"id":10,"color":"red","disposition":"open","isPrimary":true},{"id":23,"color":"red","disposition":"open","isPrimary":true},{"id":24,"color":"red","disposition":"open","isPrimary":true}],"closedPrimaryCount":6};
    retrieve({page: 1, colors: ['red', 'blue']}).then(function(output){
      expect(output).toEqual(expected);
    }).then(done);
  });

  it('should return results filtered by a single color', function (done) {
    var expected = {"previousPage":null,"nextPage":2,"ids":[1,3,4,9,20,27,29,41,42,55],"open":[{"id":4,"color":"brown","disposition":"open","isPrimary":false},{"id":41,"color":"brown","disposition":"open","isPrimary":false},{"id":55,"color":"brown","disposition":"open","isPrimary":false}],"closedPrimaryCount":0};
    retrieve({colors: ["brown"]}).then(function(output){
      expect(output).toEqual(expected);
    }).then(done);
  });

  it('should return empty results', function(done){
    var expected = {"previousPage":null,"nextPage":null,"ids":[],"open":[],"closedPrimaryCount":0};
    retrieve({colors: ["hotpink"]}).then(function(output){
      expect(output).toEqual(expected);
    }).then(done);
  });

  it('should recover on fetch error', function(done){
    var furl = "http://localhost:3000/recordszzz";
    spyOn(console, "error").and.callFake(function(){});

    function check(output) {
      //let url = "http://localhost:3000/records";
      expect(console.log).toHaveBeenCalled();
      console.log.calls.reset();
      retrieve().then(function(output){
        var expected = {"previousPage":null,"nextPage":2,"ids":[1,2,3,4,5,6,7,8,9,10],"open":[{"id":2,"color":"yellow","disposition":"open","isPrimary":true},{"id":4,"color":"brown","disposition":"open","isPrimary":false},{"id":6,"color":"blue","disposition":"open","isPrimary":true},{"id":8,"color":"green","disposition":"open","isPrimary":false},{"id":10,"color":"red","disposition":"open","isPrimary":true}],"closedPrimaryCount":1};
        expect(output).toEqual(expected);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });
    }

    retrieve({url:furl}).then(check);
  });

});
