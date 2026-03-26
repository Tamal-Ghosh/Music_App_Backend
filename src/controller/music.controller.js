const jwt = require('jsonwebtoken');
const uploadFile = require('../services/storage.service')
const musicModel= require('../models/music.model')
const albumModel= require('../models/album.model');
const { json } = require('express');


async function createMusic(req,res){

    const token = req.cookies.token ;

    if(!token)
    {
        return res.status(401).json({
            message : "Unauthorized"
        })
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role!=='artist' )
        {
            return res.status(403).json({
                message: "You don't have access to create a music!"
            })
        }
    

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
        artist: decoded.id
    })

    res.status(201).json({
    message : "Music created successfully",
    music

})
} catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Unauthorized failed" })
        }

        return res.status(500).json({ message: "Upload failed" })
        
    }


}

async function createAlbum(req,res) {
    const token = req.cookies.token
    if(!token)
    {
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    let decoded

    try {
        decoded= jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role !== "artist")
        {
            return res.status(403).json({
                message : "you don't have access to create an album"
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "Unauthorized and not matched"})
        
    }

    const {title, musics}=req.body
    const album = await albumModel.create({
        title,
        musics:musics,
        artist: decoded.id
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


module.exports={createMusic,createAlbum}