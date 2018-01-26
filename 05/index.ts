import {Q, getInput} from './util';

class State {
    status = Q.none;
    
    repeat = 0;
    vowels = 0;
}

// OR
const naughty = {
    a: 'b',
    c: 'd',
    p: 'q',
    x: 'y',
};
const vowels = /[aeiou]/i;


function checkStr(str: string){
    let state = new State();
    for (var i = 0; i < str.length; i++){
        let char = str.charAt(i);
        let next = str.charAt(i + 1);
        
        if (char == next){
            state.repeat++;
        }
        
        if (vowels.test(char)){
            state.vowels++;
        }
        
        let naughtyChar = naughty[char];
        if (naughtyChar && naughtyChar == next){
            state.status = Q.naughty;
            break;
        }
    }
    
    let result = Q.naughty;
    if (state.status == Q.none){
        result = (state.repeat > 0 && state.vowels >= 3) ? Q.nice : Q.naughty;
    }
    
    // console.log('state=', state);
    
    return result;
}


const inputs = getInput();
let niceCount = inputs.map(checkStr)
    .filter(x => x == Q.nice)
    .length;
console.log(`niceCount= ${niceCount}`)
