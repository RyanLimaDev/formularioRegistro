class Formulario {
    constructor () {
        this.formulario = document.querySelector('.formulario');
        this.titulo = document.querySelector('.titulo');
        this.textoLink = document.querySelector('.textoLink');
        this.botaoDiv = document.querySelector('.botaoDiv');
        this.eventosLogin();
    }
    // Coisas a se fazer
    /*  
    Verificador de campos
    Requisição POST (registro) ????? Tem erro 415
    Requisição GET (login)
    
    */

    conectar() {
        const user = this.formulario.querySelector('#username').value;
        const senha = this.formulario.querySelector('#senha').value;

        const options = {mode: 'no-cors'};

        fetch(`https://crudapiproject.azurewebsites.net/api/user/login?user=${user}&password=${senha}`)
        .then((resposta) => {
            console.log(resposta.body)
            return resposta.json()})
        .then(json => console.log(json))
        .catch(err => console.log(err))
    }

    registro() {
        // Pegando os dados
        const user = this.formulario.querySelector('#username').value;
        const senha = this.formulario.querySelector('#senha').value;
        const senha2 = this.formulario.querySelector('#confirmarSenha').value;
        const generoM = this.formulario.querySelector('#masculino');
        let genero
        
        // Verificar os campos
        if (this.campoOk()) {
            // Pegando o genero
            if(generoM.checked) {
                genero = 'masculino';
            }else {
                genero = 'feminino';
            };
    
            // Convertendo para JSON
            const obj = {username: user, password: senha, gender: genero};
            console.log(JSON.stringify(obj));
    
            // Configurando o parametro para o Fetch
    
            const confReg = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            };
    
            // Requisição post
            fetch('https://crudapiproject.azurewebsites.net/api/user/register', confReg)
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))

        }else{
            console.log('Deu errado bicho');
        };
        
    };


    troca() {
        // Dados
        const registroField = this.formulario.querySelectorAll('.registro');
        
        
        // Verificar qual o estado está
        if (this.titulo.innerHTML == 'Login'){
            // Está no Login, troca para Registro

            // Trocando o titulo
            this.titulo.innerHTML = 'Registro';

            // Colocando os campos de registro
            for (let item of registroField) {
                item.classList.remove('none');
            };

            // Trocando a frase do Link
            this.textoLink.innerHTML = 'Já possui conta? Entre com ela <a class="link">clicando aqui</a>.' 

            // Fazendo o botão registrar

            this.botaoDiv.innerHTML = '<div class="botao"><p>Registrar</p></div>'

            this.formulario.querySelector('.botao').addEventListener('click', e => {
                this.registro();
            });

            // Colocando listener no link novamente
            this.textoLink.querySelector('.link').addEventListener('click', e => {
                this.troca();
            })


        }else{
            // Está no Registro, troca para Login

            // Trocando o titulo
            this.titulo.innerHTML = 'Login';

            // Tirando os campos de registro
            for (let item of registroField) {
                item.classList.add('none');
            };

            // Trocando a frase do Link
            this.textoLink.innerHTML = 'Não possui uma conta? Faça uma <a class="link">clicando aqui</a>.' 

            // Preparando o botão
            this.botaoDiv.innerHTML = '<div class="botao"><p>Entrar</p></div>'

            this.eventosLogin();
        }

    };

    campoOk(){
        let verificar = true;
        // Retirando os erros antigos
        for (let erro of this.formulario.querySelectorAll('.error-text')) {
            erro.remove();
        };

        // Campos em branco
        for (let i of this.formulario.querySelectorAll('.validar')){
            if (i.value == ''){
                this.erroForm(i, 'Campo em branco')
                verificar = false;
            }
        };

        // Verificar as senhas
        if (this.formulario.querySelector('#senha').value != this.formulario.querySelector('#confirmarSenha').value){
            this.erroForm(this.formulario.querySelector('#senha'), 'Os campos senha e confirmar senha devem ser iguais');
            this.erroForm(this.formulario.querySelector('#confirmarSenha'), 'Os campos senha e confirmar senha devem ser iguais')
            verificar = false;
        }


        //console.log(verificar);
        return verificar;
    };

    erroForm(campo, frase){

        // Colocando a frase de erro
        const p = document.createElement('p');
        p.innerText = frase;
        p.classList.add('error-text')
        campo.insertAdjacentElement('afterend', p);
    };
    eventosLogin() {
        const eConectar = e => {
            this.conectar();
        };

        const eTroca = e => {
            this.troca();
        };

        this.formulario.querySelector('.botao').addEventListener('click', eConectar);

        this.textoLink.querySelector('.link').addEventListener('click', eTroca);
    };

}

const pika = new Formulario();
