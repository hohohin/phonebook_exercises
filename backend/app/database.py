from typing import List, Optional
from .models import Person

class Database:
    def __init__(self):
        self.persons: List[Person] = [
            Person(id=1, name="Arto Hellas", number="040-123456"),
            Person(id=2, name="Ada Lovelace", number="39-44-5323523"),
            Person(id=3, name="Dan Abramov", number="12-43-234345"),
            Person(id=4, name="Mary Poppendieck", number="39-23-6423122")
        ]

    def get_all(self) -> List[Person]:
        return self.persons

    def get_by_id(self, person_id: int) -> Optional[Person]:
        #next - 找到列表里第一个匹配的
        return next((p for p in self.persons if p.id == person_id), None)

    def add_person(self, person: Person) -> Person:
        self.persons.append(person)
        return person

    def delete_person(self, person_id: int) -> bool:
        initial_length = len(self.persons)
        self.persons = [p for p in self.persons if p.id != person_id]
        return len(self.persons) < initial_length

    def name_exists(self, name: str) -> bool:
        return any(p.name == name for p in self.persons)

db = Database()