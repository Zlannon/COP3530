#include "disaster.h"

disaster::disaster() {

}

disaster::disaster(std::string Type, std::string State, std::string Month, int Year, int Damage, std::string County) {
	type = Type;
	state = State;
	month = Month;
	year = Year;
	damage = Damage;
	county = County;
}

void disaster::Load(std::vector<disaster*>& Disasters, const std::string File, std::string State) {
	std::ifstream file(File);
	if (file.is_open()) {
		std::string line;
		std::getline(file, line);
		while (std::getline(file, line)) {
			std::istringstream stream(line);
			std::string type;
			std::string state;
			std::string month;
			std::string Year;
			std::string Damage;
			std::string county;
			double temp;
			int damage;
			int year;
			std::getline(stream, state, ',');
			std::getline(stream, Year, ',');
			std::getline(stream, month, ',');
			std::getline(stream, type, ',');
			std::getline(stream, county, ',');
			std::getline(stream, Damage, ',');
			temp = std::stod(Damage);
			damage = (int)temp;
			if (Damage[Damage.length() - 1] == 'K') {
				damage = (int)(temp * 1000);
			}
			if (Damage[Damage.length() - 1] == 'M') {
				damage = (int)(temp * 1000000);
			}
			if (Damage[Damage.length() - 1] == 'B') {
				damage = (int)(temp * 1000000000);
			}
			year = std::stoi(Year);


			for (int i = 0; i < state.length(); i++)
				state[i] = std::tolower(state[i]);
			for (int i = 0; i < State.length(); i++)
				State[i] = std::tolower(State[i]);

			disaster* New = new disaster(type, state, month, year, damage, county);

			if(state == State)
				Disasters.push_back(New);
		}
	}
}
