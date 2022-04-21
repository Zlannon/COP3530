#include "graph.h"

//default constructor
graph::graph() {

}

//insert method for states with edges
void graph::insert(std::string instate, std::string outstate) {
    for (int i = 0; i < instate.length(); i++)
        instate[i] = std::tolower(instate[i]);
    for (int i = 0; i < outstate.length(); i++)
        outstate[i] = std::tolower(outstate[i]);
    if (countries.find(outstate) != countries.end()) {
        adjList[instate].push_back(countries[outstate]);
    } else {
        countries[outstate] = state(outstate);
        adjList[instate].push_back(countries[outstate]);
    }
}

//insert method for states with no edges ie alaska, hawaii
void graph::insert(std::string instate) {
    for (int i = 0; i < instate.length(); i++)
        instate[i] = std::tolower(instate[i]);
    if (countries.find(instate) == countries.end()) {
        countries[instate] = state(instate);
    }
    adjList[instate];
}

//breadth first search starting at src state
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

//depth first search starting at src state
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

//display X amount highest damage disasters
void graph::displayXhighest(const int amount) {
    
    std::vector<disaster*> Xtypes(amount, new disaster());

    //iterate through all disasters
    std::map<std::string, state>::iterator it;
    for (it = countries.begin(); it != countries.end(); it++) {
        for (int i = 0; i < it->second.disasters.size(); i++) {
            for (int j = 0; j < amount; j++) {
                //find correct spot
                if (it->second.disasters[i]->damage > Xtypes[j]->damage) {
                    //move current values down 1
                    for (int z = amount - 2; z >= j; z--) {
                        Xtypes[z + 1] = Xtypes[z];
                    }
                    //insert disaster in correct spot
                    Xtypes[j] = it->second.disasters[i];
                    break;
                }
            }
        }
    }

    //display disasters
    for (int i = 0; i < Xtypes.size(); i++) {
        std::cout << "--------------------" << std::endl;
        std::cout << "State: " << Xtypes[i]->state << std::endl;
        std::cout << "Type: " << Xtypes[i]->type << std::endl;
        std::cout << "Time: " << Xtypes[i]->month << ", " << Xtypes[i]->year << std::endl;
        std::cout << "Damage: " << Xtypes[i]->damage << std::endl;
    }
}

//display X amount highest damage disasters of specified type
void graph::displayXtypes(const int amount, std::string type) {

    if (type == "") {
        displayXhighest(amount);
        return;
    }

    //store disasters
    std::vector<disaster*> Xtypes(amount, new disaster());

    std::map<std::string, state>::iterator it;
    //iterate through all disasters
    for (it = countries.begin(); it != countries.end(); it++) {
        for (int i = 0; i < it->second.disasters.size(); i++) {
            for (int j = 0; j < amount; j++) {
                if (it->second.disasters[i]->type == type && it->second.disasters[i]->damage > Xtypes[j]->damage) {
                    //insert new disaster in correct spot
                    for (int z = amount - 2; z >= j; z--) {
                        Xtypes[z + 1] = Xtypes[z];
                    }
                    Xtypes[j] = it->second.disasters[i];
                    break;
                }
            }
        }
    }

    //display all disasters
    for (int i = 0; i < Xtypes.size(); i++) {
        std::cout << "--------------------" << std::endl;
        std::cout << "State: " << Xtypes[i]->state << std::endl;
        std::cout << "Type: " << Xtypes[i]->type << std::endl;
        std::cout << "Time: " << Xtypes[i]->month << ", " << Xtypes[i]->year << std::endl;
        std::cout << "Damage: " << Xtypes[i]->damage << std::endl;
    }
}

//filter function
void graph::displayLocation(int year, std::string type, std::string State) {

    std::vector<disaster*> Xtypes;

    if (State != "") {
        if (type != "" && year != 0) {
            for (int i = 0; i < countries[State].disasters.size(); i++) {
                if (countries[State].disasters[i]->type == type && countries[State].disasters[i]->year == year) {
                    Xtypes.push_back(countries[State].disasters[i]);
                }
            }
        }
        else if (type != "") {
            for (int i = 0; i < countries[State].disasters.size(); i++) {
                if (countries[State].disasters[i]->type == type) {
                    Xtypes.push_back(countries[State].disasters[i]);
                }
            }
        }
        else if (year != 0) {
            for (int i = 0; i < countries[State].disasters.size(); i++) {
                if (countries[State].disasters[i]->year == year) {
                    Xtypes.push_back(countries[State].disasters[i]);
                }
            }
        }
        else {
            for (int i = 0; i < countries[State].disasters.size(); i++) {
                Xtypes.push_back(countries[State].disasters[i]);
            }
        }
    }
    else if (type != "") {
        if (year != 0) {
            std::map<std::string, state>::iterator it;
            for (it = countries.begin(); it != countries.end(); it++) {
                for (int i = 0; i < it->second.disasters.size(); i++) {
                    if (it->second.disasters[i]->type == type && it->second.disasters[i]->year == year) {
                        Xtypes.push_back(it->second.disasters[i]);
                    }
                }
            }
        }
        else {
            std::map<std::string, state>::iterator it;
            for (it = countries.begin(); it != countries.end(); it++) {
                for (int i = 0; i < it->second.disasters.size(); i++) {
                    if (it->second.disasters[i]->type == type) {
                        Xtypes.push_back(it->second.disasters[i]);
                    }
                }
            }
        }
    }
    else if (year != 0) {
        std::map<std::string, state>::iterator it;
        for (it = countries.begin(); it != countries.end(); it++) {
            for (int i = 0; i < it->second.disasters.size(); i++) {
                if (it->second.disasters[i]->year == year) {
                    Xtypes.push_back(it->second.disasters[i]);
                }
            }
        }
    }
    else {
        std::map<std::string, state>::iterator it;
        for (it = countries.begin(); it != countries.end(); it++) {
            for (int i = 0; i < it->second.disasters.size(); i++) {
                Xtypes.push_back(it->second.disasters[i]);
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

//display a single state's disasters
void graph::display(std::string state) {
    countries[state].displayStats();
}