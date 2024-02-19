pipeline {
    agent any
    environment {     
        DOCKERHUB_CREDENTIALS= credentials('dockerhub')     
    } 
    stages {
        stage('Build') {
            steps {
                // Checkout the code from the repository
                checkout scm
                
                // Build Docker image
                script {
                    docker.build('nisanthp/my-node-app')
                }
            }
        }
        
        stage('Push Image to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW', usernameVariable: 'DOCKERHUB_CREDENTIALS_USR')]) {
                    sh "docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW"
                }
                sh 'docker push nisanthp/my-node-app'
            }
        }
        
        stage('Test') {
            steps {
                // You can add your test scripts here
                sh 'echo "Running tests"'
            }
        }
        
        stage('Deploy') {
            steps {
                // Apply Kubernetes deployment and service YAML files
                sh 'kubectl apply -f deployment.yaml'
                sh 'kubectl apply -f service.yaml'
            }
        }
    }
}