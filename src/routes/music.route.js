const express = require('express')
const authController= require("../controller/auth.controller")
const musicController= require("../controller/music.controller")
const multer= require("multer")
const { route } = require('./auth.route')

const upload=multer({
    storage:multer.memoryStorage()
})
  

const router =express.Router()
router.post('/upload',upload.any(),musicController.createMusic)
router.post('/album', musicController.createAlbum)






module.exports=router