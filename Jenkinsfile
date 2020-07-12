pipeline {
    agent {
      dockerfile {
        filename 'Dockerfile.dev' 
      } 
    }
    stages { 
        // stage('TEST') {
        //     steps {
        //         sh "npm run test:coverage"
        //     }
        // }
        stage ('CONTINUOUS DEPLOYMENT') {
           steps {
            build job: 'cluster-cd-pipeline', parameters: [[$class: 'StringParameterValue', name: 'SERVICE', value: 'spa-service'], [$class: 'StringParameterValue', name: 'VERSION', value: 'develop']]
           }
        }
    }
}