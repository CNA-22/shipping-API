## Cloud Native Apps 22 Shipping Service

### This collection contains following requests:

### GET [https://cna22-shipping-service.azurewebsites.net/]
#### Returns a message:
```
{"message":"This is a Shipping Service","status":200}
```

### POST [https://cna22-shipping-service.azurewebsites.net/api/shipping/reduce?id=4&quantity=1&email=eklofcas@arcada.fi]
This is a post endpoint with query parameters <br/>
Url must contain:
* ID
* Quantity

#### Example URL:

https://cna22-shipping-service.azurewebsites.net/api/shipping/reduce?id=4&quantity=1&email=eklofcas@arcada.fi

#### Returns status 400 if id or quantity is equals null:
```
{
  "status": "400",
  "message": "Id or Quantity missing"
}
```


#### Returns status 400 if quantity is bellow 1: 
```
{
  "status": "400",
  "message": "Quantity must be a number over 0"
}
```
#### Returns 404 if Product ID could not be found in Inventory Service:
```
{
  "status": "404",
  "message": "ProductId not Found"
}
```
#### Returns 403 if Inventory Service does not have enough products to reduce:
```
{
  "status": "403",
  "message": "Not Enough Products to reduce"
}
```
#### Any other error will return 501:
```
{
  "status": "501",
  "message": "The server does not support the functionality required to fulfill the request"
}
```
#### A successful Api request will return the following:
```
{
  "message": "Shippment was succesfully sent",
  "status": 200,
  "shippingStatus": "Shippment was sent to eklofcas@arcada.fi",
  "quantity": "1",
  "id": "4"
}
```

### POST [https://cna22-shipping-service.azurewebsites.net/api/shipping/test]
This is a post endpoint with JSON body <br/>
JSON body must contain:
* ID
* Quantity
* ProductName

#### Example body:
```
content-type: application/json

{
    "id": "2",
    "quantity": "2",
    "email": "eklofcas@arcada.fi",
    "productName" : "Asus GeForce RTX 3080 ROG Strix - OC Edition -näytönohjain, 12GB GDDR6X"
}
```

#### Returns status 400 if id or quantity is equals null:
```
{
  "status": "400",
  "message": "Id or Quantity missing"
}
```

#### Returns status 400 if quantity is bellow 1: 
```
{
  "status": "400",
  "message": "Quantity must be a number over 0"
}
```
#### Returns 404 if Product ID could not be found in Inventory Service:
```
{
  "status": "404",
  "message": "ProductId not Found"
}
```
#### Returns 403 if Inventory Service does not have enough products to reduce:
```
{
  "status": "403",
  "message": "Not Enough Products to reduce"
}
```
#### Any other error will return 501:
```
{
  "status": "501",
  "message": "The server does not support the functionality required to fulfill the request"
}
```
#### A successful Api request will return the following:
```
{
  "message": "Shippment was succesfully sent",
  "status": 200,
  "shippingStatus": "Shippment was sent to eklofcas@arcada.fi",
  "emailSent": "true",
  "quantity": "2",
  "id": "2",
  "product": "Asus GeForce RTX 3080 ROG Strix - OC Edition -näytönohjain, 12GB GDDR6X"
}
```
