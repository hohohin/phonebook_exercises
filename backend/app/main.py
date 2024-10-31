from fastapi import FastAPI, HTTPException
from datetime import datetime
from typing import List
import random
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from .models import Person, PersonCreate, PersonUpdate
from .database import db
import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

app = FastAPI()

# 获取环境变量，设置默认值
PORT = int(os.getenv("PORT", 3000))
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/persons", response_model=List[Person])
async def get_all_persons():
    return db.get_all()

@app.get("/info", response_class=HTMLResponse)
async def get_info():
    amount = len(db.persons)
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return f"""
        <p>Phonebook has info for {amount} people</p>
        <p>{current_time}</p>
    """

@app.get("/api/persons/{person_id}", response_model=Person)
async def get_person(person_id: int):
    person = db.get_by_id(person_id)
    if not person:
        raise HTTPException(status_code=404, detail="Person not found")
    return person

@app.delete("/api/persons/{person_id}", status_code=204, response_description="person deleted")
async def delete_person(person_id: int):
    if not db.delete_person(person_id):
        raise HTTPException(status_code=404, detail="Person not found")
    return

@app.post("/api/persons", response_model=Person)
async def create_person(person: PersonCreate):
    if not person.name:
        raise HTTPException(status_code=400, detail="Name missing")
    
    if not person.number:
        raise HTTPException(status_code=400, detail="Number missing")
    
    if db.name_exists(person.name):
        raise HTTPException(status_code=400, detail=f"{person.name} already been added")

    new_person = Person(
        id=random.randint(1, 1000),
        name=person.name,
        number=person.number
    )
    
    return db.add_person(new_person)

# 如果是直接运行此文件
if __name__ == "__main__":
    import uvicorn
    # 使用更安全的配置
    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",  # 只监听本地连接
        port=PORT,
        reload=False  # 生产环境禁用热重载
    )