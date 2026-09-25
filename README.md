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
