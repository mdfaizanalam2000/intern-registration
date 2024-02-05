from fastapi import FastAPI,Body
from pymongo import MongoClient
from hashing import Hasher
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client=MongoClient()
database=client["knowledgelens"]
collection=database["login_signup"]


@app.post("/signup")
def signup(user=Body()):
    try:
        find_user=collection.find_one({"email":user["email"]})
        if find_user!=None:
            return {"message":"email already exists, please login"}
        else:
            hashed_password=Hasher.get_password_hash(user["password"])
            user["password"]=hashed_password
            collection.insert_one(user)
            return {"message":"signup is successful, login to use!"}
    except Exception as e:
        return {"message":str(e)}
    
@app.post("/login")
def login(user=Body()):
    try:
        find_user=collection.find_one({"email":user["email"]})
        if find_user is None:
            return {"message":"email doesn't exists, please signup first"}
        elif Hasher.verify_password(user["password"],find_user["password"]) is False:
            return {"message":"Invalid login credentials!"}
        else:
            # converting ObjectID to string
            find_user["_id"]=str(find_user["_id"])
            return {"message":"login successful!","details":find_user}
    except Exception as e:
        return {"message":str(e)}