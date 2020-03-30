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
                cd '. backend/'
                sh 'npm install'
                cd '. ../frontend/'
                sh 'npm install'
                cd '. ..'
            }
        }
        stage('Deliver') {
            steps {
                sh 'cd backend/'
                sh 'cd scripts/'
                sh 'deliver.sh'
                sh 'cd ..'
                sh 'cd ..'
                sh 'cd frontend/'
                sh 'cd scripts/'
                sh 'deliver.sh'
                sh 'cd ..'
                sh 'cd ..'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh 'cd backend/'
                sh 'cd scripts/'
                sh 'kill.sh'
                sh 'cd ..'
                sh 'cd ..'
                sh 'cd frontend/'
                sh 'cd scripts/'
                sh 'kill.sh'
                sh 'cd ..'
                sh 'cd ..'
            }
        }
    }
}