# Contributing to N8N Templates

Thank you for your interest in contributing to the N8N Templates collection! We welcome contributions from the community and are grateful for your support.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Template Guidelines](#template-guidelines)
- [Submission Process](#submission-process)
- [Development Setup](#development-setup)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand the standards we expect from all contributors.

## How to Contribute

### Types of Contributions

We welcome several types of contributions:

- 🔧 **New Templates**: Submit new n8n workflow templates
- 📖 **Documentation**: Improve existing documentation or add new guides
- 🐛 **Bug Fixes**: Fix issues in existing templates
- ✨ **Enhancements**: Improve existing templates with new features
- 🧪 **Tests**: Add or improve test coverage
- 💡 **Ideas**: Suggest new template ideas or improvements

### Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/N8N_TEMPLATES.git
   cd N8N_TEMPLATES
   ```
3. **Create a new branch**
   ```bash
   git checkout -b feature/your-template-name
   ```

## Template Guidelines

### Template Structure

Each template should follow this structure:

```
templates/category/template-name/
├── workflow.json           # n8n workflow export
├── README.md              # Template documentation
├── .env.example           # Environment variables template
├── credentials.example.json # Credential configuration
├── screenshots/           # Screenshots of the workflow
│   ├── overview.png
│   └── setup.png
└── test-data/            # Sample test data
    ├── input.json
    └── expected-output.json
```

### Template Categories

Organize templates into these categories:

- `api-integrations/` - REST API, GraphQL, Webhooks
- `ai-ml/` - AI, Machine Learning, LangChain
- `data-processing/` - ETL, Transformations, Databases
- `communication/` - Email, Slack, Teams, SMS
- `business-processes/` - CRM, Lead Gen, Invoicing
- `security-monitoring/` - Alerts, Logs, Health Checks
- `utilities/` - Helper workflows and tools

### Template Requirements

#### Mandatory Elements

- **Clear Documentation**: Comprehensive README with setup instructions
- **Error Handling**: Proper error management and retry logic
- **Security**: No hardcoded credentials or sensitive data
- **Testing**: Include test data and expected outputs
- **Screenshots**: Visual representation of the workflow

#### Quality Standards

- **Performance**: Optimized for efficiency
- **Maintainability**: Clean, well-organized workflow
- **Reusability**: Generic enough for multiple use cases
- **Documentation**: Clear, concise, and complete

## Submission Process

### Before Submitting

1. **Test Thoroughly**: Ensure your template works as expected
2. **Check Documentation**: Verify all documentation is complete
3. **Review Guidelines**: Confirm compliance with our standards
4. **Run Linting**: Use our code formatting tools

### Pull Request Process

1. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add [template-name] template"
   ```

2. **Push to Your Fork**
   ```bash
   git push origin feature/your-template-name
   ```

3. **Create Pull Request**
   - Use a descriptive title
   - Fill out the PR template completely
   - Reference any related issues

## Development Setup

### Local Environment

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Start n8n**
   ```bash
   npx n8n
   ```

3. **Access Editor**
   Open http://localhost:5678

## Testing

### Test Requirements

- All templates must include test data
- Tests should cover main use cases
- Error scenarios should be tested
- Performance benchmarks (if applicable)

## Documentation

### Writing Guidelines

- **Clear and Concise**: Use simple, direct language
- **Step-by-Step**: Provide detailed instructions
- **Visual Aids**: Include screenshots and diagrams
- **Examples**: Provide real-world examples

Thank you for contributing to the N8N Templates collection! 🚀
  starting on any changes here**
- [/packages/frontend/@n8n/design-system](/packages/design-system) - Vue frontend components
- [/packages/frontend/editor-ui](/packages/editor-ui) - Vue frontend workflow editor
- [/packages/node-dev](/packages/node-dev) - CLI to create new n8n-nodes
- [/packages/nodes-base](/packages/nodes-base) - Base n8n nodes
- [/packages/workflow](/packages/workflow) - Workflow code with interfaces which
  get used by front- & backend

## Development setup

If you want to change or extend n8n you have to make sure that all the needed
dependencies are installed and the packages get linked correctly. Here's a short guide on how that can be done:

### Dev Container

If you already have VS Code and Docker installed, you can click [here](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/n8n-io/n8n) to get started. Clicking these links will cause VS Code to automatically install the Dev Containers extension if needed, clone the source code into a container volume, and spin up a dev container for use.

### Requirements

#### Node.js

[Node.js](https://nodejs.org/en/) version 20.15 or newer is required for development purposes.

#### pnpm

[pnpm](https://pnpm.io/) version 9.1 or newer is required for development purposes. We recommend installing it with [corepack](#corepack).

##### pnpm workspaces

n8n is split up into different modules which are all in a single mono repository.
To facilitate the module management, [pnpm workspaces](https://pnpm.io/workspaces) are used.
This automatically sets up file-links between modules which depend on each other.

#### corepack

We recommend enabling [Node.js corepack](https://nodejs.org/docs/latest-v16.x/api/corepack.html) with `corepack enable`.

With Node.js v16.17 or newer, you can install the latest version of pnpm: `corepack prepare pnpm@latest --activate`. If you use an older version install at least version 9.15 of pnpm via: `corepack prepare pnpm@9.15.5 --activate`.

**IMPORTANT**: If you have installed Node.js via homebrew, you'll need to run `brew install corepack`, since homebrew explicitly removes `npm` and `corepack` from [the `node` formula](https://github.com/Homebrew/homebrew-core/blob/master/Formula/node.rb#L66).

**IMPORTANT**: If you are on windows, you'd need to run `corepack enable` and `corepack prepare pnpm --activate` in a terminal as an administrator.

#### Build tools

The packages which n8n uses depend on a few build tools:

Debian/Ubuntu:

```
apt-get install -y build-essential python
```

CentOS:

```
yum install gcc gcc-c++ make
```

Windows:

```
npm add -g windows-build-tools
```

MacOS:

No additional packages required.

### Actual n8n setup

> **IMPORTANT**: All the steps below have to get executed at least once to get the development setup up and running!

Now that everything n8n requires to run is installed, the actual n8n code can be
checked out and set up:

1. [Fork](https://guides.github.com/activities/forking/#fork) the n8n repository.

2. Clone your forked repository:

   ```
   git clone https://github.com/<your_github_username>/n8n.git
   ```

3. Go into repository folder:

   ```
   cd n8n
   ```

4. Add the original n8n repository as `upstream` to your forked repository:

   ```
   git remote add upstream https://github.com/n8n-io/n8n.git
   ```

5. Install all dependencies of all modules and link them together:

   ```
   pnpm install
   ```

6. Build all the code:
   ```
   pnpm build
   ```

### Start

To start n8n execute:

```
pnpm start
```

To start n8n with tunnel:

```
./packages/cli/bin/n8n start --tunnel
```

## Development cycle

While iterating on n8n modules code, you can run `pnpm dev`. It will then
automatically build your code, restart the backend and refresh the frontend
(editor-ui) on every change you make.

1. Start n8n in development mode:
   ```
   pnpm dev
   ```
1. Hack, hack, hack
1. Check if everything still runs in production mode:
   ```
   pnpm build
   pnpm start
   ```
1. Create tests
1. Run all [tests](#test-suite):
   ```
   pnpm test
   ```
1. Commit code and [create a pull request](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)

---

### Community PR Guidelines

#### **1. Change Request/Comment**

Please address the requested changes or provide feedback within 14 days. If there is no response or updates to the pull request during this time, it will be automatically closed. The PR can be reopened once the requested changes are applied.

#### **2. General Requirements**

- **Follow the Style Guide:**
  - Ensure your code adheres to n8n's coding standards and conventions (e.g., formatting, naming, indentation). Use linting tools where applicable.
- **TypeScript Compliance:**
  - Do not use `ts-ignore` .
  - Ensure code adheres to TypeScript rules.
- **Avoid Repetitive Code:**
  - Reuse existing components, parameters, and logic wherever possible instead of redefining or duplicating them.
  - For nodes: Use the same parameter across multiple operations rather than defining a new parameter for each operation (if applicable).
- **Testing Requirements:**
  - PRs **must include tests**:
    - Unit tests
    - Workflow tests for nodes (example [here](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Switch/V3/test))
    - UI tests (if applicable)
- **Typos:**
  - Use a spell-checking tool, such as [**Code Spell Checker**](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker), to avoid typos.

#### **3. PR Specific Requirements**

- **Small PRs Only:**
  - Focus on a single feature or fix per PR.
- **Naming Convention:**
  - Follow [n8n's PR Title Conventions](https://github.com/n8n-io/n8n/blob/master/.github/pull_request_title_conventions.md#L36).
- **New Nodes:**
  - PRs that introduce new nodes will be **auto-closed** unless they are explicitly requested by the n8n team and aligned with an agreed project scope. However, you can still explore [building your own nodes](https://docs.n8n.io/integrations/creating-nodes/) , as n8n offers the flexibility to create your own custom nodes.
- **Typo-Only PRs:**
  - Typos are not sufficient justification for a PR and will be rejected.

#### **4. Workflow Summary for Non-Compliant PRs**

- **No Tests:** If tests are not provided, the PR will be auto-closed after **14 days**.
- **Non-Small PRs:** Large or multifaceted PRs will be returned for segmentation.
- **New Nodes/Typo PRs:** Automatically rejected if not aligned with project scope or guidelines.

---

### Test suite

#### Unit tests

Unit tests can be started via:

```
pnpm test
```

If that gets executed in one of the package folders it will only run the tests
of this package. If it gets executed in the n8n-root folder it will run all
tests of all packages.

#### E2E tests

⚠️ You have to run `pnpm cypress:install` to install cypress before running the tests for the first time and to update cypress.

E2E tests can be started via one of the following commands:

- `pnpm test:e2e:ui`: Start n8n and run e2e tests interactively using built UI code. Does not react to code changes (i.e. runs `pnpm start` and `cypress open`)
- `pnpm test:e2e:dev`: Start n8n in development mode and run e2e tests interactively. Reacts to code changes (i.e. runs `pnpm dev` and `cypress open`)
- `pnpm test:e2e:all`: Start n8n and run e2e tests headless (i.e. runs `pnpm start` and `cypress run --headless`)

⚠️ Remember to stop your dev server before. Otherwise port binding will fail.

## Releasing

To start a release, trigger [this workflow](https://github.com/n8n-io/n8n/actions/workflows/release-create-pr.yml) with the SemVer release type, and select a branch to cut this release from. This workflow will then:

1. Bump versions of packages that have changed or have dependencies that have changed
2. Update the Changelog
3. Create a new branch called `release/${VERSION}`, and
4. Create a new pull-request to track any further changes that need to be included in this release

Once ready to release, simply merge the pull-request.
This triggers [another workflow](https://github.com/n8n-io/n8n/actions/workflows/release-publish.yml), that will:

1. Build and publish the packages that have a new version in this release
2. Create a new tag, and GitHub release from squashed release commit
3. Merge the squashed release commit back into `master`

## Create custom nodes

Learn about [building nodes](https://docs.n8n.io/integrations/creating-nodes/) to create custom nodes for n8n. You can create community nodes and make them available using [npm](https://www.npmjs.com/).

## Extend documentation

The repository for the n8n documentation on [docs.n8n.io](https://docs.n8n.io) can be found [here](https://github.com/n8n-io/n8n-docs).

## Contribute workflow templates

You can submit your workflows to n8n's template library.

n8n is working on a creator program, and developing a marketplace of templates. This is an ongoing project, and details are likely to change.

Refer to [n8n Creator hub](https://www.notion.so/n8n/n8n-Creator-hub-7bd2cbe0fce0449198ecb23ff4a2f76f) for information on how to submit templates and become a creator.

## Contributor License Agreement

That we do not have any potential problems later it is sadly necessary to sign a [Contributor License Agreement](CONTRIBUTOR_LICENSE_AGREEMENT.md). That can be done literally with the push of a button.

We used the most simple one that exists. It is from [Indie Open Source](https://indieopensource.com/forms/cla) which uses plain English and is literally only a few lines long.

Once a pull request is opened, an automated bot will promptly leave a comment requesting the agreement to be signed. The pull request can only be merged once the signature is obtained.
