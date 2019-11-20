create table TipoUsuario (
	IdTipoUsuario bigint primary key auto_increment,
    Descricao varchar(150) not null
); 

create table Permissoes (
	IdPermissao bigint primary key auto_increment,
    IdTipoUsuario bigint,
    Descricao varchar(150) not null,
    Controller varchar(50) not null
);

create table Entidades(
	IdEntidade bigint primary key auto_increment,
    NomeEntidade varchar(500) not null,
    Modalidade varchar(50),
    Endereco varchar(120) not null,
    UF varchar(2) not null,
    Cidade varchar(100) not null,
    Bairro varchar(100) not null,
    Cep varchar(50) not null,
    InstiMantedora varchar(100),
    Telefone varchar(50),
    Responsavel varchar(100) not null,
    AtendidoPor varchar(100) not null,
    QtdAcolhidos int default 0,
    CapacidadeTotalAcolhidos int default 0,
    Status bit default 1
);

create table TipoDeficiencia (
	IdTipoDeficiencia bigint primary key auto_increment,
    Descricao varchar(100),
    Status bit default 1
);

create table Permissoes_TipoUsuario (
	IdPermissao bigint not null,
    IdTipoUsuario bigint not null,
    FOREIGN KEY (IdTipoUsuario) REFERENCES TipoUsuario(IdTipoUsuario),
    FOREIGN KEY (IdPermissao) REFERENCES Permissoes(IdPermissao)
);

create table Usuario (
	IdUsuario bigint primary key auto_increment,
    NomeUsuario varchar(150) not null,
    Login varchar(150) not null,
    Cpf varchar(150) not null,
    Senha varchar(100) not null,
    IdTipoUsuario bigint not null,
    Ativo bit not null default 1,
    FOREIGN KEY (IdTipoUsuario) REFERENCES TipoUsuario(IdTipoUsuario)
);

create table Inspecoes (
	IdInspecao bigint primary key auto_increment,
    IdEntidade bigint not null,
    Anotacoes longtext,
    Relatorio longtext,
    Status varchar(50),
    DtInspecao date not null,
    DtRetorno date not null,
    Fotos longtext,
    FOREIGN KEY (IdEntidade) REFERENCES Entidades(IdEntidade)
);

create table Roteiro(
	IdRoteiro bigint primary key auto_increment,
    IdInspecao bigint,
    NomeRoteiro varchar(200),
    FOREIGN KEY (IdInspecao) REFERENCES Inspecoes(IdInspecao)
);

create table Usuario_Inspecoes (
	IdUsuario bigint not null,
    IdInspecao bigint not null,
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario),
    FOREIGN KEY (IdInspecao) REFERENCES Inspecoes(IdInspecao)
); 

create table Dimensoes (
	IdDimensao bigint primary key auto_increment,
    IdInspecao bigint,
    NomeDimensao varchar(100) not null,
    FOREIGN KEY (IdInspecao) REFERENCES Inspecoes(IdInspecao)
);

create table Perguntas (
	IdPerguntas bigint primary key auto_increment,
    IdDimensao bigint,
	FOREIGN KEY (IdDimensao) REFERENCES Dimensoes(IdDimensao)
);

create table Respostas (
	IdRespostas bigint primary key auto_increment,
    IdPerguntas bigint,
    IdDimensao bigint,
    Resposta varchar(150) not null,
    FOREIGN KEY (IdPerguntas) REFERENCES Perguntas(IdPerguntas),
    FOREIGN KEY (IdDimensao) REFERENCES Dimensoes(IdDimensao)
);

create table RespostaComplemento (
	IdRespComplemento bigint primary key auto_increment,
    IdRespostas bigint,
    IdPerguntas bigint,
    Quantidade bigint,
    FOREIGN KEY (IdRespostas) REFERENCES Respostas(IdRespostas),
    FOREIGN KEY (IdPerguntas) REFERENCES Perguntas(IdPerguntas)
);

create table Acolhidos (
	IdAcolhido bigint primary key auto_increment,
    IdEntidade bigint,
    NomeAcolhido varchar(200) not null,
    CpfAcolhido int,
    RgAcolhido varchar(30),
    Sexo varchar(10),
    Deficiente bit,
    IdTipoDeficiencia bigint,
    NomeMae varchar(200),
    NomePai varchar(200),
    DtNascimento int,
    ObsAcolhido longtext,
	FOREIGN KEY (IdEntidade) REFERENCES Entidades(IdEntidade),
    FOREIGN KEY (IdTipoDeficiencia) REFERENCES TipoDeficiencia(IdTipoDeficiencia)
)

