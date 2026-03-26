const express = require('express')
const authController= require("../controller/auth.controller")
const musicController= require("../controller/music.controller")
const multer= require("multer")
const { route } = require('./auth.route')
const authArtiestMiddleware =require("../middlewares/auth.middleware")

const upload=multer({
    storage:multer.memoryStorage()
})
  

const router =express.Router()
router.post('/uploadMusic', authArtiestMiddleware.authArtiest,upload.any(),musicController.createMusic)
router.post('/uploadAlbum',authArtiestMiddleware.authArtiest ,musicController.createAlbum)
router.get('/', authArtiestMiddleware.authUser,musicController.geAllMusic)
router.get('/albums', authArtiestMiddleware.authUser,musicController.getAllAlbums)
router.get('/albums/:albumId', authArtiestMiddleware.authUser,musicController.getAlbumById)








module.exports=router