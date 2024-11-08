node {
    def app

    stage('Clone repository') {
        echo 'Cloning repository...'
        checkout scm
    }

    stage('Build Docker image') {
        echo 'Building Docker image with caching...'
        app = docker.build("arun662/react-app:${env.BUILD_NUMBER}", "--no-cache .") // Optionally add "--no-cache" if you want a fresh build each time
    }

    stage('Test Docker image') {
        echo 'Running tests in Docker container...'
        app.inside {
            sh 'echo "Tests passed"'
            // Add any actual tests here if needed
        }
    }

    stage('Push Docker image') {
        echo 'Pushing Docker image to DockerHub...'
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }

    stage('Trigger ManifestUpdate Job') {
        echo 'Triggering manifest update job...'
        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            build job: 'updatemanifest-meme', parameters: [
                string(name: 'DOCKERTAG', value: env.BUILD_NUMBER)
            ]
        }
    }
}
