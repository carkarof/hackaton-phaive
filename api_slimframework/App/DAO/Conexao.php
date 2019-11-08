<?php

namespace App\DAO;

abstract class Conexao
{
    /**
     * @var \PDO
     */
    protected $pdo;

    public function __construct()
    {

        $host = getenv('SIMPLESVET_MYSQL_HOST');
        $dbname = getenv('SIMPLESVET_MYSQL_DBNAME');
        $user = getenv('SIMPLESVET_MYSQL_USER');
        $pass = getenv('SIMPLESVET_MYSQL_PASSWORD');


        try {
            $this->pdo = new \PDO("mysql:host=$host;dbname=$dbname;charset=UTF8", $user, $pass);

            $this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        } catch (\PDOException $e) {
            var_dump("Erro ao tentar se conectar com o servidor::.  " . $e->getMessage());
        }
    }
}
