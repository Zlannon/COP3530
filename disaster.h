#pragma once
#include <iomanip>
#include <iostream>
#include <vector>
#include <fstream>
#include <string>
#include <cctype>
#include <sstream>


struct disaster {
	std::string type;
	std::string state;
	std::string month;
	int year;
	std::string damage;

	disaster() {

	}

	disaster(std::string Type, std::string State, std::string Month, int Year, std::string Damage) {
		type = Type;
		state = State;
		month = Month;
		year = Year;
		damage = Damage;
	}

	void Load(std::vector<disaster*>& Disasters, const std::string File, std::string country);

};