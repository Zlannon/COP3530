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

#include "Country.h"
#include "disaster.h"

// class declaration 
class graph {
	int numVertices;
	country runner;
	std::map<std::string, std::vector<country>> adjList;
	std::map<std::string, country> countries;

public:

	graph();
	void insert(std::string inCountry, std::string outCountry);
	void insert(std::string inCountry);
	void breadthFirstCountries(std::string src);
	void depthFirstCountries(std::string src);
	void breadthFirstDisasters(std::string src);
	void depthFirstDisasters(std::string src);
	void displayXhighest(int amount);
	void displayXtypes(int amount, std::string type);
	void displayLocation(int Year, std::string type, std::string state);
	void display(std::string s);
};