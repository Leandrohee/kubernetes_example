from fastapi import APIRouter, Request
from app.models.user import UserModel
import logging

router = APIRouter(prefix="/users", tags=["Users"])
CACHE_TTL_SECONDS = 300  # 5 minutes
logger = logging.getLogger("uvicorn.error")


@router.get("/{username}", response_model=UserModel)
async def get_user(username: str, request: Request):
    cache_key = f"user:{username.lower()}"
    redis_client = request.app.state.redis

    cached_user = await redis_client.get(cache_key)

    if cached_user:
        logger.info("It return with cache")
        return UserModel.model_validate_json(cached_user)

    logger.info("It return without cache")
    user = UserModel(age=21, name=username, profession="Fireman")

    await redis_client.set(
        cache_key,
        user.model_dump_json(),
        ex=CACHE_TTL_SECONDS,
    )

    return user
