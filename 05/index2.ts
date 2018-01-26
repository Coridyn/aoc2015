import {Q, getInput} from './util';

/*
https://adventofcode.com/2015/day/5

Scan through and build up a set of pairs

(char, index), (char, index)

Criteria:
 - non-overlapping pair (i.e. index between the two pairs must be 2 or more)
 - letter that repeats with exactly one letter between - use regular scanning for this

*/

class Pair {
    id = '';
    index = -1;
    count = 0;
}


class State {
    status = Q.none;
    
    // Char that repeats with exactly one other char in between
    repeat = 0;
    
    // non-overlapping pair (anywhere in the string)
    pair = 0;
}

/*
triplets...
qj hvhtzxzqqjkmpb
q jh vhtzxzqqjkmpb
qj hv htzxzqqjkmpb
*/
function checkStr(str: string){
    let pairMap: {[pair: string]: Pair} = {};
    
    let state = new State();
    
    let j = 0;
    for (var i = 0; i < str.length; i++){
        // Grrr, needs to be non-overlapping
        let pairChars = str.substr(i, 2);
        if (pairMap[pairChars]){
            // Check index before updating count
            let pair = pairMap[pairChars];
            let diff = i - pair.index;
            if (diff >= 2){
                pair.count++;
            }
        } else {
            let pair = new Pair();
            pair.id = pairChars;
            pair.index = i;
            pairMap[pairChars] = pair;
        }
        
        
        let char = str.charAt(i);
        let nextRepeat = str.charAt(i + 2);
        if (char == nextRepeat){
            state.repeat++;
        }
    }
    
    
    // Reduce down the count of pairs in the string
    let pairCount = 0;
    for (let p in pairMap){
        let pair = pairMap[p];
        pairCount += pair.count;
    }
    state.pair = pairCount;
    
    
    // Get final result of the string
    let result = Q.naughty;
    if (state.status == Q.none){
        result = (state.repeat > 0 && state.pair > 0) ? Q.nice : Q.naughty;
    }
    
    // console.log('state=', state);
    
    return result;
}


const inputs = getInput()
    // For dev, trim down to a single string
    // .slice(0, 1)
    // .map(x => 'qjhvhtzxzqqjkmpb');
let niceCount = inputs.map(checkStr)
    .filter(x => x == Q.nice)
    .length;
console.log(`niceCount= ${niceCount}`)
