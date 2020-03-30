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
                dir('./backend'){
                    sh 'npm install'
                }
                dir('./frontend'){
                    sh 'npm install'
                }
            }
        }
        stage('Deliver') {
            steps {
                sh 'chmod 744 -R scripts/'
                dir('./backend'){
                    sh '../scripts/deliver.sh'
                }
                dir('./frontend'){
                    sh '../scripts/deliver.sh'
                }
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                dir('./backend'){
                    sh '../scripts/kill.sh'
                }
                dir('./frontend'){
                    sh '../scripts/kill.sh'
                }
            }
        }
    }
}