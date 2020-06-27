pipeline {
    agent {
      dockerfile {
        filename 'Dockerfile.dev'
        dir 'build'
        label 'vol7er-spa-test'
        additionalBuildArgs  '--build-arg version=1.0.2'
        args '-v /tmp:/tmp'
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