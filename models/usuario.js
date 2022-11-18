const {Schema, model} = require ('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
    online:
    {
        type: Boolean,
        default:false
    }
});

//no puede ir una funcion de flecha ya que no modifica los valores del this
UsuarioSchema.method('toJSON', function(){
    const {__v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema);