pipeline {
    agent any

    environment {
        // Set the Docker registry where your images will be pushed
        DOCKER_REGISTRY = 'docker.io/nisanthp'
        // Set your Kubernetes namespace
        K8S_NAMESPACE = 'default'
        // Set your Kubernetes deployment name
        K8S_DEPLOYMENT_NAME = 'my-node-app'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        KUBE_CONFIG = credentials('kube_config')
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
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW', usernameVariable: 'DOCKERHUB_CREDENTIALS_USR')]) {
                        sh "docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW"
                        docker.image("${DOCKER_REGISTRY}/my-node-app:${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Use Kubernetes credentials
                    withKubeConfig(credentialsId: 'kube_config') {
                        // Create Kubernetes deployment
                        sh "kubectl apply -f deployment.yaml'
                        sh 'kubectl apply -f service.yaml'
                    }
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
