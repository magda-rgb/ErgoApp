from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


INSURANCE_TYPE_FACTORS: dict[str, int] = {
    "car": 3,
    "home": 2,
    "travel": 1,
}


class RiskRequest(BaseModel):
    age: int = Field(gt=18)
    coverage: int = Field(ge=1000, le=10000)
    insurance_type: str


class RiskResponse(BaseModel):
    Risk: float


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/calculate_insurance", response_model=RiskResponse)
async def calculate_insurance(request: RiskRequest) -> RiskResponse:
    if request.insurance_type not in INSURANCE_TYPE_FACTORS:
        return {"error": "Invalid insurance type"}

    risk_level = (request.age / 10) + (request.coverage / 10000) + INSURANCE_TYPE_FACTORS[request.insurance_type]
    return RiskResponse(Risk=risk_level)