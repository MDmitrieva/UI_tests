import groovy.json.JsonSlurper

@Library('shared-functions@master') _

def failed_tests = 'null'
def passed_tests = 'null'
def tagged_failed_tests_msg = null
def tagged_passed_tests_msg = null

pipeline {
    agent {
        docker {
            image 'registry.infotech.team/other/codeceptjs:java'
            args '-u root \
            -v /home/jenkins/.ssh:/root/.ssh:ro \
            -v /home/jenkins/tools:/home/jenkins/tools:ro \
            -v /home/jenkins/workspace:/home/jenkins/workspace:ro \
            -v /var/run/docker.sock:/var/run/docker.sock:ro \
            -v /usr/bin/docker:/usr/bin/docker:ro'
        }
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    parameters {
        string(defaultValue: "master", description: 'Tests branch?', name: 'TESTS_BRANCH')
        choice(choices: 'dev\ndemo', description: 'Tests environment', name: 'STAND')
    }

    stages {
        stage('Run UI tests') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                        git url: 'ssh://git@bitbucket.infotech.team:7999/tt/planner-ui-tests.git', branch: '${TESTS_BRANCH}'
                        sh "npm install"
                         withAllureUpload(serverId: 'qa.infotech.team', projectId: '2', results: [[path: 'output']]) {
                        sh "npm test"
                        }
                }
            }
        }
    }
    post {
        always {
            sh "chmod -R 777 output"
                allure results: [[path: 'output']]
                script {
                    def json = readFile(file: 'allure-report/data/timeline.json')
                    def data = new JsonSlurper().parseText(json)
                    failed_tests = data.children.count { tests -> tests.status == 'failed' }
                    passed_tests = data.children.count { tests2 -> tests2.status == 'passed' }
                    // add additional message for tests with linked issues
                    def tests_with_tags = data.children.findAll { it.name =~ /@(\w+-\d+)/ }
                    def failed_tagged_tests = tests_with_tags.findAll { it.status == 'failed' }
                    def passed_tagged_tests = tests_with_tags.findAll { it.status == 'passed' }
                    if (failed_tagged_tests) {
                        tagged_failed_tests_msg = '\nThese cases might fail because bugs:\n' + failed_tagged_tests.collect { test -> test.name + ' - https://jira.infotech.team/browse/' + (test.name =~ /@(\w+-\d+)/)[0][1] }.join('\n')
                    }
                    if (passed_tagged_tests) {
                        tagged_passed_tests_msg = '\nThese cases ok. Maybe you should close bugs and remove tag from tests:\n' + passed_tagged_tests.collect { test -> test.name + ' - https://jira.infotech.team/browse/' + (test.name =~ /@(\w+-\d+)/)[0][1] }.join('\n')
                    }

                    def failedTests = data.children.findAll { t -> t.status == 'failed' }
                    if (failedTests) {
                        failedTestsName = failedTests.collect {t -> t.name}.join('\n')
                    }
                }
            sh 'rm -Rf *'
        }
        success {
            script {
                telegramSend('-352117123', "Build URL: ${env.BUILD_URL}allure\nJob: ${env.JOB_NAME}\nResult: ${currentBuild.currentResult}\u2705 \nPassed: ${passed_tests}.${tagged_passed_tests_msg ?: ''}")
            }
        }
        failure {
            script {
                telegramSend('-352117123', "Build URL: ${env.BUILD_URL}allure\nJob: ${env.JOB_NAME}\nResult: ${currentBuild.currentResult}\u274c \nPassed: ${passed_tests}.${tagged_passed_tests_msg ?: ''}\nFailed: ${failed_tests}\n${failedTestsName}\n${tagged_failed_tests_msg ?: ''}")
            }
        }
        aborted {
            script {
                telegramSend('-352117123', "Build URL: ${env.BUILD_URL}allure\nJob: ${env.JOB_NAME}\nResult: ${currentBuild.currentResult}\u274c \nPassed: ${passed_tests} Failed: ${failed_tests}")
            }
        }
    }
}