from pydantic import BaseModel


class PersonCreate(BaseModel):
    name: str
    number: str

class Person(PersonCreate):
    id: int

class PersonUpdate(BaseModel):
    name: str | None
    number: str | None