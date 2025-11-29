import * as core from '@actions/core';
import { ConfigManager } from './config';
import { GitHubService } from './services/github.service';

async function run(): Promise<void> {
  try {
    const inputs = ConfigManager.getInputs();

    const gitService = new GitHubService(inputs.githubToken);

    core.info(
      `Preparing to create PR from '${inputs.sourceBranch}' to '${inputs.destBranch}' in ${inputs.owner}/${inputs.repo}`
    );

    const prUrl = await gitService.createPullRequest(
      inputs.owner,
      inputs.repo,
      inputs.title,
      inputs.sourceBranch,
      inputs.destBranch,
      inputs.body
    );

    core.info(`Created Pull Request: ${prUrl}`);
    core.setOutput('pull-request-url', prUrl);

  } catch (error: unknown) {
    if (error instanceof Error) {
      core.setFailed(`Action failed with error: ${error.message}`);
    } else {
      core.setFailed('Action failed with unknown error.');
    }
  }
}

void run();
