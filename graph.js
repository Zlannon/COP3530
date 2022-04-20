import { Queue } from '@material-ui/icons';
import country from './country.js';

var numVertices; 
const runner = new country();
const adjList = new Map();
const countries = new Map();

class Graph {

        constructor() {

        }

         insertV(state) {
             let State = state.toLowerCase(); 
             adjList[State] = []; 
         }
              
         insert(inState, outState) {
            let InState = inState.toLowerCase();
            let OutState = outState.toLowerCase();
            adjList[InState].push(OutState);
        }
          
         depthFirstCountries(src) {
            var visited = {};
            var order = [];
            var s = [];
            src = src.toLowerCase(); 
            visited[src] = true; 
            s.push(src); 
            console.log(adjList[src].length)
            while (s.length !== 0) {
                var src = s.pop(); 
                order.push(src)
                console.log("src: " + src); 
                for (let i = 0; i < adjList[src].length; i++) {
                     if (!visited[adjList[src][i]]) {
                         visited[adjList[src][i]] = true;
                         s.push(adjList[src][i]);
                     }
                }
            }
            return order; 
         }
// actually breadth
         breadthFirstCountries(src) {
            var visited = {};
            var order = [];
            var q = [];
            src = src.toLowerCase(); 
            visited[src] = true; 
            q.push(src); 
            console.log(adjList[src].length)
            while (q.length !== 0) {
                var src = q.shift(); 
                order.push(src)
                console.log("src: " + src); 
                for (let i = 0; i < adjList[src].length; i++) {
                     if (!visited[adjList[src][i]]) {
                         visited[adjList[src][i]] = true;
                         q.push(adjList[src][i]);
                     }
                }
            }
            return order; 
         }
        
        /*
        breadthFirstCountries(src) {
            var visited = {};
            var s = [];
            src = src.toLowerCase(); 
            visited[src] = true; 
            s.push(src); 
            console.log(adjList[src].length)
            while (s.length !== 0) {
                var src = s.pop(); 
                console.log("src: " + src); 
                for (let i = 0; i < adjList[src].length; i++) {
                     if (!visited[adjList[src][i]]) {
                         visited[adjList[src][i]] = true;
                         s.push(adjList[src][i]);
                         //console.log(adjList[src][i])
                     }
                }
            }
            
         }
        
        
        */
        
        
         breadthFirstDisasters(src) {
        
            for (let i = 0; i < src.length(); i++)
                src[i] = src[i].toLowerCase();
        
            if (adjList.count(src) == 0)
                return;
        
            const hasVisit = new Map();
            var q = [];
            hasVisit[src] = true;
            q.push(src);
            while (!q.empty()) {
                src = q.front();
                countries[src].displayStats();
                q.pop();
                for (let i = 0; i < adjList[src].size(); i++) {
                    if (hasVisit.find(adjList[src][i].name) == hasVisit.end()) {
                        hasVisit[adjList[src][i].name] = true;
                        q.push(adjList[src][i].name);
                    }
                }
            }
        }

     depthFirstDisasters(src) {

        const hasVisit = new Map();
        var s = [];
        hasVisit[src] = true;
        s.push(src);
        while (!s.empty()) {
            src = s.top();
            countries[src].displayStats();
            s.pop();
            for (let i = 0; i < adjList[src].size(); i++) {
                if (hasVisit.find(adjList[src][i].name) == hasVisit.end()) {
                    hasVisit[adjList[src][i].name] = true;
                    s.push(adjList[src][i].name);
                }
            }
        }
    }



}

export default Graph; 