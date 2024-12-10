from fastapi import APIRouter, HTTPException

# from app.api.routes import users

router = APIRouter()

# router.include_router(users.router)

@router.get("/")
async def root():
    raise HTTPException(status_code=418, detail="not enough coffee")