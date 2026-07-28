#!/bin/bash

set -e

NAMESPACE="kubernetes-example-local"

restart_nginx() {
    echo "🔄 Restarting NGINX..."
    kubectl rollout restart deployment/nginx-deployment -n "$NAMESPACE"
}

restart_frontend() {
    echo "🔄 Restarting Frontend..."
    kubectl rollout restart deployment/frontend-deployment -n "$NAMESPACE"
}

restart_backend() {
    echo "🔄 Restarting Backend..."
    kubectl rollout restart deployment/backend-deployment -n "$NAMESPACE"
}

restart_redis() {
    echo "🔄 Restarting Redis..."
    kubectl rollout restart deployment/redis-deployment -n "$NAMESPACE"
}

restart_all() {
    restart_nginx
    restart_frontend
    restart_backend
    restart_redis
}

PS3="Select an option: "

select option in \
    "NGINX" \
    "Frontend" \
    "Backend" \
    "Redis" \
    "All Deployments" \
    "Exit"
do
    case "$option" in
        "NGINX")
            restart_nginx
            break
            ;;
        "Frontend")
            restart_frontend
            break
            ;;
        "Backend")
            restart_backend
            break
            ;;
        "Redis")
            restart_redis
            break
            ;;
        "All Deployments")
            restart_all
            break
            ;;
        "Exit")
            exit 0
            ;;
        *)
            echo "Invalid option."
            ;;
    esac
done

echo ""
echo "✅ Done!"