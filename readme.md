Comandos uteis
```bash
kubectl apply -f k8s/nginx_deployment.yaml
kubectl get pods
kubectl get deployments

kubectl delete deployment nginx-deployment

docker build -t nginx_k8s_image:latest ./nginx

lsof -i -P -n | grep :80   
ss -tulp | grep 80
```