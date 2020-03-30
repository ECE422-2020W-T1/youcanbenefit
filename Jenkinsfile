pipeline {
    agent {
        docker {
            image 'node:13-alpine'
            args '-p 4200:4200 -u root:root'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                dir('./frontend'){
                    sh 'npm install'
                }
            }
        }
        stage('Deliver') {
            steps {
                sh 'chmod 744 -R scripts/'
                dir('./frontend'){
                    sh '../scripts/deliver.sh'
                }
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                dir('./frontend'){
                    sh '../scripts/kill.sh'
                }
            }
        }
    }
}