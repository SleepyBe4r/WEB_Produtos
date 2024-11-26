import express from "express";
// importando session;
import session from "express-session";
// importando cookie;
import cookieParser from "cookie-parser";

const app = express();

//configurando a session;
app.use(session({
    secret: "minh@chav3S3cr3t4",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 30 // 30 minutos;
    }
}));

//adicionando o middleware cookieParser
app.use(cookieParser());


//configurar a nossa aplicação para receber os dados do formulário
//você pode escolher entre duas bibliotecas: QS ou QueryString
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./pages/public"));

const host = "localhost";
const port = 3000;

var lista_Produtos = [];

function inicio_View(req, resp){
    const dataHoraUltimoLogin = req.cookies['dataHoraUltimoLogin'];
    if (!dataHoraUltimoLogin){
        dataHoraUltimoLogin='';
    }

    resp.send(`
        <html>
            <head>
                <title>Início</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <div class="bg-dark p-3 d-flex justify-content-between">
                    <h4 class="text-white m-0">Painel de Controle</h4>
                    <nav class="nav">
                        <a class="nav-link text-white disabled" href="#" tabindex="-1" aria-disabled="true">Seu último acesso foi realizado em ${dataHoraUltimoLogin}</a>
                        <a class="nav-link text-white" href="#">Início</a>
                        <a class="nav-link text-white" href="/cadastrar_Produto">Cadastrar Produto</a>
                        <a class="nav-link text-white" href="/listar_Produto">Listar Produtos</a>
                        <a class="nav-link active" aria-current="page" href="/logout">Sair</a>
                    </nav>
                </div>
                
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
        `);
}

function cadastro_Produto_View(req,resp) {    
    const dataHoraUltimoLogin = req.cookies['dataHoraUltimoLogin'];
    if (!dataHoraUltimoLogin){
        dataHoraUltimoLogin='';
    }

    resp.send(`
        <html lang="pt-BR">
        <head>
            <title>Cadastro de Produto</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        </head>
        <body>
            <div class="bg-dark p-3 d-flex justify-content-between">
            <h4 class="text-white m-0">Painel de Controle</h4>
            <nav class="nav">
                <a class="nav-link text-white disabled" href="#" tabindex="-1" aria-disabled="true">Seu último acesso foi realizado em ${dataHoraUltimoLogin}</a>
                <a class="nav-link text-white" href="/">Início</a>
                <a class="nav-link text-white" href="#">Cadastrar Produto</a>
                <a class="nav-link text-white" href="/listar_Produto">Listar Produtos</a>
                <a class="nav-link active" aria-current="page" href="/logout">Sair</a>
            </nav>
            </div>
            <div class="p-4">
            <div class="container p-4 border rounded bg-light">
                <h2>Cadastro de Produto</h2>
            </div>
            <div class="container mt-4 border rounded bg-light">
                <form action="/cadastrar_produto" method="POST" class="p-4" novalidate>
                <div class="form-group p-2">
                    <label for="codigo_barras" class="form-label">Código de Barras</label>
                    <input class="form-control" type="text" name="codigo_barras" id="codigo_barras" placeholder="1234567890123" required>
                    <br>
                    
                    <label for="descricao" class="form-label">Descrição do Produto</label>
                    <input class="form-control" type="text" name="descricao" id="descricao" placeholder="Ex.: Detergente Líquido" required>
                    <br>
                    
                    <label for="preco_custo" class="form-label">Preço de Custo</label>
                    <input class="form-control" type="number" name="preco_custo" id="preco_custo" step="0.01" placeholder="Ex.: 5.00" required>
                    <br>
                    
                    <label for="preco_venda" class="form-label">Preço de Venda</label>
                    <input class="form-control" type="number" name="preco_venda" id="preco_venda" step="0.01" placeholder="Ex.: 7.50" required>
                    <br>
                    
                    <label for="data_validade" class="form-label">Data de Validade</label>
                    <input class="form-control" type="date" name="data_validade" id="data_validade" required>
                    <br>
                    
                    <label for="qtd_estoque" class="form-label">Quantidade em Estoque</label>
                    <input class="form-control" type="number" name="qtd_estoque" id="qtd_estoque" placeholder="Ex.: 50" required>
                    <br>
                    
                    <label for="fabricante" class="form-label">Nome do Fabricante</label>
                    <input class="form-control" type="text" name="fabricante" id="fabricante" placeholder="Ex.: Indústria XYZ Ltda" required>
                </div>
                
                <hr class="border-dark">
                <button type="submit" class="btn btn-primary">Cadastrar</button>
                </form>
            </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </body>
        </html>`);            
}

