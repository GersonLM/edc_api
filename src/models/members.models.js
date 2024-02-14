const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

import {Schema, model} from 'mongoose';

const MembersSchema =  new Schema(
    {
        name:{
            type:String, required:true
        },
        age:{
            type:String, required:true
        },
        birthday:{
            type:Date, required:true
        },
        sexo:{
            type:String, required:false
        },
        acceptDios:{
            type:String, required:true
        },
        baptizedWater:{
            type:String, required:true
        },
        civilStatus:{
            type:String, required:true
        },
        profession:{
            type:String, required:true
        },
        ministerios:[{
            type:Schema.Types.Mixed, required:false, default:[]
        }],
        imageProfile:{
            type: Schema.Types.Mixed,
            required:false,
            default:null
        },
        status:{
            type:Boolean,
            default:true
        },

    },{timestamps: true, versionKey: false}
)

MembersSchema.plugin(mongoosePaginate);
MembersSchema.plugin(aggregatePaginate);


export default model('Members', MembersSchema);
