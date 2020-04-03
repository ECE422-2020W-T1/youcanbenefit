pipeline {
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:10-alpine'
                }
            }
            steps {
                dir('./frontend'){
                    sh 'npm install'
                }
            }
        }
        stage('Build2') {
            agent none
            steps {
                sh 'docker ps'
            }  
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