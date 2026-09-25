# Junior DevOps Engineer Practical Assessment

A practical DevOps assessment project demonstrating application containerization with Docker and deployment to Kubernetes using Minikube.

## Project Overview

This project contains a simple Node.js and Express application that is:

* Containerized using Docker
* Deployed to Kubernetes using Minikube
* Configured with Kubernetes ConfigMap
* Deployed with 2 replicas
* Configured with CPU and memory requests/limits
* Configured with readiness and liveness probes
* Exposed through a Kubernetes Service
* Configured with Horizontal Pod Autoscaling (HPA)

## Technologies Used

* Node.js
* Express.js
* Docker
* Kubernetes
* Minikube
* PowerShell
* Git / GitHub

## Project Structure

```text
devops-assessment/
│
├── app/
│   ├── server.js
│   ├── test.js
│   ├── package.json
│   └── package-lock.json
│
├── Dockerfile
├── .dockerignore
├── .gitignore
│
└── k8s/
    ├── configmap.yaml
    ├── deployment.yaml
    ├── service.yaml
    └── hpa.yaml
```

## 1. Application

The application is built using Node.js and Express.

### Application Port

```text
3000
```

### Endpoints

#### Application

```text
GET /
```

Returns basic application information.

#### Health

```text
GET /health
```

Returns the application health status.

Example response:

```json
{
  "status": "healthy"
}
```

## 2. Application Testing

The project contains a basic test:

```text
app/test.js
```

Run the test with:

```bash
npm test
```

Expected output:

```text
Application test passed
```

## 3. Docker

The application is containerized using the Dockerfile.

### Build Image

From the project root:

```powershell
docker build -t devops-assessment:latest .
```

### Run Container

```powershell
docker run -d --name devops-app -p 3000:3000 devops-assessment:latest
```

### Check Running Container

```powershell
docker ps
```

### Test Application

```powershell
curl http://localhost:3000/health
```

Expected:

```json
{
  "status": "healthy"
}
```

### Stop Container

```powershell
docker stop devops-app
```

### Remove Container

```powershell
docker rm devops-app
```

## 4. Docker Security

The Docker image uses a lightweight Node.js Alpine base image.

The container is configured to run as the non-root `node` user:

```dockerfile
USER node
```

This reduces the privileges available to the application inside the container.

The `.dockerignore` file prevents unnecessary files such as `node_modules` and Git files from being included in the Docker build context.

## 5. Kubernetes

The application is deployed to Kubernetes using Minikube.

The Kubernetes configuration is located inside:

```text
k8s/
```

### Kubernetes Components

```text
ConfigMap
   │
   ▼
Deployment
   │
   ├── Pod 1
   │
   └── Pod 2
        │
        ▼
     Service
```

The Deployment maintains two application replicas.

## 6. ConfigMap

File:

```text
k8s/configmap.yaml
```

The ConfigMap stores non-sensitive application configuration such as:

```text
APP_NAME
PORT
```

Sensitive information such as passwords, API keys, or tokens should not be stored in a ConfigMap.

For sensitive configuration, Kubernetes Secrets should be used.

## 7. Deployment

File:

```text
k8s/deployment.yaml
```

The Deployment is configured with:

* 2 replicas
* Container port 3000
* CPU requests and limits
* Memory requests and limits
* Readiness probe
* Liveness probe
* ConfigMap environment variables

### Replicas

Two replicas are used to provide basic application availability and demonstrate Kubernetes replica management.

### Resource Requests

The application has CPU and memory requests configured.

Requests help Kubernetes determine where a pod can be scheduled.

### Resource Limits

CPU and memory limits prevent the application container from consuming unlimited resources.

## 8. Readiness Probe

The readiness probe checks:

```text
/health
```

The purpose of the readiness probe is to determine whether the application is ready to receive traffic.

If the application is not ready, Kubernetes does not send Service traffic to that pod.

## 9. Liveness Probe

The liveness probe also checks:

```text
/health
```

