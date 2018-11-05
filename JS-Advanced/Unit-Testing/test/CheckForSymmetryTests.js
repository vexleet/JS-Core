let expect = require("chai").expect;
let isSymmetric = require("../CheckForSymmetry-05").isSymmetric;

describe("isSymmetric(arr) - array is symmetric", function () {
   it("should return true of [1,2,3,3,2,1]", function () {
      let actualResult =  isSymmetric([1,2,3,3,2,1]);

      expect(actualResult).to.be.true;
   });

   it("should return false of [1,2,3,4,2,1]", function () {
       let actualResult =  isSymmetric([1,2,3,4,2,1]);

       expect(actualResult).to.be.false;
   });

   it("should return true of [-1,2,-1]", function () {
       let actualResult =  isSymmetric([-1,2,-1]);

       expect(actualResult).to.be.true;
   });

    it("should return false of [-1,2,1]", function () {
        let actualResult =  isSymmetric([-1,2,1]);

        expect(actualResult).to.be.false;
    });

    it("should return false of [1,2]", function () {
        let actualResult =  isSymmetric([1,2]);

        expect(actualResult).to.be.false;
    });

    it("should return true of [1]", function () {
       let actualResult = isSymmetric([1]);

       expect(actualResult).to.be.true;
    });

    it("should return true of [5,'hi',{a:5},new Date(),{a:5},'hi',5]", function () {
        let actualResult = isSymmetric([5,'hi',{a:5},new Date(),{a:5},'hi',5]);

        expect(actualResult).to.be.true;
    });

    it("should return false of [5,'hi',{a:5},new Date(),{X:5},'hi',5]", function () {
        let actualResult = isSymmetric([5,'hi',{a:5},new Date(),{X:5},'hi',5]);

        expect(actualResult).to.be.false;
    });

    it("should return false of 1,2,2,1", function () {
       let actualResult = isSymmetric(1, 2, 2, 1);

       expect(actualResult).to.be.false;
    });
});