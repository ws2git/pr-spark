import * as github from '@actions/github';

type OctokitClient = ReturnType<typeof github.getOctokit>;

/**
 * GitHubService
 */
export class GitHubService {
  private octokit: OctokitClient;

  constructor(token: string) {
    this.octokit = github.getOctokit(token);
  }

  /**
   * createPullRequest
   */
  async createPullRequest(owner: string, repo: string, title: string, head: string, base: string, body?: string): Promise<string> {
    const { data } = await this.octokit.rest.pulls.create({
      owner,
      repo,
      title,
      head,
      base,
      body,
    });

    return data.html_url;
  }
}
