pipeline {
    agent {
        kubernetes {
            // Define the Maven pod template
            yaml """
            apiVersion: v1
            kind: Pod
            metadata:
              labels:
                app: my-node-app
            spec:
              containers:
                - name: my-node-app
                  image: nisanthp/my-node-app
                  command:
                    - cat
                  tty: true
            """
        }
    }

    environment {
        NAME = 'SERVICE_ACCOUNT_NAME'
        VALUE = 'jenkins-kube' // Replace with your actual name
    }

    stages {
        stage('Build') {
            steps {
                // Checkout the code from the repository
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
                // You can add your test scripts here
                sh 'echo "Running tests"'
            }
        }
        
        stage('Deploy') {
            steps {
                container('kubernetes') {
                    sh 'kubectl apply -f deployment.yaml'
                    sh 'kubectl apply -f service.yaml'
                }
            }
        }
    }
}
