//imports
#include <iostream>
#include <fstream>
#include <string>
#include "Graph.h"
#include "State.h"
#include "disaster.h"

int main() {
	
	graph runner;

	std::ifstream file;
	file.open("StatesConnectedUSA.txt");
	std::string input = "";
	while (std::getline(file, input)) {
		std::string inState = input.substr(0, input.find(" "));
		std::string outState = input.substr(input.find(" ") + 1, input.length() - input.find(" "));
		if(outState == "")
			runner.insert(inState);
		else
			runner.insert(inState, outState);
	}

	int option = 0;
	int tOption;
	int amount;
	int year;

	std::string type;
	std::string state;

	while (option != -1) {
		std::cout << std::endl;
		std::cout << "Select option" << std::endl;
		std::cout << "1: Breadth First Search" << std::endl;
		std::cout << "2: Depth First Search" << std::endl;
		std::cout << "3: X highest disasters" << std::endl;
		std::cout << "4: X highest disasters of X type" << std::endl;
		std::cout << "5: disasters with filters" << std::endl;
		std::cin >> option;

		switch (option) {
			case 1:
				std::cout << "Type starting state (indicate spaces with '_') or '-1' to return to main menu: ";
				std::cin >> state;
				if (state == "-1")
					break;
				for (int i = 0; i < state.size(); i++) {
					state[i] = std::tolower(state[i]);
				}
				std::cout << std::endl;
				runner.breadthFirstCountries(state);
				break;
			case 2:
				std::cout << "Type starting state (indicate spaces with '_') or '-1' to return to main menu: ";
				std::cin >> state;
				if (state == "-1")
					break;
				for (int i = 0; i < state.size(); i++) {
					state[i] = std::tolower(state[i]);
				}
				std::cout << std::endl;
				runner.depthFirstCountries(state);
				break;
			case 3:
				std::cout << "Type amount of disasters to display or '-1' to return to main menu: ";
				std::cin >> amount;
				if (amount == -1)
					break;
				std::cout << std::endl;
				runner.displayXhighest(amount);
				break;
			case 4:
				std::cout << "Type amount of disasters to display or '-1' to return to main menu: ";
				std::cin >> amount;
				if (amount == -1)
					break;
				std::cout << std::endl;

				std::cout << "Select option" << std::endl;
				std::cout << "1: Avalanche" << std::endl;
				std::cout << "2: Blizzard" << std::endl;
				std::cout << "3: Flood" << std::endl;
				std::cout << "4: Extreme Heat" << std::endl;
				std::cout << "5: Extreme Cold" << std::endl;
				std::cout << "6: Debris Flow" << std::endl;
				std::cout << "7: Dense Fog" << std::endl;
				std::cout << "8: Drought" << std::endl;
				std::cout << "9: Dust Devil" << std::endl;
				std::cout << "10: Frost" << std::endl;
				std::cout << "11: Tornado" << std::endl;
				std::cout << "12: Hail" << std::endl;
				std::cout << "13: Heavy Rain" << std::endl;
				std::cout << "14: Tsunami" << std::endl;
				std::cout << "15: High Wind" << std::endl;
				std::cout << "16: Hurricane" << std::endl;
				std::cout << "17: Storm" << std::endl;
				std::cout << "18: Lightning" << std::endl;
				std::cout << "19: Wildfire" << std::endl;
				std::cout << "-1: No type" << std::endl;
				std::cin >> tOption;

				switch (tOption) {
				case 1:
					type = "Avalanche";
					break;
				case 2:
					type = "Blizzard";
					break;
				case 3:
					type = "Flood";
					break;
				case 4:
					type = "Extreme Heat";
					break;
				case 5:
					type = "Extreme Cold";
					break;
				case 6:
					type = "Debris Flow";
					break;
				case 7:
					type = "Dense Fog";
					break;
				case 8:
					type = "Drought";
					break;
				case 9:
					type = "Dust Devil";
					break;
				case 10:
					type = "Frost";
					break;
				case 11:
					type = "Tornado";
					break;
				case 12:
					type = "Hail";
					break;
				case 13:
					type = "Heavy Rain";
					break;
				case 14:
					type = "Tsunami/Wave";
					break;
				case 15:
					type = "High Wind";
					break;
				case 16:
					type = "Hurricane";
					break;
				case 17:
					type = "Storm";
					break;
				case 18:
					type = "Lightning";
					break;
				case 19:
					type = "Wildfire";
					break;
				case -1:
					type = "";
					break;
				}

				runner.displayXtypes(amount, type);
				break;
			case 5:

				std::cout << "Type year of disaster [2006-2011] ('0' for all) or '-1' to return to main menu: ";
				std::cin >> year;
				if (year == -1)
					break;

				std::cout << std::endl;
				std::cout << "Select option" << std::endl;
				std::cout << "1: Avalanche" << std::endl;
				std::cout << "2: Blizzard" << std::endl;
				std::cout << "3: Flood" << std::endl;
				std::cout << "4: Extreme Heat" << std::endl;
				std::cout << "5: Extreme Cold" << std::endl;
				std::cout << "6: Debris Flow" << std::endl;
				std::cout << "7: Dense Fog" << std::endl;
				std::cout << "8: Drought" << std::endl;
				std::cout << "9: Dust Devil" << std::endl;
				std::cout << "10: Frost" << std::endl;
				std::cout << "11: Tornado" << std::endl;
				std::cout << "12: Hail" << std::endl;
				std::cout << "13: Heavy Rain" << std::endl;
				std::cout << "14: Tsunami" << std::endl;
				std::cout << "15: High Wind" << std::endl;
				std::cout << "16: Hurricane" << std::endl;
				std::cout << "17: Storm" << std::endl;
				std::cout << "18: Lightning" << std::endl;
				std::cout << "19: Wildfire" << std::endl;
				std::cout << "-1: No type" << std::endl;
				std::cin >> tOption;

				switch (tOption) {
					case 1:
						type = "Avalanche";
						break;
					case 2:
						type = "Blizzard";
						break;
					case 3:
						type = "Flood";
						break;
					case 4:
						type = "Extreme Heat";
						break;
					case 5:
						type = "Extreme Cold";
						break;
					case 6:
						type = "Debris Flow";
						break;
					case 7:
						type = "Dense Fog";
						break;
					case 8:
						type = "Drought";
						break;
					case 9:
						type = "Dust Devil";
						break;
					case 10:
						type = "Frost";
						break;
					case 11:
						type = "Tornado";
						break;
					case 12:
						type = "Hail";
						break;
					case 13:
						type = "Heavy Rain";
						break;
					case 14:
						type = "Tsunami/Wave";
						break;
					case 15:
						type = "High Wind";
						break;
					case 16:
						type = "Hurricane";
						break;
					case 17:
						type = "Storm";
						break;
					case 18:
						type = "Lightning";
						break;
					case 19:
						type = "Wildfire";
						break;
					case -1:
						type = "";
						break;
				}

				std::cout << std::endl;
				std::cout << "Type state of disaster (or '-1' for all states): ";
				std::cin >> state;

				if (state == "-1")
					state = "";

				for (int i = 0; i < state.size(); i++) {
					state[i] = std::tolower(state[i]);
				}

				runner.displayLocation(year, type, state);
				break;
		}
		option = 0;
		tOption = 0;
		amount = 0;
		year = 0;
		type = "";
		state = "";
	}
	system("pause");
	return 0;
}