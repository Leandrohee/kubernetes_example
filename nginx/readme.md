Comand to generate the ssl certificate
```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ./nginx/certs/custom_certs.key \
  -out ./nginx/certs/custom_certs.crt \
  -subj "/C=BR/ST=DF/L=Brasilia/O=torres_organization/OU=DevOps/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,DNS:www.localhost,IP:127.0.0.1"
```