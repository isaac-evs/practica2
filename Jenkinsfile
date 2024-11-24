pipeline {
    agent any

    environment {
        // Adjust the PATH as needed for your system
        PATH = "/usr/local/bin:/usr/bin:/bin:${env.PATH}"
    }

    stages {
        stage('Verify Docker Access') {
            steps {
                sh 'which docker || echo "Docker not found"'
                sh 'docker --version || echo "Docker version not available"'
                sh 'which docker-compose || echo "Docker Compose not found"'
                sh 'docker-compose --version || echo "Docker Compose version not available"'
            }
        }

        stage('Checkout') {
            steps {
                // Clone your repository
                checkout scm
            }
        }

        stage('Build') {
            steps {
                // Build Docker images
                sh 'docker-compose build'
            }
        }

        stage('Run') {
            steps {
                // Start services in detached mode
                sh 'docker-compose up -d'
            }
        }

        stage('Test') {
            steps {
                // Wait for services to be ready
                sh 'sleep 10'

                // Simple test to check if backend is responding
                sh 'curl -f http://localhost:8001/ || exit 1'

                // (Optional) Add more tests as needed
            }
        }

        stage('Teardown') {
            steps {
                // Stop and remove services
                sh 'docker-compose down'
            }
        }
    }

    post {
        always {
            // Clean up dangling images and containers
            sh 'docker system prune -f'
        }
    }
}
