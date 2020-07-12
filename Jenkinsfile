pipeline {
    agent any
    
    stages { 
        stage('BUILD DOCKET TEST') {
          steps {
              sh 'docker build -t react-test -f Dockerfile.test --no-cache .'
          }
        }
        stage('DOCKER TEST') {
          steps {
              sh 'docker run --rm react-test'
          }
        }
        stage('CLEAN DOCKER TEST') {
          steps {
              sh 'docker rmi react-test'
          }
        }
        stage ('CONTINUOUS DEPLOYMENT') {
           steps {
            build job: 'cluster-cd-pipeline', parameters: [[$class: 'StringParameterValue', name: 'SERVICE', value: 'spa-service'], [$class: 'StringParameterValue', name: 'VERSION', value: 'develop']]
           }
        }
    }
}