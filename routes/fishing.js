const router = require('express').Router();
const updateJsonFile = require('update-json-file');
const file = require('../text.json');
const nodemailer = require('nodemailer')
const _ = require('lodash');

const filePath = `${__dirname}/../text.json`;
// const send = require('gmail-send')({
//   user: 'snakemusic.manager2@gmail.com',
//   pass: 'Mike123a',
// });

let transporter = nodemailer.createTransport({
  host: "mail.hosting.reg.ru",
  port: 465,
  secure: true,
  auth: {
    user: "manager@hidevpn.site",
    pass: "Mike123a"
  }
})

router.post('/changeText',(req,res) => {
    updateJsonFile(filePath,data=> {
        data.texts = req.body.texts;
        console.log(`Текст изменен`);
        res.json({message: "Текст отправки успешно изменен"});
        return data;
    })
});

router.post('/changeTitle',(req,res) => {
  updateJsonFile(filePath,data=> {
      data.originTitle = req.body.title;
      console.log(`Текст изменен`);
      res.json({message: "Тема отправки успешно изменена"});
      return data;
  })
});

router.post('/deleteText',(req,res) => {
  try{
    updateJsonFile(filePath,data=> {
      data.texts.splice(req.body.id, 1)[0];
      console.log(`Текст изменен`);
      res.json({message: "Текст отправки успешно удален"});
      return data;
  })
  }catch(e){
    res.json({error:e})
  }
});


router.get('/getAllText',(req,res) => {
  const texts = file.texts;
  return res.json({texts});
});

router.post('/addText',(req,res) => {
  updateJsonFile(filePath,data=> {
    data.texts.push(req.body.text);
    console.log(`Текст изменен`);
    res.json({message: "Текст отправки успешно изменен"});
    return data;
})
  console.log(file.texts);
});


router.get('/getTitle',(req,res) => {
  return res.json({title: file.originTitle});
});

let i = 0;


router.get('/test',async(req,res) => {
  const textNumber = Math.floor(Math.random() * file.texts.length);
  console.log(textNumber);
  console.log(file.texts[textNumber]);
  res.send('test').status(400);
});


router.post('/send', async (req,res) => {
const textNumber = Math.floor(Math.random() * file.texts.length);
try {
  const info = await transporter.sendMail({
    from:"<manager@hidevpn.site>",
    to: req.body.to,
    subject: file.originTitle,
    html: file.texts[textNumber]
  });
  i++;
  console.log(`${i}: COMPLETED | TEXT: ${textNumber}`);
  return res.json(info).status(200);

} catch (error) {
  console.log(`${i}: ERROR`);
  return res.json(error).status(400);
}
});



module.exports = router;