function cadastrar_Produto(req, resp){
    // Recuperar os dados do formulário enviados para o servidor
    const codigo_barras = req.body.codigo_barras;
    const descricao = req.body.descricao;
    const preco_custo = req.body.preco_custo;
    const preco_venda = req.body.preco_venda;
    const data_validade = req.body.data_validade;
    const qtd_estoque = req.body.qtd_estoque;
    const fabricante = req.body.fabricante;

    const dataHoraUltimoLogin = req.cookies['dataHoraUltimoLogin'];
    if (!dataHoraUltimoLogin){
        dataHoraUltimoLogin='';
    }

    // Validar a entrada do usuário
    if (
    codigo_barras &&
    descricao &&
    preco_custo &&
    preco_venda &&
    data_validade &&
    qtd_estoque &&
    fabricante
    ) {
        // Os dados de entrada são válidos!
        const produto = {
            codigo_barras,
            descricao,
            preco_custo,
            preco_venda,
            data_validade,
            qtd_estoque,
            fabricante,
        };

        // Adicionar o produto na lista
        lista_Produtos.push(produto);

        resp.redirect("/listar_Produto");
    } else {
        // Retornar o formulário com mensagens de validação
        resp.write(`
            <html>
            <head>
                <title>Cadastro de Produto</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <div class="bg-dark p-3 d-flex justify-content-between">
                <h4 class="text-white m-0">Painel de Controle</h4>
                <nav class="nav">
                    <a class="nav-link text-white disabled" href="#" tabindex="-1" aria-disabled="true">Seu último acesso foi realizado em ${dataHoraUltimoLogin}</a>
                    <a class="nav-link text-white" href="/">Início</a>
                    <a class="nav-link text-white" href="#">Cadastrar Produto</a>
                    <a class="nav-link text-white" href="/listar_Produto">Listar Produtos</a>
                    <a class="nav-link active" aria-current="page" href="/logout">Sair</a>
                </nav>
                </div>
                <div class="p-4">
                <div class="container p-4 border rounded bg-light">
                    <h2>Cadastro de Produto</h2>
                </div>
                <div class="container mt-4 border rounded bg-light">
                    <form action="/cadastrar_Produto" method="POST" class="p-4">
                        <div class="form-group p-2">
                            <label for="codigo_barras" class="form-label">Código de Barras</label>
                            <input class="form-control" type="text" name="codigo_barras" id="codigo_barras" value="${codigo_barras || ''}" required>
                            ${!codigo_barras ? '<p class="text-danger">Código de Barras é obrigatório!</p>' : ''}

                            <label for="descricao" class="form-label">Descrição</label>
                            <input class="form-control" type="text" name="descricao" id="descricao" value="${descricao || ''}" required>
                            ${!descricao ? '<p class="text-danger">Descrição é obrigatória!</p>' : ''}
                            
                            <label for="preco_custo" class="form-label">Preço de Custo</label>
                            <input class="form-control" type="number" name="preco_custo" id="preco_custo" step="0.01" placeholder="Ex.: 5.00" value="${preco_custo || ''}" required>
                            ${!preco_custo ? '<p class="text-danger">Preço de Custo é obrigatório!</p>' : ''}
                            <br>
                            
                            <label for="preco_venda" class="form-label">Preço de Venda</label>
                            <input class="form-control" type="number" name="preco_venda" id="preco_venda" step="0.01" placeholder="Ex.: 7.50" value="${preco_venda || ''}" required>
                            ${!preco_venda ? '<p class="text-danger">Preço de Venda é obrigatório!</p>' : ''}
                            <br>
                            
                            <label for="data_validade" class="form-label">Data de Validade</label>
                            <input class="form-control" type="date" name="data_validade" id="data_validade" value="${data_validade || ''}" required>
                            ${!data_validade ? '<p class="text-danger">Data de Validade é obrigatório!</p>' : ''}
                            <br>
                            
                            <label for="qtd_estoque" class="form-label">Quantidade em Estoque</label>
                            <input class="form-control" type="number" name="qtd_estoque" id="qtd_estoque" placeholder="Ex.: 50" value="${qtd_estoque || ''}" required>
                            ${!qtd_estoque ? '<p class="text-danger">Quantidade em Estoque é obrigatório!</p>' : ''}
                            <br>
                            
                            <label for="fabricante" class="form-label">Nome do Fabricante</label>
                            <input class="form-control" type="text" name="fabricante" id="fabricante" placeholder="Ex.: Indústria XYZ Ltda" value="${fabricante || ''}" required>
                            ${!fabricante ? '<p class="text-danger">Nome do Fabricante é obrigatório!</p>' : ''}
                        </div>
                        <hr class="border-dark">
                        <button type="submit" class="btn btn-primary">Cadastrar</button>
                    </form>
                </div>
                </div>
            </body>
            </html>
        `);
    }
    resp.end();
}

