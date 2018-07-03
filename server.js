import express from 'express';
import config from 'config'
import cache from 'memory-cache';
import sha from 'sha256'
import { vsprintf } from 'sprintf-js';
const router = express.Router();
const app = express();
const appPort = config.get('service.port');

app.use(express.json());
app.use('/v1', router);

app.listen(appPort, () => {
  console.log(`listening on ${appPort}`);
});


//TODO: data validation if contains correct objects and what not :) Also should probably use redis in future
router.post('/messages/', (req,res) => {
  const shaValue = sha(req.body.message);
  cache.put(shaValue, req.body.message);
  console.log(shaValue);
  res.json({ digest:shaValue })
});


router.get('/messages/:id', (req,res) => {
  const message = cache.get(req.params.id);
  console.log(message);
  if (message === null) {
    res.status(404).send("Not Found");
  }
  res.json({message: message});

});

router.get('/healthcheck', (req, res) => {
 res.send('yep yep the service is up');
});



router.get('/xs/:id', (req, res) => {
  const value = `${req.params.id}`;

  const count = value.split('x').length - 1;
  const templateString = value.replace(/x/g, "%s");

  const result = [];

  //I don't like mutating arrays like this. But this is just the quick solution
  for (let variation = 0; variation < Math.pow(2, count); variation++) {
    const combo = [];
    for (let pos = 0; pos < count; pos++) {
      //shift bit and and it with 1
      if ((variation >> pos) & 1)
        combo.push('0');
      else
        combo.push('1');
    }
    result.push(vsprintf(templateString, combo));
  }
  res.json(result);
});

router.post('/items/', (req,res) => {
  cache.put('items', req.body);
  res.json({message:'updated'})
});




