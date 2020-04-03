pipeline {
    agent {
        docker {
            image 'node:10-alpine'
            args '-p 3000:4200'
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

        node {
            checkout scm
            sh "docker ps"
        }
        // stage('Deliver') {
        //     steps {
        //         dir('./frontend'){
        //             sh '../scripts/deliver.sh'
        //         }
        //         input message: 'Finished using the web site? (Click "Proceed" to continue)'
        //         dir('./frontend'){
        //             sh '../scripts/kill.sh'
        //         }
        //     }
        // }
    }
}