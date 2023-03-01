pipeline {
    agent any;

    stages {
        stage ("Build and push Images") {
            steps {
                withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                    sh 'docker build -t tuanminh009/iot-fe:v1 .'
                    sh 'docker push -t tuanminh009/iot-fe:v1'
                }
            }
        }
    }
}