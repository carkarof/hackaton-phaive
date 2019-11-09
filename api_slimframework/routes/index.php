<?php

use App\Controllers\EntidadeController;
use App\Controllers\PromotorController;
use App\Controllers\InspecaoController;
use App\Controllers\Historico_inspecaoController;
use App\Controllers\DocumentosController;
use App\Controllers\DashboardController;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

$app = AppFactory::create();
$app->addErrorMiddleware(true, true, true);
$app->add(new Tuupola\Middleware\CorsMiddleware([
    "origin" => ["*"],
    "methods" => ["GET", "POST", "PUT", "DELETE"],
    "headers.allow" => ["Origin", "Content-Type", "Authorization", "Accept", "ignoreLoadingBar", "X-Requested-With", "Access-Control-Allow-Origin"],
    "headers.expose" => [],
    "credentials" => true,
    "cache" => 0,
]));

$app->get('/', function(Request $request, Response $response, $args){
    $response->getBody()->write("OK");
    return $response;
});


/**
 * @author Douglas Lazaro
 * Routes responsaveis por trazer e entregar ao servidor as informações das Entidades
 */
$app->get('/entidade', EntidadeController::class . ':Listar');
$app->post('/entidade', EntidadeController::class . ':Criar');
$app->put('/entidade/{id}', EntidadeController::class . ':Atualizar');

/**
 * @author Douglas Lazaro
 * Routes responsaveis por trazer e entregar ao servidor as informações dos Promotores
 */
$app->get('/promotor', PromotorController::class . ':Listar');
$app->post('/promotor', PromotorController::class . ':Criar');
$app->put('/promotor/{id}', PromotorController::class . ':Atualizar');

/**
 * @author Douglas Lazaro
 * Routes responsaveis por trazer e entregar ao servidor as informações das Inspeção
 */
$app->get('/inspecao', InspecaoController::class . ':Listar');
$app->post('/inspecao', InspecaoController::class . ':Criar');
$app->put('/inspecao/{id}', InspecaoController::class . ':Atualizar');

/**
 * @author Douglas Lazaro
 * Routes responsaveis por trazer e entregar ao servidor as informações dos Historico_inspeçao
 */
$app->get('/historico_inspecao', Historico_inspecaoController::class . ':Listar');
$app->post('/historico_inspecao', Historico_inspecaoController::class . ':Criar');
$app->put('/historico_inspecao/{id}', Historico_inspecaoController::class . ':Atualizar');

/**
 * @author Douglas Lazaro
 * Routes responsaveis por trazer e entregar ao servidor as informações dos Documentos
 */
$app->get('/documentos', DocumentosController::class . ':Listar');
$app->post('/documentos', DocumentosController::class . ':Criar');
$app->put('/documentos/{id}', DocumentosController::class . ':Atualizar');

/**
 * @author Meivysom Anjos
 * Routes responsaveis por trazer e entregar ao servidor as informações do dashboard
 */
$app->get('/dashboard_entidades', DashboardController::class . ':ListarEntidade');
$app->get('/dashboard_roteiro', DashboardController::class . ':Roteiro');


$app->run();
