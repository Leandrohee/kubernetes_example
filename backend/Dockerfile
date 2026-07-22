FROM python:3.13-slim

WORKDIR /src

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copying the folders to inside /src
COPY app ./app
COPY dotenv ./dotenv

# Removing the .env.local
RUN rm -rf ./dotenv/.env.local

EXPOSE 3333

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "3333"]
