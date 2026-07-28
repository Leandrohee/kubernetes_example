import logging
import os
from contextlib import asynccontextmanager
from importlib import import_module
import redis.asyncio as redis
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.user.users import router as users_router
from app.routers.healthcheck.healthcheck import router as healthcheck_router

# ------------------------------------------ ENV SELECT ------------------------------------------ #
logger = logging.getLogger("uvicorn.error")
load_wich_env = import_module("app.utils.load-which-env").load_which_env
load_wich_env()
logger.info(f'ENV USADO: {os.getenv("ENV_USADO")}')


# --------------------------------------------- REDIS -------------------------------------------- #
@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.redis = redis.from_url(
        os.getenv("REDIS_URL", "redis://localhost:6380/0"),
        decode_responses=True,
    )

    await app.state.redis.ping()
    logger.info("Connected to Redis")

    yield

    await app.state.redis.aclose()
    logger.info("Disconnected from Redis")


# ----------------------------------------- FASTAPI INIT ----------------------------------------- #
app = FastAPI(lifespan=lifespan)  # with Redis
# app = FastAPI()  # without Redis

# --------------------------------------------- CORS --------------------------------------------- #
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------- ROUTES -------------------------------------------- #
app.include_router(users_router)
app.include_router(healthcheck_router)
