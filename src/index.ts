import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    // 1. Obtém o token do GitHub
    const githubToken = core.getInput('github-token', { required: true });

    // 2. Cria uma instância do cliente Octokit (para interagir com a API)
    const octokit = github.getOctokit(githubToken);

    // 3. Obtém os inputs da action
    const title = core.getInput('title', { required: true });
    const body = core.getInput('body', { required: false });
    const head = core.getInput('source-branch', { required: true });
    const base = core.getInput('dest-branch', { required: true });

    // 4. Obtém informações do repositório
    const { owner, repo } = github.context.repo;

    // 5. Cria o Pull Request
    const { data: pullRequest } = await octokit.rest.pulls.create({
      owner,
      repo,
      title,
      head,
      base,
      body
    });

    console.log(`Created Pull Request: ${pullRequest.html_url}`);

    // 6. Define o output para uso em actions futuras
    core.setOutput('pull-request-url', pullRequest.html_url);

  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();
