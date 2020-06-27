pipeline {
    agent {
      dockerfile {
        filename 'Dockerfile.dev' 
      } 
    }
    stages { 
        stage('TEST') {
            steps {
                sh "npm run test:coverage"
            }
        }
        stage ('CONTINUOUS DEPLOYMENT') {
           steps {
            build job: 'vol7er-services-pipeline', parameters: [[$class: 'StringParameterValue', name: 'SERVICE', value: 'vol7er-spa'], [$class: 'StringParameterValue', name: 'VERSION', value: 'develop']]
           }
        }
    }
}