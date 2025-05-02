function tsp_ls(distance_matrix) {
    var shortPath = Infinity;               // any path will be shorter
    var n = distance_matrix.length;
    if (n == 0 || n == 1) {return 0;}       // if zero or one elements, no path, return 0
    var pathArr = [];
    for (var i = 0; i < n; i++) {           // initialize array of indices (represents path)
        pathArr.push(i);
    }
    pathArr = randomPath(pathArr);          // randomize array 

    const itNum = n**3;                     // number of nodes cubed is how many iterations will be tried

    
    var prevI = null;
    var prevK = null;
    var i = null; 
    var k = null;

    for (var v = 0; v < itNum; v++) {  
        i = Math.floor(Math.random() * (n-1));
        k = Math.floor(Math.random() * (n-i-1)) + i+1;
        while (i == prevI && k == prevK) {
            i = Math.floor(Math.random() * (n-1));                  // number between 1 and n-2 (not upper inclusive)
            k = Math.floor(Math.random() * (n-i-1)) + i+1;          // random number 1 and n-1
        }

        prevI = i;
        prevK = k;
        swap(pathArr,i,k);                                         // make the swap from i to k
        var newLength = calcLength(pathArr,distance_matrix);       // find length of that path
        if (newLength < shortPath) {                               // if new length shorter
            shortPath = newLength;                                 // make saved path length
        }
    }

    return shortPath;
}

function randomPath(pathArr) {
    for (var i = 0; i < pathArr.length-2; i++) {
        var j = Math.floor(Math.random() * (pathArr.length));
        var tmp;
        tmp = pathArr[i];
        pathArr[i] = pathArr[j];
        pathArr[j] = tmp;
    }
    return pathArr;
}

function swap(path,i,k) {
    var itNum = Math.ceil((k-i+1)/2);
    for (var v = 0; v < itNum; v++) {
        var tmp = path[i+v];
        path[i+v] = path[k-v];
        path[k-v] = tmp;
    }
}

function calcLength(path, graph) {
    var lenSum = 0;
    for (var i = 0; i < (graph.length - 1); i++) {
        lenSum += graph[path[i]][path[i+1]];
    }
    return lenSum;
}
