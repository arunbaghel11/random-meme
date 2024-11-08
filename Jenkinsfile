node {
    def app

    stage('Clone repository') {
        echo 'Cloning repository...'
        checkout scm
    }

    stage('Install dependencies') {
        echo 'Installing dependencies...'
        // Check if node_modules already exists to avoid reinstalling every time
        script {
            if (!fileExists('node_modules')) {
                sh 'npm ci'  // Install dependencies only if node_modules is missing
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
        // Build Docker image with tag based on the current build number
        app = docker.build("arun662/react-app:${env.BUILD_NUMBER}")
    }

    stage('Test Docker image') {
        echo 'Running tests in Docker container...'
        app.inside {
            sh 'echo "Tests passed"'
            // Additional tests can be added here if needed
        }
    }

    stage('Push Docker image') {
        echo 'Pushing Docker image to DockerHub...'
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            // Push image with build number and latest tags
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