function listar_Produtos(req, resp){
    const dataHoraUltimoLogin = req.cookies['dataHoraUltimoLogin'];
    if (!dataHoraUltimoLogin){
        dataHoraUltimoLogin='';
    }

    resp.write(`
        <html>
        <head>
            <title>Lista de Produtos</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <meta charset="utf-8">
        </head>
        <body>
            <div class="bg-dark p-3 d-flex justify-content-between">
            <h4 class="text-white m-0">Painel de Controle</h4>
            <nav class="nav">
                <a class="nav-link text-white disabled" href="#" tabindex="-1" aria-disabled="true">Seu último acesso foi realizado em ${dataHoraUltimoLogin}</a>
                <a class="nav-link text-white" href="/">Início</a>
                <a class="nav-link text-white" href="/cadastrar_Produto">Cadastrar Produto</a>
                <a class="nav-link text-white" href="#">Listar Produtos</a>
                <a class="nav-link active" aria-current="page" href="/logout">Sair</a>
            </nav>
            </div>
            <div class="p-4">
            <div class="container p-4 border rounded bg-light">
                <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Código de Barras</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Preço de Custo</th>
                    <th scope="col">Preço de Venda</th>
                    <th scope="col">Data de Validade</th>
                    <th scope="col">Qtd em Estoque</th>
                    <th scope="col">Nome do Fabricante</th>
                    </tr>
                </thead>
                <tbody>`);

    // Adicionar as linhas da tabela
    lista_Produtos.forEach((produto) => {
        resp.write(`
        <tr>
            <td>${produto.codigo_barras}</td>
            <td>${produto.descricao}</td>
            <td>${produto.preco_custo}</td>
            <td>${produto.preco_venda}</td>
            <td>${produto.data_validade}</td>
            <td>${produto.qtd_estoque}</td>
            <td>${produto.fabricante}</td>
        </tr>
        `);
    });

    resp.write(`
                </tbody>
                </table>
                <a class="btn btn-primary" href="/cadastrar_Produto">${lista_Produtos.length > 0 ? "Cadastrar mais um Produto": "Cadastrar um Produto"}</a>
                <a class="btn btn-dark" href="/">Voltar para o Menu</a>
            </div>
            </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
    `);
}

function logar(req, resp) {
    // Recuperar os dados do formulário enviados para o servidor
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if(usuario == "admin" && senha == "123"){
        //criar session;
        req.session.usuarioLogado = true;
        //criar cookie com a data da ultima session logada;
        resp.cookie('dataHoraUltimoLogin', new Date().toLocaleString(), {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true});
        resp.redirect("/");
    } else {
        resp.send(`
            <html>
                <head>
                    <meta charset="utf-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                </head>
                <body>
                    <div class="container w-25"> 
                        <div class="alert alert-danger" role="alert">
                            Usuário ou senha inválidos!
                        </div>
                        <div>
                            <a href="/login.html" class="btn btn-primary">Tentar novamente</a>
                        </div>
                    </div>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                        crossorigin="anonymous">
                </script>
            </html>
        `);
    }
}

function validarAutenticacao(req, resp, next) {
    if (req.session.usuarioLogado) {
        next();
    } else{
        resp.redirect("/login.html");
    }
}

app.get('/',  validarAutenticacao,inicio_View);

app.get("/cadastrar_Produto", validarAutenticacao,cadastro_Produto_View);

app.get("/listar_Produto", validarAutenticacao, listar_Produtos);

app.post("/cadastrar_Produto", validarAutenticacao,cadastrar_Produto);

app.get('/login', (req,resp)=>{
    resp.redirect("/login.html");
});

app.post("/login",logar);

app.get('/logout', (req, resp) => {
    req.session.destroy(); //eliminar a sessão.
    resp.redirect('/login.html');
});

app.listen(port, host, () => {
    console.log(`Servidor iniciado no endereço http://${host}:${port}`);    
})
