'use strict';

const Main = require('./Main.js');

module.exports = class Derived extends Main {
    constructor(firstName, lastName, age) {
        super (firstName, lastName)
        this.age = age;
       
    }

    display() {
        console.log(this.firstName + " " + this.lastName + " " + this.age);
    }
}