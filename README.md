## Cloud Native Apps 22 Shipping Service

### This collection contains following requests:

### GET
Endpoint: https://cna22-shipping-service.azurewebsites.net/ 
#### Returns a message:
```
{"message":"This is a Shipping Service","status":200}
```

### POST
This is a post endpoint with query parameters <br/>
Endpoint: https://cna22-shipping-service.azurewebsites.net/api/shipping/reduce <br/>
A valid bearer token from user service is required [https://github.com/CNA-22/user-service/blob/main/README.md]<br/>
Url must contain:
* ID
* Quantity
* Email



#### Example URL:

https://cna22-shipping-service.azurewebsites.net/api/shipping/reduce?id=1&quantity=1&email=jepulis.jepjepjep@gmail.com <br/><br/>
Authorization: Bearer token  

#### Returns status 401 if no bearer token is provided

```
{
  "auth": false,
  "message": "No token provided."
}
```
#### Returns status 500 if token is failed to authenticate

```
{
  "auth": false,
  "message": "Failed to authenticate token."
}
```
#### Returns status 400 if id or quantity is equals null:
```
{
  "status": 400,
  "message": "Id, Quantity or Email is missing"
}
```


#### Returns status 400 if quantity is bellow 1: 
```
{
  "status": "400",
  "message": "Quantity must be a number over 0"
}
```
#### Returns status 404 if Product ID could not be found in Inventory Service:
```
{
  "status": "404",
  "message": "ProductId not Found"
}
```
#### Returns status 403 if Inventory Service does not have enough products to reduce:
```
{
  "status": "403",
  "message": "Not Enough Products to reduce"
}
```
#### Any other error will return status 501:
```
{
  "status": "501",
  "message": "The server does not support the functionality required to fulfill the request"
}
```
#### A successful Api request will return the following:
```
{
  "message": "Package was succesfully shipped and email confirmation was sent to jepulis.jepjepjep@gmail.com",
  "status": 200,
  "shippingStatus": "Shippment was sent to jepulis.jepjepjep@gmail.com",
  "emailSent": true,
  "quantity": "10",
  "id": "1000020000123"
}
```

### POST
This is a post endpoint with JSON body <br/>
Endpoint: https://cna22-shipping-service.azurewebsites.net/api/shipping/reduce/product <br/>
A valid token from user service is required [https://github.com/CNA-22/user-service/blob/main/README.md]<br/>
JSON body must contain:
* ID
* Quantity
* Email

#### Example body:
```
content-type: application/json
Authorization: Bearer token 

{
    "id": "1000020000123",
    "quantity": "10",
    "email": "jepulis.jepjepjep@gmail.com"
}
```
#### Returns status 401 if no bearer token is provided

```
{
  "auth": false,
  "message": "No token provided."
}
```
#### Returns status 500 if token is failed to authenticate

```
{
  "auth": false,
  "message": "Failed to authenticate token."
}

```

#### Returns status 400 if id, quantity or productName is equals null:
```
{
  "status": 400,
  "message": "Id, Quantity or Email is missing"
}
```

#### Returns status 400 if quantity is bellow 1: 
```
{
  "status": "400",
  "message": "Quantity must be a number over 0"
}
```
#### Returns status 404 if Product ID could not be found in Inventory Service:
```
{
  "status": "404",
  "message": "ProductId not Found"
}
```
#### Returns status 403 if Inventory Service does not have enough products to reduce:
```
{
  "status": "403",
  "message": "Not Enough Products to reduce"
}
```
#### Any other error will return status 501:
```
{
  "status": "501",
  "message": "The server does not support the functionality required to fulfill the request"
}
```
#### A successful Api request will return the following:
```
{
  "message": "Package was succesfully shipped and email confirmation was sent to jepulis.jepjepjep@gmail.com",
  "status": 200,
  "shippingStatus": "Shippment was sent to jepulis.jepjepjep@gmail.com",
  "emailSent": true,
  "quantity": "10",
  "id": "1000020000123"
}
```
