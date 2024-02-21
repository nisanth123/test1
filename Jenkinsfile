pipeline {
    agent any

    environment {     
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')     
    } 

    stages {
        stage('Build') {
            steps {
                checkout scm
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
                sh 'echo "Running tests"'
                // You can add your test scripts here
            }
        }
        
        stage('Deploy') {
            steps {
                container('kubernetes') {
                    environment {
                        NAME = 'SERVICE_ACCOUNT_NAME'
                        VALUE = 'jenkins-kube' // Replace with your actual name
                    }
                    sh 'kubectl apply -f deployment.yaml'
                    sh 'kubectl apply -f service.yaml'
                }
            }
        }
    }
}
