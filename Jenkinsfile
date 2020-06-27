pipeline {
    agent {
      dockerfile {
        filename 'Dockerfile.dev'
      }
    }
    stages { 
        stage('Example') {
            steps {
                echo 'Hello World'
            }
        }
    }
}