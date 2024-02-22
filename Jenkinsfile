pipeline {
    agent any

    environment {
        // Set the Docker registry where your images will be pushed
        DOCKER_REGISTRY = 'docker.io/nisanthp'
        // Set your Kubernetes namespace
        K8S_NAMESPACE = 'default'
        // Set your Kubernetes deployment name
        K8S_DEPLOYMENT_NAME = 'my-node-app'
    }

    stages {
        stage('Build') {
            steps {
            checkout scm
            }
        }

        stage('Docker Build & Push') {
            steps {
                // Build Docker image
                script {
                    docker.build("${DOCKER_REGISTRY}/my-node-app:${env.BUILD_NUMBER}")
                }
                // Push Docker image to registry
                script {
                    docker.withRegistry("${DOCKER_REGISTRY}", 'dockerhub') {
                        docker.image("${DOCKER_REGISTRY}/your-nodejs-app:${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                // Update Kubernetes deployment with the new image
                script {
                    sh "kubectl set image deployment/${K8S_DEPLOYMENT_NAME} ${K8S_DEPLOYMENT_NAME}=${DOCKER_REGISTRY}/my-node-app:${env.BUILD_NUMBER} -n ${K8S_NAMESPACE}"
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
