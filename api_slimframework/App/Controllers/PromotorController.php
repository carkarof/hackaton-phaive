<?php

namespace App\Controller;

use App\DAO\PromotorDAO;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

final class PromotorController {
    /**
     * @author Meivysom Anjos
     * Action responsavel por pegar a lista das entidades no banco de dados
     * @return Response
     */
    public function Listar(Request $request, Response $response, array $args): Response
    {
        
        $PromotorDAO = new PromotorDAO;
        $dados = $DashboardDAO->Listar();

        $response = $response->withJson($dados);

        return $response;
    }

    public function Salvar(Request $request, Response $response, array $args){
        $Post = $request->getParsedBody();
        $PromotorDAO = new PromotorDAO;
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

        $PromotorDAO = new PromotorDAO;
        $Result = $AnimaisDAO->Atualizar($Put);

        $response = $response->withJson($Result);

        return $response;
    }
}