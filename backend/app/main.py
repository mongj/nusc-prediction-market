import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.api import router
from dotenv import load_dotenv


load_dotenv("../.env")

app = FastAPI(
    title="Betizen API",
)

# TODO: use env variables
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    # TODO: update this to only allow specific methods and headers
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

# Exception handler for all uncaught exceptions
async def base_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "message": "Internal server error",
        },
    )

app.add_exception_handler(Exception, base_exception_handler)