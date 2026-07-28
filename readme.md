# Comandos uteis
```bash
kubectl apply -f k8s/nginx_deployment.yaml
kubectl get pods
kubectl get deployments
kubectl get svc -n kube-system
kubectl get pods -n kubernetes-example-local
kubectl get all -n kubernetes-example-local
kubectl delete deployment nginx-deployment
kubectl delete namespace kubernetes-example-local
kubectl rollout restart deployment/nginx-deployment -n kubernetes-example-local
kubectl apply -k k8s/base/
kubectl kustomize k8s/homolog

docker build -t nginx_k8s_image:latest ./nginx
docker compose up --build -d

lsof -i -P -n | grep :80 | grep LISTEN
ss -tulp | grep 80

curl -i http://127.0.0.1:80
curl -ik https://localhost:443/user
```

# Como rodar esse projeto - branch 00_only_docker_compose
```bash
docker compose up --build -d
```


# Helm vs kustomization

### Helm
```txt
mychart/

Chart.yaml

values.yaml

templates/
    deployment.yaml
    service.yaml
```

