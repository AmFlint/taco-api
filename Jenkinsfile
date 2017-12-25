pipeline {
  agent any
  stages {
    stage('Build') {
      agent {
        dockerfile {
          filename 'Dockerfile'
        }
        
      }
      steps {
        echo 'Building Dockerfile for taco-api'
        sh '''sudo docker build -t test_jenkins_docker .
'''
      }
    }
    stage('Tests') {
      steps {
        sh '''sudo docker run --name api_test test_jenkins_docker
sudo docker exec api_test npm run test'''
      }
    }
  }
}