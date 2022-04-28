class Formulario {
    constructor () {
        this.formulario = document.querySelector('.formulario');
        this.titulo = document.querySelector('.titulo');
        this.textoLink = document.querySelector('.textoLink');
        this.eventos();
    }


    registro() {
        // Pegando os dados
        const user = this.formulario.querySelector('#username').value;
        const senha = this.formulario.querySelector('#senha').value;
        const senha2 = this.formulario.querySelector('#confirmarSenha').value;
        const generoM = this.formulario.querySelector('#masculino');
        let genero

        // Pegando o genero
        if(generoM.checked) {
            genero = 'masculino';
        }else {
            genero = 'feminino';
        };

        // Convertendo para JSON
        const obj = {username: user, password: senha, gender: genero};

        const JsonStr = JSON.stringify(obj);

        // Configurando o parametro para o Fetch
        const confReg = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            Json: JsonStr,
        };

        // Requisição post
        
    }


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

            this.eventos();


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

            this.eventos();
        }

    };


    eventos() {
        this.formulario.querySelector('.botao').addEventListener('click', e => {
            this.registro();
        });
        this.textoLink.querySelector('.link').addEventListener('click', e => {
            this.troca();
        })
    };

}

const pika = new Formulario();
