#include "graph.h"

void graph::insert(std::string inCountry, std::string outCountry) {
    for (int i = 0; i < inCountry.length(); i++)
        inCountry[i] = std::tolower(inCountry[i]);
    for (int i = 0; i < outCountry.length(); i++)
        outCountry[i] = std::tolower(outCountry[i]);
    if (countries.find(outCountry) != countries.end()) {
        adjList[inCountry].push_back(countries[outCountry]);
    } else {
        countries[outCountry] = country(outCountry);
        adjList[inCountry].push_back(countries[outCountry]);
    }
}

void graph::insert(std::string inCountry) {
    for (int i = 0; i < inCountry.length(); i++)
        inCountry[i] = std::tolower(inCountry[i]);
    if (countries.find(inCountry) == countries.end()) {
        countries[inCountry] = country(inCountry);
    }
    adjList[inCountry];
}


void graph::breadthFirst(std::string src) {

    for (int i = 0; i < src.length(); i++)
        src[i] = std::tolower(src[i]);

    if (adjList.count(src) == 0)
        return;

    std::map<std::string, bool> hasVisit;
    std::queue<std::string> q;
    hasVisit[src] = true;
    q.push(src);
    while (!q.empty()) {
        src = q.front();
        countries[src].displayStats();
        q.pop();
        for (int i = 0; i < adjList[src].size(); i++) {
            if (hasVisit.find(adjList[src][i].name) == hasVisit.end()) {
                hasVisit[adjList[src][i].name] = true;
                q.push(adjList[src][i].name);
            }
        }
    }
}


void graph::depthFirst(std::string src) {

    std::map<std::string, bool> hasVisit;

    std::stack<std::string> s;
    hasVisit[src] = true;
    s.push(src);
    while (!s.empty()) {
        src = s.top();
        countries[src].displayStats();
        s.pop();
        for (int i = 0; i < adjList[src].size(); i++) {
            if (hasVisit.find(adjList[src][i].name) == hasVisit.end()) {
                hasVisit[adjList[src][i].name] = true;
                s.push(adjList[src][i].name);
            }
        }
    }
}
