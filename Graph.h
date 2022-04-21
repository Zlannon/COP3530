#pragma once
#include <iostream>
#include <sstream>
#include <string>
#include <vector>
#include <queue>
#include <map>
#include <stack>
#include <regex>
#include <cmath>
#include <algorithm>

#include "State.h"
#include "disaster.h"

// class declaration 
class graph {
	int numVertices;
	state runner;
	std::map<std::string, std::vector<state>> adjList;
	std::map<std::string, state> countries;
public:

	graph();
	void insert(std::string instate, std::string outstate);
	void insert(std::string instate);
	void breadthFirstCountries(std::string src);
	void depthFirstCountries(std::string src);
	void breadthFirstDisasters(std::string src);
	void depthFirstDisasters(std::string src);
	void displayXhighest(int amount);
	void displayXtypes(int amount, std::string type);
	void displayLocation(int Year, std::string type, std::string state);
	void display(std::string s);
};