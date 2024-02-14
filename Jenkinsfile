pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                // Checkout the code from the repository
                checkout scm
                
                // Build Docker image
                sh 'docker build -t my-node-app .'
            }
        }
        
        stage('Test') {
            steps {
                // You can add your test scripts here
                sh 'echo "Running tests"ufw'
            }
        }
        
        stage('Deploy') {
            steps {
                    sh 'docker stop my-node-app'
                    sh 'docker rm my-node-app'
                 
                // Deploy the Docker container
                sh 'docker run --name my-node-app -d -p 3000:3000 -v 
/home1/volume:/app/data my-node-app'
            }
        }
    }
}
