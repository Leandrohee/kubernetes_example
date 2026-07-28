#!/usr/bin/env bash

PS3="Select an option: "

select option in Frontend Backend NGINX All Quit; do
    case "$option" in
        Frontend)
            docker build -t frontend_k8s_image:latest ./frontend
            break
            ;;
        Backend)
            docker build -t backend_k8s_image:latest ./backend
            break
            ;;
        NGINX)
            docker build -t nginx_k8s_image:latest ./nginx
            break
            ;;
        All)
            docker build -t frontend_k8s_image:latest ./frontend
            docker build -t backend_k8s_image:latest ./backend
            docker build -t nginx_k8s_image:latest ./nginx
            break
            ;;
        Quit)
            exit 0
            ;;
        *)
            echo "Invalid option"
            ;;
    esac
done