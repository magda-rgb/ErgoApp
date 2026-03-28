from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


INSURANCE_TYPE_FACTORS: dict[str, int] = {
    "car": 3,
    "home": 2,
    "travel": 1,
}


class RiskRequest(BaseModel):
    age: int = Field(ge=18,le=100)
    coverage: int = Field(ge=1000, le=10000)
    insurance_type: str


class RiskResponse(BaseModel):
    risk_level: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/calculate_insurance", response_model=RiskResponse)
async def calculate_insurance(request: RiskRequest) -> RiskResponse:
    if request.insurance_type not in INSURANCE_TYPE_FACTORS:
        raise HTTPException(status_code=400, detail="Invalid insurance type")

    risk_value = (request.age / 10) + (request.coverage / 10000) + INSURANCE_TYPE_FACTORS[request.insurance_type]

    if risk_value <= 5:
        risk_level = "Low"
    elif risk_value <= 8:
        risk_level = "Medium"
    else:
        risk_level = "High"

    return RiskResponse(risk_level=risk_level)