import * as core from '@actions/core';

export interface ActionInputs {
  readonly owner: string;
  readonly repo: string;
  readonly githubToken: string;
  readonly title: string;
  readonly body?: string;
  readonly sourceBranch: string;
  readonly destBranch: string;
}

export class ConfigManager {
  static getInputs(): ActionInputs {
    const bodyInput = core.getInput('body', { required: false })?.trim();

    const inputs: ActionInputs = {
      owner: core.getInput('owner', { required: true }).trim(),
      repo: core.getInput('repo', { required: true }).trim(),
      githubToken: core.getInput('github-token', { required: true }).trim(),
      title: core.getInput('title', { required: true }).trim(),
      body: bodyInput || undefined,
      sourceBranch: core.getInput('source-branch', { required: true }).trim(),
      destBranch: core.getInput('dest-branch', { required: true }).trim(),
    };

    this.validate(inputs);
    return inputs;
  }

  private static validate(inputs: ActionInputs): void {
    const { owner, repo, githubToken, title, sourceBranch, destBranch } = inputs;

    // Validation of required fields (body is optional)
    if (!owner || !repo || !githubToken || !title || !sourceBranch || !destBranch) {
      throw new Error('All required inputs (owner, repo, github-token, title, source-branch, dest-branch) must be provided and cannot be empty.');
    }

    if (sourceBranch === destBranch) {
      throw new Error(`The source branch ('${sourceBranch}') and destination branch must be different.`);
    }

    const branchRegex = /^[a-zA-Z0-9-_./]+$/;
    if (!branchRegex.test(sourceBranch) || !branchRegex.test(destBranch)) {
       // health check
       throw new Error(`Invalid branch name format detected.`);
    }
  }
}
