<?php

namespace App\Controllers;

use App\DAO\DashboardDAO;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

final class DashboardController {
    
    /**
     * @author Meivysom Anjos
     * Action responsavel por pegar a lista das entidades no banco de dados
     * @return Response
     */
    public function ListarEntidade(Request $request, Response $response, array $args): Response
    {
        
        $DashboardDAO = new DashboardDAO;
        $dados = $DashboardDAO->ListarEntidade();

        $response = $response->withJson($dados);

        return $response;
    }
}