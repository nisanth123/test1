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
                    bat 'docker ps -a | grep my-node-app | awk \'{print $1}\' | xargs -I {} docker stop {}'
                    bat 'docker ps -a | grep my-node-app | awk \'{print $1}\' | xargs -I {} docker rm {}'
                // Deploy the Docker container
                bat 'docker run -d -p 3000:3000 my-node-app'
            }
        }
    }
}
