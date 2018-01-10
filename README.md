# Cube summation rappi

This is a solution for the hacker rank cube summation challenge

# Solution

To solve this problem was used a binary indexed tree. With a binary indexed tree we can perform in a table two basic operation in an algorithmic complexity of O(log(n)) these operations are:

1) update an index

2) calculate prefix sums

However this problem is not based in a table or array of 1D instead is based in a 3d matrix, even so the algorithmic complexity of this problem can be improve using a binary indexed treem the basic operations can be performed with complexity O ( 4 d log d n), where d is number of dimensions and n is the number of elements along each dimension

# How to run

1) use node 9.3.0 preferably
2) you need to have installed mongodb
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