The purpose of the liveness probe is to detect an unhealthy application container.

If the liveness check repeatedly fails, Kubernetes can restart the container.

## 10. Kubernetes Service

File:

```text
k8s/service.yaml
```

The Service exposes the application running on port:

```text
3000
```

The Service uses `NodePort` so the application can be accessed from the Minikube environment.

Access the service with:

```powershell
minikube service devops-assessment-service --url
```

## 11. Minikube Docker Image

The application image is loaded into Minikube using:

```powershell
minikube image load devops-assessment:latest
```

This allows the Kubernetes pods to use the locally built image without pulling it from Docker Hub.

The Deployment uses:

```yaml
imagePullPolicy: Never
```

for local Minikube testing.

## 12. Horizontal Pod Autoscaler

File:

```text
k8s/hpa.yaml
```

The HPA is configured to:

```text
Minimum replicas: 2
Maximum replicas: 5
CPU target: 70%
```

HPA allows Kubernetes to increase or decrease the number of application replicas based on CPU utilization.

### Enable Metrics Server

Minikube requires the Metrics Server for resource-based HPA:

```powershell
minikube addons enable metrics-server
```

Check pod metrics:

```powershell
kubectl top pods
```

Check HPA:

```powershell
kubectl get hpa
```

## 13. Deployment Commands

Check Minikube:

```powershell
minikube status
```

Check Kubernetes nodes:

```powershell
kubectl get nodes
```

Apply ConfigMap:

```powershell
kubectl apply -f k8s/configmap.yaml
```

Apply Deployment:

```powershell
kubectl apply -f k8s/deployment.yaml
```

Apply Service:

```powershell
kubectl apply -f k8s/service.yaml
```

Apply HPA:

```powershell
kubectl apply -f k8s/hpa.yaml
```

## 14. Verification

Check Deployment:

```powershell
kubectl get deployment
```

Check Pods:

```powershell
kubectl get pods
```

Check Services:

```powershell
kubectl get service
```

Check HPA:

```powershell
kubectl get hpa
```

Check resource metrics:

```powershell
kubectl top pods
```

Expected application state:

```text
Deployment: 2 replicas
Pods:       2 Running/Ready
Service:    NodePort
HPA:        2-5 replicas
```

## 15. Troubleshooting

### Check Pods

```powershell
kubectl get pods
```

### Describe a Pod

```powershell
kubectl describe pod <pod-name>
```

### Check Logs

```powershell
kubectl logs <pod-name>
```

### Check Deployment

```powershell
kubectl get deployment
```

### Describe Deployment

```powershell
kubectl describe deployment <deployment-name>
```

### Check Service

```powershell
kubectl get service
```

### Describe Service

```powershell
kubectl describe service <service-name>
```

### Check HPA

```powershell
kubectl get hpa
```

### Check Metrics

```powershell
kubectl top pods
```

### Check Minikube

```powershell
minikube status
```

## 16. Security Awareness

The current implementation follows basic security practices:

* Container runs as a non-root user.
* Sensitive values are not stored in the ConfigMap.
* Docker uses a lightweight base image.
* CPU and memory limits are configured.
* Credentials should not be committed to Git.
* Kubernetes Secrets should be used for sensitive configuration.
* Container image scanning should be added in a production CI/CD pipeline.

## 17. Cloud Migration

The current project uses Minikube for local Kubernetes testing.

A similar architecture could be deployed to AWS using:

```text
AWS
 │
 ▼
EKS
 │
 ▼
Kubernetes Service
 │
 ▼
Application Pods
```

### Completed

* [x] Node.js application
* [x] Application test
* [x] Dockerfile
* [x] `.dockerignore`
* [x] Docker image build
* [x] Docker container
* [x] Kubernetes ConfigMap
* [x] Kubernetes Deployment
* [x] 2 replicas
* [x] CPU/memory requests and limits
* [x] Readiness probe
* [x] Liveness probe
* [x] Kubernetes Service
* [x] HPA configuration

## Author

Badri Narayanan
