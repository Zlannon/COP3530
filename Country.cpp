#include "Country.h"

country::country() {

}

country::country(std::string n) {
	for (int i = 0; i < n.length(); i++)
		n[i] = std::tolower(n[i]);
	name = n;
	runner.Load(disasters, "data1.0.csv", n);
}

void country::displayStats() {
	for (int i = 0; i < disasters.size(); i++) {
		std::cout << "--------------------" << std::endl;
		std::cout << "State: " << disasters[i]->state << std::endl;
		std::cout << "Type: " << disasters[i]->type << std::endl;
		std::cout << "Time: " << disasters[i]->month  << ", " << disasters[i]->year << std::endl;
		std::cout << "Damage: " << disasters[i]->damage << std::endl;
	}
}