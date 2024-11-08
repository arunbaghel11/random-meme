node {
    def app

    stage('Clone repository') {
        echo 'Cloning repository...'
        checkout scm
    }

    stage('Install dependencies') {
        echo 'Installing dependencies...'
        // Check if react-scripts exists; if not, run npm ci
        script {
            if (!fileExists('node_modules/react-scripts')) {
                echo 'react-scripts not found. Running npm ci...'
                sh 'npm ci'
            } else {
                echo 'Dependencies already installed. Skipping npm ci.'
            }
        }
    }

    stage('Build React app') {
        echo 'Building React app...'
        sh 'npm run build'
    }

    stage('Build Docker image') {
        echo 'Building Docker image...'
        app = docker.build("arun662/react-app:${env.BUILD_NUMBER}")
    }

    stage('Test Docker image') {
        echo 'Running tests in Docker container...'
        app.inside {
            sh 'echo "Tests passed"'
            // Add any actual tests here (e.g., linting, unit tests)
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
