<?php

namespace App\DAO;

class DashboardDAO extends Conexao
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @author Meivysom Anjos
     * Action responsavel por Listar os dados no banco de dados
     * @return Mixed
     */
    public function ListarEntidade()
    {
        $Result = $this->pdo
            ->query('select * from entidade')
            ->fetchAll(\PDO::FETCH_ASSOC);

        return $Result;
    }

}