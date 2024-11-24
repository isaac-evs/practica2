pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {

                checkout scm
            }
        }

        stage('Build') {
            steps {

                sh 'docker-compose build'
            }
        }

        stage('Run') {
            steps {

                sh 'docker-compose up -d'
            }
        }

        stage('Test') {
            steps {
                sh 'sleep 10'

                // backend
                sh 'curl -f http://localhost:8001/ || exit 1'
            }
        }

        stage('Teardown') {
            steps {
                sh 'docker-compose down'
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f'
        }
    }
}
