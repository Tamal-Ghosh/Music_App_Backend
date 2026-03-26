const jwt = require('jsonwebtoken');
const uploadFile = require('../services/storage.service')
const musicModel= require('../models/music.model')
const albumModel= require('../models/album.model');
const { json } = require('express');


async function createMusic(req,res){

        const {title}=req.body
        const file = req.file || req.files?.[0]

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            })
        }

        if (!file) {
            return res.status(400).json({
                message: "Music file is required"
            })
        }

    const result = await uploadFile(file.buffer.toString('base64'))


    const music=await musicModel.create({
        uri:result.url,
        title,
        artist: req.user.id
    })

    res.status(201).json({
    message : "Music created successfully",
    music

})



}

async function createAlbum(req,res) {
    
    const {title, musics}=req.body
    const album = await albumModel.create({
        title,
        musics:musics,
        artist: req.user.id
    })

    res.status(201).json({
        message:"Album created successfully",
        album:{
            id: album._id,
            title: album.title,
            artist:album.artist,
            musics:album.musics
        }
    })
    
}


async function geAllMusic(req,res){
    const musics= await musicModel.find().limit(2).populate("artist", "username email")

    res.status(200).json({
        message: "Get all the musics",
        musics
    })
}


async function getAllAlbums(req,res)
{
    const albums= await albumModel.find().populate("musics")
     res.status(200).json({
        message: "Get all the albums",
        albums
    })

}


async function getAlbumById(req, res) {
    const albumId =req.params.albumId;
    const album = await albumModel.findById(albumId).populate("artist", "username").populate("musics")

    if (!album) {
        return res.status(404).json({
            message: "Album not found"
        })
    }

    res.status(200).json({
        message: "Album found successfully",
        album
    })
}

module.exports={createMusic,createAlbum, geAllMusic,getAllAlbums, getAlbumById }