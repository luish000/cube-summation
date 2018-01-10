# Cube summation rappi

This is a solution for the hacker rank cube summation challenge

# Solution

To solve this problem was used a binary indexed tree. With a binary indexed tree we can perform in a table two basic operation in an algorithmic complexity of O(log(n)) these operations are:

1) update an index

2) calculate prefix sums

However this problem is not based in a table or array of 1D instead is based in a 3d matrix, even so the algorithmic complexity of this problem can be improve using a binary indexed treem the basic operations can be performed with complexity O ( 4 d log d n), where d is number of dimensions and n is the number of elements along each dimension

# How to run

1) use node 9.3.0 preferably
2) you need to have isntalled mongodb
3) you need that mongo db runs in localhost in the port 27017


#### Install dependencies
```sh
$ npm install
```

#### To run the tests
```sh
$ npm test
```
#### To run the server

```sh
$ npm start
```

# Refactorization

```javascript
async function postConfirm(ctx) {
   const { id: serviceId, driverId } = ctx.request.body
   let service = await Service.findOne({ id: serviceId })
   if (!service) return ctx.response.body = { error: 3 }
   switch(service.statusId) {
     case '1': {
       if (!service.driverId) {
         let opts = { available: 0 }
         const driver = await Driver.findOneAndUpdate({ id: driverId }, opts)
         opts = { driverId, cardId: driver.cardId, statusId: 2 }
         service = await Service.findOneAndUpdate({ id: serviceId }, opts)
         await sendPush(service.user.uuid, service.user.type, { serviceId })
         return ctx.response.body = { error: 0 }
       }
       return ctx.response.body = { error: 1 }
     }
     case '6': {
       return ctx.response.body = { error: 2 }
     }
   }
 }

 async function sendPush(uuid, type, data) {
   const push = await Push.make()
   const message = 'Tu servicio ha sido confirmado'
   if (!uuid) return
   if (type == '1') {
     push.ios(uuid, message, 1, 'how.wav', 'open', data)
   } else {
     push.ios(uuid, message, 1, 'default', 'open', data)
   }
}

```

# A clean code:

1. Readable
2. Semantic
3. Organized
4. Documented
5. Simple
6. Direct
7. Easy to change and maintain
8. Intuitive
9. Efficient

# Single responsibility principle

The single responsibility principle is a computer programming principle that states that every module or class should have responsibility over a single part of the functionality provided by the software, and that responsibility should be entirely encapsulated by the class. All its services should be narrowly aligned with that responsibility. Robert C. Martin expresses the principle as, "A class should have only one reason to change".
