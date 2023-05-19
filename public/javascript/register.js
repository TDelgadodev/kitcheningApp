const $ = (id) => document.getElementById(id);

$('name').addEventListener("blur",function(e){
switch (true) {
    case !this.value.trim():
        msgError('errorName','El nombre es obligatorio')
        break;
    case this.value.trim().length < 2 || this.value.trim().length > 50:
        msgError('errorName','')
    default:
        break;
}
})


/* const exReg = {exRegMayu: /[A-Z]/,
  exRegMinu: /[a-z]/,
  exRegNum: /[0-9]/,
  exRegEsp: /[$@$!%*?&]/,
  exRegMin: /.{6,}/,
  exRegMax: /.{8}/
} */