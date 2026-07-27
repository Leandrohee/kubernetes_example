FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY certs/ /etc/nginx/ssl/

# Essas linhas abaixo são opcioanais, mas coloco para documentacao
CMD ["nginx", "-g", "daemon off;"] 