from fastapi import APIRouter

router = APIRouter(prefix="/health-check", tags=["Health-Check"])


@router.get("")
def health_check():
    return "Backend healthy"
