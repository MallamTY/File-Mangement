const express = require('express');
const { default: mongoose } = require('mongoose');

const schema = mongoose.Schema
const singleFileSchema = new schema({
    fileName: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    },
    fileLocation: {
       type: String,
       //required: true
    }
}, {timestamps: true})


module.exports = mongoose.model('Single-File', singleFileSchema)