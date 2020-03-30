pipeline {
    agent {
        docker {
            image 'node:13-alpine'
            args '-p 4200:4200'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'cd backend/'
                sh 'npm install'
                sh 'cd ..'
                sh 'cd frontend/'
                sh 'npm install'
                sh 'cd ..'
            }
        }
        stage('Deliver') {
            steps {
                sh 'cd backend/'
                sh './scripts/deliver.sh'
                sh 'cd ..'
                sh 'cd frontend/'
                sh './scripts/deliver.sh'
                sh 'cd ..'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh 'cd backend/'
                sh './jenkins/scripts/kill.sh'
                sh 'cd ..'
                sh 'cd frontend/'
                sh './jenkins/scripts/kill.sh'
                sh 'cd ..'
            }
        }
    }
}