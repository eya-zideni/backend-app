const mongoose =require("mongoose")
const Formateur =require("./formateur.js");
const Formation  =require("./formation.js");

const courSchema=mongoose.Schema({
nomcour:{ type: String, required: false},
// Id_formateur:{ type: String, required: false},
photo :{ type: String, required: false },
formationID :{
    type: mongoose.Schema.Types.ObjectId,
    ref: Formation
},
// formateurID: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: Formateur
// },

})
module.exports=mongoose.model('cour',courSchema)