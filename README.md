# node-sha256


## Info


https://node-sha256.grannec.com/v1/healthcheck -> should auto restart if service crashes (haven't tested fully)

## sha256

Post '{"message":"something"}' content-type application/json to https://node-sha256.grannec.com/v1/messages - returns digest with sha256 value

Get https://node-sha256.grannec.com/v1/messages/:shaValue - gets back the message, 404 if none exsists

### Bottleneck

Right now it really only works with one service instance. It's using a k8s deployment so scaling horizontally would be simple but would need to move the inmem cache to redis or the likes

## 2 Items that get closest to value set
Get https://node-sha256.grannec.com/v1/items/:value - if you set value to '1500' it will return the closest under matching pair from the itemOptions map in server.js

-- diff  items are hard coded, should need to be handle in the api/whatever options, however would need to know the use case more to find the best way to handle

## Binary possibilities
Get https://node-sha256.grannec.com/v1/xs/:stringValue - if you set stringValue '1x1x' will return an array of all the binary variations for in place of x

-- only does x lowercase

###General
Deployed on k8s, with nginx ingress and uses letsencrypt for ssl





### Extra

[.drone.yml](.drone.yml) for the build info. Currently builds, publishes, and deploys tags to k8s 
