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
	int damage;
	std::string county;

	disaster() {

	}

	disaster(std::string Type, std::string State, std::string Month, int Year, int Damage, std::string County) {
		type = Type;
		state = State;
		month = Month;
		year = Year;
		damage = Damage;
		county = County;
	}

	void Load(std::vector<disaster*>& Disasters, const std::string File, std::string country);

};
