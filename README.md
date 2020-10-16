# Github Actions POC
Implementation using Github workflows and ESLint for code quality related merge blocking in the design system.

## Workflow 
Github workflows are created using `.yml` configuration files. These configuration files live within the `.github/workflows` directory. 

### Setting up Actions
To conduct linting actions within the Github workflow you need configurations in two locations. 

### ESLint Configuration
ESLint is configured as a normal package, per the requirements of the project. This includes:

- dependant `npm` packages (installed as dev dependancies)
- `npm` task to run linting within a CLI environment
- .eslintrc.js configuration for linting rules and plugins

### Actions Configuration
The configuration for the Actions workflow is found in the `main.yml` file within the `.github/workflows` directory. 

Actions are run in standalone containers and can be conducted during any point of the Github workflow (example: on push, pull, pull request, etc). The current test workflow is set up to run on `push` and `pull_request`. 

When an action triggers the workflow, the processes defined in the `.yml` configuration is run. The current example configuration has a few steps: 

1. Cache node modules
2. Install node dependancies (if there is no cache)
3. Run linting task from our `package.json`

```
on: [pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Cache node modules
      uses: actions/cache@v2
      env:
        cache-name: cache-node-modules
      with:
        # npm cache files are stored in `~/.npm` on Linux/macOS
        path: ~/.npm
        key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
        restore-keys: |
          ${{ runner.os }}-build-${{ env.cache-name }}-
          ${{ runner.os }}-build-
          ${{ runner.os }}-

    - name: Install Dependencies
      run: npm install

    - name: Lint
      run: npm run lint
```

## Merge Blocking

Implementing merge blocking is done through 'Branch Protection' within the repository. This can be configured per branch, and can have specific Actions applied to what you want to be merge blocking. 

## Additional POC Options

Integrate the Github SuperLinter to do codebase linting https://github.com/github/super-linter#supported-linters

