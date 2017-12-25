pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building Dockerfile for taco-api'
        sh '''sudo docker build -t test_jenkins_docker .
'''
      }
    }
    stage('Tests') {
      steps {
        sh '''sudo docker run -d --name api_test test_jenkins_docker'''
        sh '''sudo docker exec api_test npm run test'''
      }
    }
  }
}
