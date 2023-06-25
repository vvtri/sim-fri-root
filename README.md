### Create image:

1. docker build -t auth-service .
2. docker build -t post-service .
3. docker build -t file-service .

### Github Submodule:

1. Add: git submodule add <url> file-service
2. Remove cache: git rm --cached file-service

### Swagger:

1. http://localhost:5000/api/auth-service/swagger
2. http://localhost:5001/api/post-service/swagger
3. http://localhost:5002/api/file-service/swagger
4. http://localhost:5003/api/message-service/swagger
5. http://localhost:5004/api/friend-service/swagger
6. http://localhost:5005/api/noti-service/swagger

### Confluent: 6051071126+2@st.utc2.edu.vn

### K8s:

1. delete evicted pod: kubectl -n default delete pods --field-selector=status.phase=Failed
