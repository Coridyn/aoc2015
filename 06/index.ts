import * as util from './util';

let a = {};
function start(id: string){
    a[id] = a[id] || ({
        start: 0,
        time: 0,
    });
    
    a[id].start = Date.now();
}
function end(id: string){
    let end = Date.now();
    let time = end - a[id].start;
    a[id].time += time;
}


// represents 2d array
// mod and stuff
class Grid {
    w = 1000;
    h = 1000;
    items: number[] = [];
}

function process(grid, lines: string[]){
    start('process');
    lines.forEach(l => processLine(l, grid));
    end('process');
}

function processLine(line: string, grid: Grid){
    start('parseLine');
    let task = util.parseLine(line);
    end('parseLine');
    
    start('iterate');
    for (let x = task.x1, lenX = task.x2; x <= lenX; x++){
        for (let y = task.y1, lenY = task.y2; y <= lenY; y++){
            
            let index = y * grid.w + x;
            if (task.action == util.Action.toggle){
                // +426
                // multiply by -1
                grid.items[index] = (grid.items[index] || -1) * -1;
            } else {
                // 336 process, 321 iterate
                // set the value directly.
                grid.items[index] = task.action;
            }
            
        }
    }
    end('iterate');
}

let input = util.getInput();
let grid = new Grid();

console.time('process');
process(grid, input);
console.timeEnd('process');

// count lights on
console.time('count');
let count = grid.items.filter(x => x == util.Action.on).length
console.timeEnd('count');
console.log('on=', count);

console.log(JSON.stringify(a, null, 2));
