<?php

namespace App\Controller;

use App\DAO\EntidadeDAO;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

final class EntidadeController {
    
     /**
     * @author Meivysom Anjos
     * Action responsavel por pegar a lista das entidades no banco de dados
     * @return Response
     */
    public function Listar(Request $request, Response $response, array $args): Response
    {
        
        $EntidadeDAO = new EntidadeDAO;
        $dados = $DashboardDAO->Listar();

        $response = $response->withJson($dados);

        return $response;
    }

    public function Salvar(Request $request, Response $response, array $args){
        $Post = $request->getParsedBody();
        $EntidadeDAO = new EntidadeDAO;
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

        $EntidadeDAO = new EntidadeDAO;
        $Result = $AnimaisDAO->Atualizar($Put);

        $response = $response->withJson($Result);

        return $response;
    }
}