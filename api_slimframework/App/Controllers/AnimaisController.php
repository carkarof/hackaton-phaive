<?php

namespace App\Controller;

use App\DAO\AnimaisDAO;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

final class AnimaisController
{

    /**
     * @author Meivysom Anjos
     * Action responsavel por pegar a lista de animais no banco de dados
     * @return Response
     */
    public function Listar(Request $request, Response $response, array $args): Response
    {
        var_dump("teste");die;
        $AnimaisDAO = new AnimaisDAO;
        $dados = $AnimaisDAO->Listar();

        $response = $response->withJson($dados);

        return $response;
    }


    /**
     * @author Meivysom Anjos
     * Action responsavel por salvar os dados no banco de dados
     * @return Response
     */
    public function Criar(Request $request, Response $response, array $args)
    {

        $Post = $request->getParsedBody();
        $AnimaisDAO = new AnimaisDAO;
        $Result = $AnimaisDAO->Criar($Post);

        $response = $response->withJson($Result);

        return $response;
    }

    /**
     * @author Meivysom Anjos
     * Action resonsavel por editar as informações no banco de dados
     * @return Response
     */
    public function Atualizar(Request $request, Response $response, array $args)
    {


        $Put = $request->getParsedBody();

        $AnimaisDAO = new AnimaisDAO;
        $Result = $AnimaisDAO->Atualizar($Put);

        $response = $response->withJson($Result);

        return $response;
    }
}
