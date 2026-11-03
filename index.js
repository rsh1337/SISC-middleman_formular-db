import express from "express";
import { db, Inscriere } from "./config.js";

const app = express();
app.use(express.json());

const rules={
    nume: /^[A-Za-zĂÂÎȘȚăâîșț-]+( [A-Za-zĂÂÎȘȚăâîșț-]+)+$/,
    telefon: /^07\d{2} ?\d{3} ?\d{3}$/,
    email: /^[\w.-]+@[\w-]+\.[a-z]{2,}$/i,
    nume_echipa: /^.{3,30}$/,
    nr_participanti: /^[3-6]$/,
    interval: /^(14:00-15:30|16:00-17:30|18:00-19:30|20:00-21:30)$/,
    legat_ochi: /^(da|nu)$/,
}

app.post("/inscriere", async(req,res) =>{
    const data = req.body

    const errors =[];
    for(const field in rules){
        if(!rules[field].test(data[field] ?? "")){
            errors.push(`${field} este invalid`)
        }
    }

    if(data.acord_termeni !== "on"){
        errors.push("Trebuie sa bifezi declaratia")
    }

    if(errors.length > 0){
        return res.status(400).json({err: true, msg:"Date invalide", errors})
    }

    try{
        await Inscriere.create({
            nume: data.nume,
            telefon: data.telefon,
            email: data.email,
            numeEchipa: data.nume_echipa,
            nrParticipanti: Number(data.nr_participanti),
            membri: data.membri,
            interval: data.interval,
            legatOchi: data.legat_ochi,
            sacrificiu: data.sacrificiu
        })
        return res.status(201).json({err:false, msg:`Echipa ${data.nume_echipa} a fost inregistrata!`})
    }catch(err){
        console.log(err)
        return res.status(500).json({err: true, msg: "Cv nu a mers bn =("})
    }

})

await db.sync();
app.listen(3001);