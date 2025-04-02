## Create new Todo
# Request:
URL: http://localhost:3000/api/todos
Method: POST
Headers: Content-Type: application/json
Body:
{
  "title": "Task 1",
  "description": "This is task 1",
  "completed": false
}
# Response:
201 Created
{
    "title": "Task 1",
    "description": "This is task 1",
    "completed": false,
    "_id": "67bd93d9ce8031819db3a1ce",
    "createdAt": "2025-02-25T09:56:41.968Z",
    "updatedAt": "2025-02-25T09:56:41.968Z",
    "__v": 0
}


## Read all Todo
# Request:
URL: http://localhost:3000/api/todos
Method: GET
Headers: Accept: application/json
# Response:
200 OK
[
    {
        "_id": "67bd93d9ce8031819db3a1ce",
        "title": "Task 1",
        "description": "This is task 1",
        "completed": false,
        "createdAt": "2025-02-25T09:56:41.968Z",
        "updatedAt": "2025-02-25T09:56:41.968Z",
        "__v": 0
    }
]

## Update Todo
# Request:
URL: http://localhost:3000/api/todos/67bd93d9ce8031819db3a1ce
Method: PUT
Headers: Content-Type: application/json and Accept: application/json
Body:
{
  "title": "Updated Task 1",
  "description": "This is updated task 1",
  "completed": true
}
# Response:
200 OK
{
    "_id": "67bd93d9ce8031819db3a1ce",
    "title": "Updated Task 1",
    "description": "This is updated task 1",
    "completed": true,
    "createdAt": "2025-02-25T09:56:41.968Z",
    "updatedAt": "2025-02-25T10:07:52.782Z",
    "__v": 0
}


## Delete Todo
# Request:
URL: http://localhost:3000/api/todos/67bd93d9ce8031819db3a1ce
Method: DELETE
Headers: Accept: application/json
# Response:
200 OK
{
    "message": "Todo deleted successfully"
}

