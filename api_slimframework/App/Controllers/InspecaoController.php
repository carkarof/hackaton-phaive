<?php

namespace App\Controller;

use App\DAO\InspecaoDAO;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

final class InspecaoController {
    
    /**
     * @author Meivysom Anjos
     * Action responsavel por pegar a lista das entidades no banco de dados
     * @return Response
     */
    public function Listar(Request $request, Response $response, array $args): Response
    {
        
        $InspecaoDAO = new InspecaoDAO;
        $dados = $DashboardDAO->Listar();

        $response = $response->withJson($dados);

        return $response;
    }

    public function Salvar(Request $request, Response $response, array $args){
        $Post = $request->getParsedBody();
        $InspecaoDAO = new InspecaoDAO;
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

        $InspecaoDAO = new InspecaoDAO;
        $Result = $AnimaisDAO->Atualizar($Put);

        $response = $response->withJson($Result);

        return $response;
    }
}