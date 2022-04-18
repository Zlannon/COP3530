#include "graph.h"

graph::graph() {

}

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


void graph::breadthFirstCountries(std::string src) {

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
        std::cout << src << " ";
        q.pop();
        for (int i = 0; i < adjList[src].size(); i++) {
            if (hasVisit.find(adjList[src][i].name) == hasVisit.end()) {
                hasVisit[adjList[src][i].name] = true;
                q.push(adjList[src][i].name);
            }
        }
    }
}


void graph::depthFirstCountries(std::string src) {

    std::map<std::string, bool> hasVisit;

    std::stack<std::string> s;
    hasVisit[src] = true;
    s.push(src);
    while (!s.empty()) {
        src = s.top();
        std::cout << src << " ";
        s.pop();
        for (int i = 0; i < adjList[src].size(); i++) {
            if (hasVisit.find(adjList[src][i].name) == hasVisit.end()) {
                hasVisit[adjList[src][i].name] = true;
                s.push(adjList[src][i].name);
            }
        }
    }
}

void graph::breadthFirstDisasters(std::string src) {

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


void graph::depthFirstDisasters(std::string src) {

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

void graph::displayXhighest(const int amount) {
    
    std::vector<disaster*> Xtypes(amount, new disaster());

    std::map<std::string, country>::iterator it;
    for (it = countries.begin(); it != countries.end(); it++) {
        for (int i = 0; i < it->second.disasters.size(); i++) {
            for (int j = 0; j < amount; j++) {
                if (it->second.disasters[i]->damage > Xtypes[j]->damage) {
                    for (int z = amount - 2; z >= j; z--) {
                        Xtypes[z + 1] = Xtypes[z];
                    }
                    Xtypes[j] = it->second.disasters[i];
                    break;
                }
            }
        }
    }

    for (int i = 0; i < Xtypes.size(); i++) {
        std::cout << "--------------------" << std::endl;
        std::cout << "State: " << Xtypes[i]->state << std::endl;
        std::cout << "Type: " << Xtypes[i]->type << std::endl;
        std::cout << "Time: " << Xtypes[i]->month << ", " << Xtypes[i]->year << std::endl;
        std::cout << "Damage: " << Xtypes[i]->damage << std::endl;
    }
}

void graph::displayXtypes(const int amount, std::string type) {

    std::vector<disaster*> Xtypes(amount, new disaster());

    std::map<std::string, country>::iterator it;
    for (it = countries.begin(); it != countries.end(); it++) {
        for (int i = 0; i < it->second.disasters.size(); i++) {
            for (int j = 0; j < amount; j++) {
                if (it->second.disasters[i]->type == type && it->second.disasters[i]->damage > Xtypes[j]->damage) {
                    for (int z = amount - 2; z >= j; z--) {
                        Xtypes[z + 1] = Xtypes[z];
                    }
                    Xtypes[j] = it->second.disasters[i];
                    break;
                }
            }
        }
    }

    for (int i = 0; i < Xtypes.size(); i++) {
        std::cout << "--------------------" << std::endl;
        std::cout << "State: " << Xtypes[i]->state << std::endl;
        std::cout << "Type: " << Xtypes[i]->type << std::endl;
        std::cout << "Time: " << Xtypes[i]->month << ", " << Xtypes[i]->year << std::endl;
        std::cout << "Damage: " << Xtypes[i]->damage << std::endl;
    }

}

void graph::display(std::string state) {
    countries[state].displayStats();
}
