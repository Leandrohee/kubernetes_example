# This folder is for only demonstrated how secrets work in kubernetes


# Creating a secret with kubectl bash
```bash
# Check secrets
kubectl get secret 
kubectl describe secret my-calopsita-secret
kubectl get secret my-calopsita-secret -o yaml

# Creating a secret with bash
kubectl create secret generic my-calopsita-secret \
    --from-literal=message="Hello Calopsita from Kubernetes Secret"

# Deleting secrets
kubectl delete secret my-calopsita-secret

# Showing the result of the secret
kubectl get secret my-calopsita-secret -o yaml \
| grep "message:" \
| awk '{print $2}' \
| base64 --decode
```

# Using a secret on a custom image

```bash
# Creating a custom ubuntu image
docker build -t custom_ubuntu_image:latest ./secrets

# Run a container with this image (test it with container)
docker run --rm -it custom_ubuntu_image
echo $LEANDRO_ENV

# Running a pod with this image (test it with pod) - Without the injection of custom env
kubectl apply -f ./secrets/pod.yaml
kubectl logs ubuntu-test-pod
kubectl get pods
kubectl exec -it ubuntu-test-pod -- bash
echo $LEANDRO_ENV
kubectl delete -f ./secrets/pod.yaml

# Running a pod with this image (test it with pod) - With the injection of custom env
# Create the secret
kubectl create secret generic my-calopsita-secret \
    --from-literal=message="Hello Calopsita from Kubernetes Secret"

kubectl apply -f ./secrets/pod_with_k8s_secret.yaml
kubectl logs ubuntu-test-pod-with-secret
kubectl exec -it ubuntu-test-pod-with-secret -- bash
echo $LEANDRO_ENV
kubectl delete -f ./secrets/pod_with_k8s_secret.yaml

```