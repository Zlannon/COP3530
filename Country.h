#pragma once
#include <iostream>
#include <string>
#include <vector>

#include "disaster.h"


struct country {

	disaster runner;

	std::vector<disaster*> disasters;
	std::string name;

	country();
	country(std::string name);
	void displayStats();
};