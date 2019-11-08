<?php

namespace App\DAO;

class Historico_inspecaoDAO extends Conexao
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
    public function Listar()
    {
        $Result = $this->pdo
            ->query('select * from vw_animais')
            ->fetchAll(\PDO::FETCH_ASSOC);

        return $Result;
    }

    /**
     * @author Meivysom Anjos
     * Action responsavel por salvar os dados no banco de dados
     * @return Boolean
     */
    public function Criar($Dados)
    {

        $nome = $Dados['nome'];
        $idRaca = $Dados['idRaca'];
        $sexo = $Dados['sexo'];
        $especie = $Dados['especie'];
        $dataNascimento = $Dados['dataNascimento'];
        $dataFalecimento = $Dados['dataFalecimento'] == "" ? "NULL" : $Dados['dataFalecimento'];

        try {
            $this->pdo->query("Call insertAnimal(
                '$nome',
                $idRaca,
                '$sexo',
                $especie,
                '$dataNascimento',
                '$dataFalecimento'
            )");
            return true;
        } catch (\Exception $ex) {
            return false;
        }
    }

    /**
     * @author Meivysom Anjos
     * Action resonsavel por editar as informações no banco de dados
     * @return Boolean
     */
    public function Atualizar($Dados)
    {

        $nome = $Dados['nome'];
        $idAnimal = $Dados['idAnimal'];
        $idRaca = $Dados['idRaca'];
        $sexo = $Dados['sexo'];
        $especie = $Dados['especie'];
        $dataNascimento = $Dados['dataNascimento'];
        $dataFalecimento = $Dados['dataFalecimento'] == "" ? "null" : $Dados['dataFalecimento'];
        $dataAtualizacao = date("Y-m-d");

        try {
            $this->pdo->query("Call updateAnimal(
                '$nome',
                 $idRaca,
                '$sexo',
                 $especie,
                '$dataNascimento',
                '$dataFalecimento',
                '$dataAtualizacao',
                $idAnimal
            )");
            return true;
        } catch (\Exception $ex) {
            return false;
        }
    }
}
