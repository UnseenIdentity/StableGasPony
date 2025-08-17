import os
import uuid
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
from pydantic import BaseModel
from dotenv import load_dotenv
from typing import Dict

load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow your frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

CIRCLE_API_KEY = os.getenv("CIRCLE_API_KEY")
CIRCLE_APP_ID = os.getenv("CIRCLE_APP_ID")
BASE_URL = "https://api-sandbox.circle.com/v1/w3s"
HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {CIRCLE_API_KEY}"
}

MERCHANT_ADDRESS = "0xYourMerchantAddressHere"  # Replace with your testnet address
USDC_TOKEN_ID = "3d1c58b7-6e53-4d3d-8df9-95b4368b5062"  # Example; fetch from /config/tokens
BLOCKCHAIN = "ETH-SEPOLIA"

class DeviceIdBody(BaseModel):
    deviceId: str

class UserTokenBody(BaseModel):
    userToken: str

class TransferBody(BaseModel):
    userToken: str
    walletId: str
    amount: str

class UserIdBody(BaseModel):
    userId: str

@app.get("/app_id")
def get_app_id():
    return {"appId": CIRCLE_APP_ID}

@app.post("/get_otp_tokens")
def get_otp_tokens(body: DeviceIdBody):
    idempotency_key = str(uuid.uuid4())
    response = requests.post(f"{BASE_URL}/users/social/token", json={"idempotencyKey": idempotency_key, "deviceId": body.deviceId}, headers=HEADERS)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()["data"]

@app.post("/create_user")
def create_user():
    user_id = str(uuid.uuid4())
    response = requests.post(f"{BASE_URL}/users", json={"userId": user_id}, headers=HEADERS)
    if response.status_code != 201:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return {"userId": user_id}

@app.post("/get_user_token")
def get_user_token(body: UserIdBody):
    response = requests.post(f"{BASE_URL}/users/token", json={"userId": body.userId}, headers=HEADERS)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()["data"]

@app.post("/initialize_wallet")
def initialize_wallet(body: UserTokenBody):
    idempotency_key = str(uuid.uuid4())
    init_body = {
        "idempotencyKey": idempotency_key,
        "blockchains": [BLOCKCHAIN],
        "accountType": "SCA",
        "metadata": [{"name": "My dApp Wallet"}],
        "userToken": body.userToken
    }
    response = requests.post(f"{BASE_URL}/user/initialize", json=init_body, headers=HEADERS)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    data = response.json()["data"]
    return {"challengeId": data["challengeId"]}

@app.post("/get_wallets")
def get_wallets(body: UserIdBody):
    params = {"userId": body.userId}
    response = requests.get(f"{BASE_URL}/wallets", params=params, headers=HEADERS)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()["data"]

@app.get("/get_balance/{wallet_id}")
def get_balance(wallet_id: str):
    response = requests.get(f"{BASE_URL}/wallets/{wallet_id}/balances", headers=HEADERS)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()["data"]

@app.post("/create_transfer")
def create_transfer(body: TransferBody):
    idempotency_key = str(uuid.uuid4())
    transfer_body = {
        "idempotencyKey": idempotency_key,
        "amounts": [body.amount],
        "feeLevel": "HIGH",
        "destinationAddress": MERCHANT_ADDRESS,
        "tokenId": USDC_TOKEN_ID,
        "walletId": body.walletId,
        "userToken": body.userToken
    }
    response = requests.post(f"{BASE_URL}/user/tokenTransfer", json=transfer_body, headers=HEADERS)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    data = response.json()["data"]
    return {"challengeId": data["challengeId"], "transactionId": data["id"]}

@app.get("/products")
def get_products():
    return [
        {"id": 1, "name": "Product A", "price": "1.0"},
        {"id": 2, "name": "Product B", "price": "2.5"}
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)