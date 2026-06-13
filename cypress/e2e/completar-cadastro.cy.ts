describe("Edição de Perfil do Pesquisador", () => {
  beforeEach(() => {
    cy.fixture("completar-cadastro.json").as("dados");

    // 1. Realiza o login
    cy.fixture("criar-conta").then((dadosConta) => {
      cy.typeLogin(dadosConta.email, dadosConta.senha);
      cy.get('[data-cy="user-menu"]').should("be.visible");
    });

    // 2. Vai direto para a página que importa via URL (Atalho)
    cy.visit("https://novo-sig.homolog.ledes.net/pesquisador/editar");
  });

  it("Verificar o fluxo completo de edição do perfil com sucesso", function () {
    const dados = this.dados;

    // A partir daqui, o teste foca APENAS no formulário
    // Passo 2
    cy.get('[data-cy="next-button"]').click();

    // Passo 3
    cy.get('[data-cy="endereco.cep"]').type(dados.endereco.cep).blur();

    // Força o Cypress a esperar até que o campo de logradouro receba o texto da API
    // Certifique-se de usar o seletor correto (ex: data-cy="endereco.logradouro")
    cy.get('[data-cy="endereco.bairro"]', { timeout: 10000 }) // Dá um limite de até 10s para a API responder
      .should("not.have.value", "");

    // Passo 4
    cy.get('[data-cy="endereco.numero"]').clear().type(dados.endereco.numero);

    // Passo 5
    cy.get('[data-cy="next-button"]').click();

    // Passos 6 e 7
    cy.get('[data-cy="search-instituicao-id"]')
      .clear()
      .type(dados.instituicao.nome);
    cy.get('[data-cy="ufms-universidade-federal-do-mat"]').click();

    // Passos 8 e 9
    cy.get('[data-cy="search-unidade-id"]')
      .clear()
      .type(dados.instituicao.unidade);
    cy.get('[data-cy="facom-faculdade-de-computacao"]').click();

    // Passos 10 e 11
    cy.get('[data-cy="search-nivel-academico-id"]')
      .clear()
      .type(dados.formacao.nivelAcademico);
    cy.get('[data-cy="ensino-superior"]').click();

    // Passos 12 e 13
    cy.get('[data-cy="lattes"]').clear().type(dados.formacao.lattes);
    cy.get('[data-cy="linkedin"]').clear().type(dados.formacao.linkedin);

    // Passo 14 e 15
    cy.get('[data-cy="add-areas-de-conhecimento"]').click();
    //cy.get('[data-cy-index="areaDeConhecimento-0-expandable-item"]').click();

    // Passos 16 e 17
    cy.get('[data-cy="search-grande-area-id"]').type(
      dados.conhecimento.grandeArea,
    );
    cy.get('[data-cy="ciencias-exatas-e-da-terra"]').click();

    // Passos 18 e 19
    cy.get('[data-cy="search-area-id"]').type(dados.conhecimento.area);
    cy.get('[data-cy="ciencia-da-computacao"]').click();

    // Passos 20 e 21
    cy.get('[data-cy="search-sub-area-id"]').type(dados.conhecimento.subArea);
    cy.get('[data-cy="sistemas-de-computacao"]').click();

    // Passos 22 e 23
    cy.get('[data-cy="search-especialidade-id"]').type(
      dados.conhecimento.especialidade,
    );
    cy.get('[data-cy="arquitetura-de-sistemas-de-compu"]').click();

    cy.get('[data-cy="areaDeConhecimento-confirmar"]').click();

    // Passo 26
    cy.get('[data-cy="next-button"]').click();

    // Passo 27
    //cy.get('[data-cy="possui-vinculo-institucional-box"]').click();

    // Exemplo para o Passo 27 (ou qualquer checkbox/box)
    cy.get('[data-cy="possui-vinculo-institucional"]')
      .parent() // Sobe para o container que realmente tem o aria-checked
      .invoke("attr", "aria-checked")
      .then((estado) => {
        if (estado !== "true") {
          // Clica no container pai, que é quem interage com o usuário
          cy.get('[data-cy="possui-vinculo-institucional"]').parent().click();
        }
      });

    // Passos 28 e 29
    cy.get('[data-cy="search-tipo-vinculo-instituciona"]').clear().type(
      dados.vinculo.tipo,
    );
    cy.get('[data-cy="bolsista"]').click();

    // Passo 30
    cy.get('[data-cy="possui-vinculo-empregaticio-box"]').click();

    // Passo 31
    cy.get('[data-cy="vinculoInstitucional.inicioServico"]').clear().type(
      dados.vinculo.inicioServico,
    );

    // Passos 32 e 33
    cy.get('[data-cy="search-regime-trabalho-id"]').clear().type(dados.vinculo.regime);
    cy.get('[data-cy="outros"]:visible').click();

    // Passos 34 e 35
    cy.get('[data-cy="vinculoInstitucional.funcao"]').clear().type(
      dados.vinculo.funcao,
    );
    cy.get('[data-cy="vinculoInstitucional.inicioFuncao"]').clear().type(
      dados.vinculo.inicioFuncao,
    );

    // Passo 36
    cy.get('[data-cy="next-button"]').click();

    // Passos 37 e 38
    cy.get('[data-cy="select-categories-usuario-anexo"]').click();
    cy.get('[data-cy="documento-de-identificacao-com-f"]').click();

    // Passo 39 (Utilizando a funcionalidade nativa do Cypress para upload)
    cy.get('[data-cy="usuarioAnexo-upload"]').selectFile(
      "cypress/fixtures/lattes.pdf",
      { force: true },
    );

    // Passo 40
    cy.get('[data-cy="menu-finalizar"]').click();
  });
});
