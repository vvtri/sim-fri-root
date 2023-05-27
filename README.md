### Create image:

1. docker build -t auth-service .
2. docker build -t post-service .
3. docker build -t file-service .

### Github Submodule:

1. Add: git submodule add <url> file-service
2. Remove cache: git rm --cached file-service