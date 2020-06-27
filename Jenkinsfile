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
            build job: 'vol7er-services-pipeline', parameters: [[$class: 'StringParameterValue', name: 'SERVICE', value: 'cluster-cd-pipeline'], [$class: 'StringParameterValue', name: 'VERSION', value: 'develop']]
           }
        }
    }
}