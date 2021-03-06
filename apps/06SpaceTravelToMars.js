'use strict';
//require assert
var assert = require('assert');

var jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};

// Your code here

//CrewMember Class that creates a Crewmember and assigns properties about
//Crewmember like name, job, skill & ship
class CrewMember {
  constructor(name,job, specialSkill) {
    this.name = name;
    this.job = job;
    this.specialSkill = specialSkill;
    this.ship = null;  ///assigned ship such as MAV, 'Main Ship',
  }
  // enterShip method.
  // pushes crew member into an arry if the Crewmember is assigned a ship
  // example passed value is 'mav' type of ship (example: var mav = new ship('MAV');
  enterShip(shipchoice) {
    // "this.ship" is assigned the value shipchoice (ex. mav)
    //example:   var mav = new ship('MAV');
    this.ship = shipchoice;
    //Now, this.ship for all purposes is the var 'mav'.  We now get to access
    // the properties of the class object 'mav'.   (ex. this.ship.crew.push() )
    //Next, we are placing the entire value of "this" as it relates to CrewMember
    // (example: var rick = new Crewmember) into the "crew" array of Ship.
    this.ship.crew.push(this); // REMEMBER:  this line is like writing, mav.crew.push();
  }
}


//create a Class for Ships.  Assign properties about name, type, ability
//and add crewmembers
class Ship {
  constructor(name, type, ability) {
    this.name = name;
    this.type = type;
    this.ability = ability;
    this.crew = [];
  }
  missionStatement(){
    //console.log(myship)
    for (var i=0; i< this.crew.length; i++){
      var individualcrewmember = this.crew[i];
      var jobofthecrewmember = individualcrewmember.job;
      var shiptypethatthiscrewmembercanfly = jobTypes[jobofthecrewmember];
      if(this.type===shiptypethatthiscrewmembercanfly){
        console.log(this.ability);
        return this.ability
      } //end of if
    } //end of for loop
    return "Can't perform a mission yet.";
  } //end of missionStatement
} //end of class

var rick = new CrewMember('Rick Martinez', 'pilot', 'chemistry'); //create a CrewMember named 'rick'
var mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit'); //create a ship named 'mav'

// TESTS FOR DEBUGGING 
//rick.enterShip(mav);
//console.log(rick);
//console.log(mav);
//mav.missionStatement();
//console.log('######');
//console.log(mav); //must use it like a function not a method!


//tests
if (typeof describe === 'function'){
  describe('CrewMember', function(){
    it('should have a name, a job, a specialSkill and ship upon instantiation', function(){
      var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.specialSkill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    it('can enter a ship', function(){
      var mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });
  });

  describe('Ship', function(){
    it('should have a name, a type, an ability and an empty crew upon instantiation', function(){
      var mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      assert.equal(mav.name, 'Mars Ascent Vehicle');
      assert.equal(mav.type, 'MAV');
      assert.equal(mav.ability, 'Ascend into low orbit');
      assert.equal(mav.crew.length, 0);
    });

    it('can return a mission statement correctly', function(){
      var mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      var hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      var crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");

      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
    });
  });
}
