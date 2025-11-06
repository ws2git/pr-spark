import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
  try {
    // Inputs
    const githubToken = core.getInput('github-token', { required: true });
    const title = core.getInput('title', { required: true }).trim();
    const body = core.getInput('body', { required: false })?.trim() || undefined;
    const sourceBranch = core.getInput('source-branch', { required: true }).trim();
    const destBranch = core.getInput('dest-branch', { required: true }).trim();

    // Repo context
    const { owner, repo } = github.context.repo;

    const octokit = github.getOctokit(githubToken);

    core.info(`Creating pull request from '${sourceBranch}' to '${destBranch}' in ${owner}/${repo}`);

    // Create PR
    const { data: pullRequest } = await octokit.rest.pulls.create({
      owner,
      repo,
      title,
      head: sourceBranch,
      base: destBranch,
      body,
    });

    core.info(`Created Pull Request: ${pullRequest.html_url}`);
    core.setOutput('pull-request-url', pullRequest.html_url);

  } catch (error: unknown) {
    if (error instanceof Error) {
      core.setFailed(`Action failed with error: ${error.message}`);
    } else {
      core.setFailed('Action failed with unknown error.');
    }
  }
}

void run();
