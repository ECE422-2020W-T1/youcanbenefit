pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                dir('./frontend'){
                    // sh 'npm install'
                    sh 'docker ps' 
                }
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
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
