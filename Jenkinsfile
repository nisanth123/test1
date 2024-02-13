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
                // Deploy the Docker container
                bat 'docker run -d -p 3000:3000 my-node-app'
            }
        }
    }
}
