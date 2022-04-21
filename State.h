#pragma once
#include <iostream>
#include <string>
#include <vector>

#include "disaster.h"


struct state {

	disaster runner;

	std::vector<disaster*> disasters;
	std::string name;

	state();
	state(std::string name);
	void displayStats();
};