import Members from '../models/members.models';

import mongoose from 'mongoose';

const moment = require('moment');

export const newMember = async(req,res)=>{
    try {
        const {...data} = req.body;    
        console.log(data)

        const fecha = moment(data.birthday, "MM/DD/YYYY").toDate(); // Convertir la cadena a objeto Date
        data.birthday = moment(fecha).format("DD/MM/YYYY"); // Formatear la fecha según tu preferencia


        const newMember = new Members(data);

        await newMember.save();
        
        res.json({
            ok:true,
            message:'Se ha registrado la información con exito.'
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            message:'Ocurrió un error al registrar la información.'
        })
    }
}

export const getMembers = async(req,res)=>{
    try {
        let {search,status,page} = req.query;

        // status = status?.trim();

        // if(status != 'true' && status != 'false' && status != 'all'){
        //     return res.status(404).json({
        //         ok:false,
        //         message:'El estado es inválido'
        //     });
        // }

        let query = {};

        if(search?.trim().length>0 && search != 'null' && search !='undefined' && !mongoose.isValidObjectId(search)){
            query['$or'] =[{name:new RegExp(search,'i')},{description:new RegExp(search,'i')}]
        } 

        if(mongoose.isValidObjectId(search)){
            query._id = search;
        }

        // if(status == 'true' || status == 'false'){
        //     query.status = status =='true';
        // }

        let members = await Members.paginate(query,
            {
                page, 
                limit: process.env.limitPaginationTable,
                pagination:page !='0' && !isNaN(page*1)?true:false,
                sort:{'createdAt':-1}
            });

        let paginationDetails = { ...members };
        delete paginationDetails.docs;

        res.json({
            ok:true,
            members:members.docs,
            paginationDetails
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            message:'Ocurrió un error al traer los miembros'
        });
    }
}