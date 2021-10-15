const todosOsCampos = function () {
    const objeto = {
        "nome": nome,
        "cpf": cpf,
        "email": email,
        "tel": telefone,
        "cep": cep
    }
    for (const key in objeto) {
        const campo = document.getElementById(key);
        campo.onblur = function () {
            objeto[key](campo)
        }
    }
    const objetoSegundo = {
        "nome": somenteLetras,
        "cpf": somenteNumeros
    }
    for (const key in objetoSegundo) {
        const campo = document.getElementById(key);
        campo.addEventListener("keypress", objetoSegundo[key]);
    }
}
const cep = function (campo) {
    validacao(campo);
    validacaoCep(campo);
}
const nome = function (campo) {
    validacao(campo);
}
const cpf = function (campo) {
    validacao(campo);
    validacaoCpf(campo);
}
const email = function (campo) {
    validacao(campo);
    if (validacaoEmail(campo) === true) {
        campo.classList.remove("red");
    } else if (validacaoEmail(campo) === false) {
        campo.classList.add("red");
    }
}
const telefone = function (campo) {
    validacao(campo);
}
const request = function (url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const response = this.response;
            typeof callback === "function" ? callback(response) : null;
        }
    };
    xhttp.responseType = "json";
    xhttp.open("GET", url, true);
    xhttp.send();
}
const validacaoCep = function (campo) {
    const cep = campo.value.replace(/[-]/g, '');
    if (cep != "" && cep.length === 8) {
        const validaCep = /^[0-9]{8}$/;
        if (validaCep.test(cep)) {
            const url = 'https://viacep.com.br/ws/' + cep + '/json';
            request(url, meu_callback);
        }
        else {
            campo.classList.add("red");
        }
    }
    else {
        campo.classList.add("red");
    }
}
const meu_callback = function (conteudo) {
    if (!("erro" in conteudo)) {
        setFieldValue(conteudo);
    }
    else {
        setFieldValue("");
    }
}
const setFieldValue = function (campo) {
    if (typeof campo === "object") {
        document.getElementById("cidade").value = (campo.localidade);
        document.getElementById("estado").value = (campo.uf);
        document.getElementById("cep").classList.remove("red");
        const tel = document.getElementById("tel");
        if (tel.value != "") {
            tel.value = tel.value.replace(tel.value.substring(1, 3), (campo.ddd));
        }
        else {
            tel.value = `(${campo.ddd})`;
        }
    } else {
        document.getElementById('cidade').value = ("");
        document.getElementById('estado').value = ("");
        document.getElementById("cep").classList.add("red");
    }
}
const validacaoEmail = function (campo) {
    const re = /\S+@\S+\.\S+/;
    return re.test(campo.value);
}
const validacaoCpf = function (campo) {
    const valorCpf = campo.value.replace(/[.-]/g, "");
    const cpf = [];
    if (valorCpf.length === 11) {
        for (let i = 0; i < valorCpf.length; i++) {
            cpf[i] = parseInt(valorCpf[i]);

        }
        if (resto(calculaDigito(10, cpf)) !== cpf[9]) {
            campo.classList.add("red");
            return;
        }
        if (resto(calculaDigito(11, cpf)) !== cpf[10]) {
            campo.classList.add("red");
            return;
        } else {
            campo.classList.remove("red");
        }

    } else {
        campo.classList.add("red");
    }

}
const calculaDigito = function (control, cpf) {
    let soma = 0;
    const maximo = control - 1;
    for (let i = 0; i < maximo; i++, control--) {
        soma += parseInt(cpf[i]) * control;
    }
    return soma;
}
const resto = function (soma) {
    const resto = soma % 11;
    if (resto >= 2) {
        return 11 - resto;
    }
    else {
        return 0;
    }
}
const validacao = function (campo) {
    if (campo.value === "") {
        document.getElementById("submit").disabled = true;
        campo.classList.add("red");
        return;
    }
    else {
        document.getElementById("submit").disabled = false;
        campo.classList.remove("red");
    }
}
const somenteLetras = function () {
    const letras = /[a-zA-Z ]/g;
    if (letras.test(String.fromCharCode(window.event.keyCode))) {
        return window.event.key;
    }
    else {
        window.event.preventDefault();
    }
}
const somenteNumeros = function () {
    const numeros = /[0-9]/g;
    if (numeros.test(String.fromCharCode(window.event.keyCode))) {
        return window.event.key;
    }
    else {
        window.event.preventDefault();
    }
}
todosOsCampos();