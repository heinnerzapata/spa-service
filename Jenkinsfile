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
    }
}