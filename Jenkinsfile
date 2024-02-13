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
                     bat 'docker ps -a | Select-String -Pattern "my-node-app" | ForEach-Object { docker stop $_.Matches.Groups[0].Value }'
                    bat 'docker ps -a | Select-String -Pattern "my-node-app" | ForEach-Object { docker rm $_.Matches.Groups[0].Value }'
                // Deploy the Docker container
                bat 'docker run -d -p 3000:3000 my-node-app'
            }
        }
    }
}
