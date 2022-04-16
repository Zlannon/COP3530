#include <iomanip>
#include <iostream>
#include <vector>
#include <fstream>
#include <string>
#include <sstream>
using namespace std;

struct disaster {
	string type;
	string state;
	string month;
	int year;
	string damage;

	disaster(string Type, string State, string Month, int Year, string Damage) {
		type = Type;
		state = State;
		month = Month;
		year = Year;
		damage = Damage;
	}
};

void Load(vector<disaster*>& Disasters, const string File) {
	ifstream file(File);
	if (file.is_open()) {
		string line;
		getline(file, line);
		while (getline(file, line)) {
			istringstream stream(line);
			string type;
			string state;
			string month;
			string Year;
			string damage;
			int year;
			getline(stream, state, ',');
			getline(stream, Year, ',');
			getline(stream, month, ',');
			getline(stream, type, ',');
			getline(stream, damage);
			year = stoi(Year);
			disaster* New = new disaster(type, state, month, year, damage);
			Disasters.push_back(New);
		}
	}
}

int main() {
	vector<disaster*> test;
	Load(test, "data1.0.csv");
}