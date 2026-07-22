"""Load the backend environment file using the project's priority order."""

from pathlib import Path

from dotenv import load_dotenv


def load_which_env(project_root: Path | None = None) -> Path:
    """Load and return the highest-priority environment file available.

    Files are checked inside ``dotenv`` in this order:
    ``.env.local``, ``.env``, ``.env.development`` then ``.env.stage``

    Args:
        project_root: Backend directory containing the ``dotenv`` folder. When
            omitted, the current working directory is used.

    Raises:
        FileNotFoundError: If none of the supported environment files exists.
    """

    root = Path(__file__).resolve().parent.parent.parent
    dotenv_directory = root / "dotenv"
    env_paths = (
        dotenv_directory / ".env.local",
        dotenv_directory / ".env",
        dotenv_directory / ".env.development",
        dotenv_directory / ".env.stage",
    )

    env_path = next((path for path in env_paths if path.is_file()), None)
    if env_path is None:
        raise FileNotFoundError("Nenhum arquivo .env encontrado")

    load_dotenv(dotenv_path=env_path)
    return env_path
