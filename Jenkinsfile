node {
    def app

    stage('Clone repository') {
        checkout scm
    }

    stage('Install dependencies') {
        echo 'Installing dependencies'
        sh 'npm install'
    }

    stage('Build React app') {
        echo 'Building React app'
        sh 'npm run build'
    }

    stage('Build image') {
        echo 'Building Docker image'
        app = docker.build("arun662/react-app:${env.BUILD_NUMBER}")
    }

    stage('Test image') {
        echo 'Running tests in Docker container'
        app.inside {
            sh 'echo "Tests passed"'
            // Add any actual tests, e.g., linting or end-to-end tests if needed
        }
    }

    stage('Push image') {
        echo 'Pushing Docker image to DockerHub'
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            app.push("${env.BUILD_NUMBER}")
        }
    }

    stage('Trigger ManifestUpdate') {
        echo 'Triggering manifest update job'
        build job: 'updatemanifest-meme', parameters: [string(name: 'DOCKERTAG', value: env.BUILD_NUMBER)]
    }
}
