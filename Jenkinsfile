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
                dir('./backend'){
                    sh 'sudo ../scripts/deliver.sh'
                }
                dir('./frontend'){
                    sh 'sudo ../scripts/deliver.sh'
                }
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                dir('./backend'){
                    sh 'sudo ../scripts/kill.sh'
                }
                dir('./frontend'){
                    sh 'sudo ../scripts/kill.sh'
                }
            }
        }
    }
}