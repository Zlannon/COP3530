//imports
#include <iostream>
#include <fstream>
#include <string>
#include "Graph.h"
#include "Country.h"
#include "disaster.h"

int main() {
	
	graph runner;

	std::ifstream file;
	file.open("StatesConnectedUSA.txt");
	std::string input = "";
	while (std::getline(file, input)) {
		std::string inCountry = input.substr(0, input.find(" "));
		std::string outCountry = input.substr(input.find(" ") + 1, input.length() - input.find(" "));
		if(outCountry == "")
			runner.insert(inCountry);
		else
			runner.insert(inCountry, outCountry);
	}

	//runner.display("florida");
	runner.displayLocation(2011, "", "florida");
	system("pause");
	return 0;
}