pipeline {
    agent {
        docker {
            image 'docker:dind'
            args '-p 3000:4200'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Deliver') {
            steps {
                sh 'docker-compose up'
            }
        }
    }
}