const core = require('@actions/core');
const github = require('@actions/github');

const file = require(`${core.getInput('path')}/package.json`);

try {
    for (const [key, value] of Object.entries(file.dependencies)) {
        if (key.startsWith("@actions/") && value.includes('-rc')) {
            core.setFailed(`"${key}": "${value}"`);
            return;
        }
    }
} catch (error) {
    core.setFailed(error.message);
}