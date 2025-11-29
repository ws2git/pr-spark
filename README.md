# PR Spark

Automatically create pull requests between branches using GitHub's API for workflows and automation.
This GitHub Action is useful for teams who want to automate PR creation in CI/CD pipelines, branch synchronization, or cross-repository workflows.

---

## ✨ Features

- **Automated PR Creation**: Create pull requests programmatically between any branches
- **Cross-Repository Support**: Create PRs in different repositories within the same organization
- **Flexible Configuration**: Customizable PR title, body, source, and destination branches
- **Powered by GitHub API**: Uses official GitHub REST API for reliable PR management
- **Organization-wide**: Can be used across any repository with proper permissions

## 🛠️ Usage

### 1. **Prerequisites**

- Your workflow **must pass the necessary inputs** to this action
- The GitHub token must have `repo` permissions to create pull requests
- Source and destination branches must exist in the target repository

### 2. **Example Workflow Integration**

```yaml
name: Quick PR Spark Test

on: [workflow_dispatch]

jobs:
  quick-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Create test PR
        uses: ws2git/pr-spark@v3
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          owner: ${{ github.repository_owner }}
          repo: ${{ github.event.repository.name }}
          title: "Quick Test PR"
          body: "Testing PR Spark action functionality"
          source-branch: "develop"  # Adjust according to your branches.
          dest-branch: "main" # Adjust according to your branches.
```

## 📥 Inputs

| Name | Required | Description |
|---|---|---|
| `github-token` | Yes | GitHub token for authentication (requires repo scope) |
| `owner` | Yes | The owner/organization of the target repository |
| `repo` | Yes | The name of the target repository |
| `title` | Yes | Pull Request title |
| `body` | No | Pull Request body/description |
| `source-branch` | Yes | The branch from which the PR will be opened |
| `dest-branch` | Yes | The PR target branch |

## 📤 Outputs

| Name | Description |
|---|---|
| `pull-request-url` | URL of the created pull request |

## ⚙️ How It Works

This action uses the GitHub REST API via Octokit to create pull requests. It validates all inputs, checks for branch conflicts, and creates the PR with the specified parameters.

**Core logic:**
```typescript
// Creates PR using GitHub API
await octokit.rest.pulls.create({
  owner,
  repo,
  title,
  head: sourceBranch,
  base: destBranch,
  body
});
```

If source and destination branches are the same, or if required parameters are missing, the action fails with descriptive error messages.

## 🛡️ Security and Authentication

This Action uses the **GitHub REST API** with a provided token for authentication.

**Recommended**: For operations within the current repository, use the default **`${{ secrets.GITHUB_TOKEN }}`**:

```yaml
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
```

**Cross-Repository Operations**: For creating PRs in different repositories, use a **PAT** (Personal Access Token) with `repo` scope stored as a secret:

```yaml
with:
  github-token: ${{ secrets.MY_PAT_WITH_REPO_SCOPE }}
```

**Never expose tokens in plain text.**

## 📌 Notes

⚠️ **Important Considerations:**

- The source and destination branches must exist in the target repository
- For cross-repository PRs, the token must have access to both source and target repositories
- If a PR between the same branches already exists, the action will fail
- Branch names are validated for proper Git format

## 🔗 Related Documentation

- [GitHub REST API - Pull Requests](https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#create-a-pull-request)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Octokit.js Library](https://github.com/octokit/octokit.js)

## ❓ Support

If you find a bug or have a question, [open an issue](https://github.com/ws2git/pr-spark/issues).
