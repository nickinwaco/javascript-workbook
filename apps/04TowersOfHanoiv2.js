'use strict';

var assert = require('assert');
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var stacks = {
    a: [4,3,2,1],
    b: [],
    c: []
};

function printStacks() {
    console.log("a: " + stacks.a);
    console.log("b: " + stacks.b);
    console.log("c: " + stacks.c);
}

function movePiece(startStack, endStack) {
    // Your code here


    //check for legal move first.  if not return false then pop/push
    var answer = isLegal(startStack, endStack);

      if (answer != false) {
        var token = stacks[startStack].pop();
        stacks[endStack].push(token);
        checkForWin();

        // all other rules fail
    } else {
        console.log("Sorry buster, not allowed! Rules are that startStack < EndStack & can't be empty ")
        return false;
    }
}

function isLegal(startStack, endStack, sameVal) {
    // Your code here
    var value1 = stacks[startStack].length - 1;
    var value2 = stacks[endStack].length - 1;

// evaluate if startStack is empty
    if (value1 === -1) {
        console.log("You can't move an empty stack")
        return false;
    }  // evaluate whether or not the Enstack is same
        else if (startStack === endStack) {
            console.log("\n Sorry same tower is not allowed")
            return false;
        }
        // endstack is empty
        else if (value2 === -1) {
            return true;

            //Assuming endStack is not empty but passes rules
        } else if (stacks[startStack][value1] < stacks[endStack][value2]) {
            //  console.log('true')
            return true;

            //does not pass rules and returns false to MovePiece function
        } else {
            //    console.log('fail')
            return false;
        }


}

function checkForWin() {
    // Your code here
    //checks if another stack is a winner
    if (stacks.b.length === 4 || stacks.c.length === 4) {

        console.log("YOU WIN, Woohoo!!!")

        //reset the game
        stacks = {
            a: [4, 3, 2, 1],
            b: [],
            c: []
        }; return true;

    } else {
        //console.log("not a winner")
        return false;
    }

}

function towersOfHanoi(startStack, endStack) {
    // Your code here
    //  isLegal(startStack, endStack);

    // startStack = startStack.toLowerCase;
    // endStack = endStack.toLowerCase;

    movePiece(startStack, endStack);
}

function getPrompt() {
    printStacks();
    rl.question('start stack: ', (startStack) => {
        rl.question('end stack: ', (endStack) => {
            towersOfHanoi(startStack, endStack);
            getPrompt();
        });
    });
}

// Tests

if (typeof describe === 'function') {

    describe('#towersOfHanoi()', function() {
        it('should be able to move a block', function() {
            towersOfHanoi('a', 'b');
            assert.deepEqual(stacks, {
                a: [4, 3, 2],
                b: [1],
                c: []
            });
        });
    });

    describe('#isLegal()', function() {
        it('should not allow an illegal move', function() {
            stacks = {
                a: [4, 3, 2],
                b: [1],
                c: []
            };
            assert.equal(isLegal('a', 'b'), false);
        });
        it('should allow a legal move', function() {
            stacks = {
                a: [4, 3, 2, 1],
                b: [],
                c: []
            };
            assert.equal(isLegal('a', 'c'), true);
        });
    });
    describe('#checkForWin()', function() {
        it('should detect a win', function() {
            stacks = {
                a: [],
                b: [4, 3, 2, 1],
                c: []
            };
            assert.equal(checkForWin(), true);
            stacks = {
                a: [1],
                b: [4, 3, 2],
                c: []
            };
            assert.equal(checkForWin(), false);
        });
    });
} else {

    getPrompt();

}
