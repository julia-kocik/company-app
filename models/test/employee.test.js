const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

    it('should throw an error if no "firstName, lastName, department" arg', () => {
        const emp = new Employee({}); // create new Employee, but don't set `name` attr value
      
        emp.validate(err => {
          expect(err.errors.firstName).to.exist;
          expect(err.errors.lastName).to.exist;
          expect(err.errors.department).to.exist;
        });
    });

    it('should throw an error if "firstName, lastName, department" is not a string', () => {

        const cases = [{}, []];
        for(let name of cases) {
          const emp = new Employee({ name });
      
          emp.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
          });
        }
      
    });

    it('should throw an error if "firstName, lastName, department" is too short or too long', () => {

        const cases = ['Abc', 'abcd', 'Lorem Ipsum, Lorem Ip']; // we test various cases, some of them are too short, some of them are too long
        for(let name of cases) {
          const emp = new Employee({ name });
      
          emp.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
          });
      
        }
      
    });

    it('should return correct value if correct name has been provided', () => {

        const cases = ['Abcde', 'abcdef', 'Lorem Ipsum']; 
        for(let name of cases) {
          const emp = new Employee({ name });
      
          emp.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
          });
        }  
    });

    after(() => {
        mongoose.models = {};
    });
  
  });