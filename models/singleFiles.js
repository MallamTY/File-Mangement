const express = require('express');
const { default: mongoose } = require('mongoose');

const schema = mongoose.Schema
const singleFileSchema = new schema({
   
    file_url: {
       type: String,
       required: true
    }
}, {timestamps: true})


module.exports = mongoose.model('Single-File', singleFileSchema)