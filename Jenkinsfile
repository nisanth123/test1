pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                // Checkout the code from the repository
                checkout scm
                
                // Build Docker image
                bat 'docker build -t my-node-app .'
            }
        }
        
        stage('Test') {
            steps {
                // You can add your test scripts here
                bat 'echo "Running tests"'
            }
        }
        
        stage('Deploy') {
            steps {
                    bat 'docker stop my-node-app'
                    bat 'docker rm my-node-app'
                 
                // Deploy the Docker container
                bat 'docker run -d -p 3000:3000 my-node-app'
            }
        }
    }
}
