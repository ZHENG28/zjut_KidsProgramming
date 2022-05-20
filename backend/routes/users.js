var express = require('express')
var router = express.Router()
const path = require('path')
const JudgeClient = require('../judge/JudgeClient')
const lang_config = require('../language.conf').py3_lang_config

router.post('/', function (req, res, next) {
  let code = req.body.code
  judge_client = new JudgeClient(lang_config)
  judge_client.judge(code, path.join(__dirname, '../tests/inout'))
  res.send('respond with a resource')
})

module.exports = router
