import fixture from "../fixtures/submeter-proposta.json";


describe("Caracterização", () => {
  context("Submissão de Proposta com dados válidos", () => {
    before(() => {
      cy.typeLogin("anabitencourtottoni@gmail.com", "Anabanana123!!");
      cy.get('[data-cy="editais-ver-mais"]').click();
      cy.contains(
        "p.css-1jf25rm",
        `Edital ${fixture.edital.numero} ${fixture.edital.nome}`,
      )
        .closest(".css-1c1blcj")
        .find("button.sc-dzsvhq.coiQbB")
        .click();
      cy.get('[data-cy="criar-proposta"]').click();
    });

    it("Preencher subseções da proposta com dados válido", () => {
      const {
        proposta,
        areaConhecimento,
        informacoesComplementares,
        abrangencia,
        apresentacao,
        membros,
        atividades
      } = fixture;
        const atividade = atividades[0];


      // Informações iniciais
      cy.get('[data-cy="titulo"]').type(proposta.tituloProjeto);

      cy.get('[data-cy="open-tipo-evento-id"]').click();
      cy.get(`[data-cy="${proposta.tipoEvento}"]`).click();

      cy.get('[data-cy="open-estado-execucao-evento"]').click();
      cy.get(`[data-cy="${proposta.estadoExecucao}"]`).click();

      cy.get('[data-cy="open-municipio-execucao-evento"]').click();
      cy.get(`[data-cy="${proposta.municipioExecucao}"]`).click();

      cy.get('[data-cy="duracao"]').type(String(proposta.duracao));

      cy.get('[data-cy="open-instituicao-executora-id"]').click();
      cy.get(`[data-cy="${proposta.instituicaoExecutora}"]`).click();

      cy.get('[data-cy="open-unidade-executora-id"]').click();
      cy.get(`[data-cy="${proposta.unidadeExecutora}"]`).click();

      cy.get('[data-cy="add-areas-de-conhecimento"]').click();

      cy.get('[data-cy="open-grande-area-id"]').click();
      cy.get(`[data-cy="${areaConhecimento.grandeArea}"]`).click();

      cy.get('[data-cy="open-area-id"]').click();
      cy.get(`[data-cy="${areaConhecimento.area}"]`).click();

      cy.get('[data-cy="open-sub-area-id"]').click();
      cy.get(`[data-cy="${areaConhecimento.subArea}"]`).click();

      cy.get('[data-cy="open-especialidade-id"]').click();
      cy.get(`[data-cy="${areaConhecimento.especialidade}"]`).click();

      cy.get('[data-cy="areaDeConhecimento-confirmar"]').click();

      cy.get('[data-cy="next-button"]').click();

      // Informações complementares
      cy.get(
        `[data-cy-in="formularioPropostaInformacaoComplementar.pergunta-218-item-${informacoesComplementares.pergunta1RadioIndex}"]`,
      )
        .should("be.visible")
        .click();

      cy.get(
        '[data-cy="formularioPropostaInformacaoComplementar.pergunta-219"]',
      ).type(informacoesComplementares.pergunta2Texto);

      cy.get('[data-cy="next-button"]').click();

      // Abrangência
      cy.get('[data-cy="abrangencia"]').click();

      cy.get('[data-cy="add-button"]').click();
      cy.get('[data-cy="open-estado-id"]').click();
      cy.get(`[data-cy="${abrangencia[0].estado}"]`).click();
      cy.get('[data-cy="open-abrangencia-municipio"]').click();
      abrangencia[0].municipios.forEach((cy_val) => {
        cy.get(`[data-cy="${cy_val}"]`).click();
      });
      cy.get('[data-cy="close-abrangencia-municipio"]').click();
      cy.get('[data-cy="abrangencia-confirmar"]').click();

      cy.get('[data-cy="add-button"]').click();
      cy.get('[data-cy="open-estado-id"]').click();
      cy.get(`[data-cy="${abrangencia[1].estado}"]`).click();
      cy.get('[data-cy="open-abrangencia-municipio"]').click();
      abrangencia[1].municipios.forEach((cy_val) => {
        cy.get(`[data-cy="${cy_val}"]`).click();
      });
      cy.get('[data-cy="close-abrangencia-municipio"]').click();
      cy.get('[data-cy="abrangencia-confirmar"]').click();

      cy.contains("tr", "Mato Grosso do Sul")
        .find('[data-cy="editar-button"]')
        .click();
      cy.get('[data-cy="abrangencia-cancelar"]').click();
      cy.contains("Mato Grosso do Sul").should("be.visible");

      cy.contains("tr", "São Paulo").find('[data-cy="apagar-button"]').click();
      cy.get("body").then(($body) => {
        if ($body.find('[data-cy="confirmar-exclusao"]').length > 0) {
          cy.get('[data-cy="confirmar-exclusao"]').click();
        } else {
          cy.get('[data-cy="next-button"]').click();
        }
      });

      cy.contains("São Paulo").should("not.exist");
    //  cy.contains("Mato Grosso do Sul").should("be.visible");  nao entendi o uso disso??


//SUBSEÇÃO: APRESENTAÇÃO
//Descrição
      cy.get('[data-cy="apresentacao"]').click();
      cy.get('[data-cy="descricao"]').click();
      cy.get(`#radio-formularioPropostaDescritiva\\.pergunta-221-${apresentacao.pergunta221RadioIndex}`,)
        .should("exist")
        .check({ force: true });
      cy.get(`#radio-formularioPropostaDescritiva\\.pergunta-221-${apresentacao.pergunta221RadioIndex}`,)
      .should("be.checked");
      cy.get('[data-cy="formularioPropostaDescritiva.pergunta-222"]')
        .clear()
        .type(apresentacao.pergunta222Texto);
      cy.contains("button", /próxima etapa/i).click();

//Membros
      cy.get('[data-cy="membros"]').click();
      // Verifica membro já existente
      cy.get('td[data-label="Nome"]').contains(membros.membroExistente.nome).should("be.visible");
      cy.get('td[data-label="Instituição"]').contains(membros.membroExistente.instituicao).should("be.visible");
      cy.get('td[data-label="Função do membro"]').contains(membros.membroExistente.funcao).should("be.visible");
      // Pesquisa e seleciona novo membro
      cy.get(".MuiAutocomplete-inputRoot")
        .find("input")
        .clear()
        .type(membros.novoMembro.nomePesquisador);

      cy.contains('[class*="option"]', membros.novoMembro.nomePesquisador)
        .first()
        .click();
      // Clica em Adicionar
      cy.get(".MuiStack-root.e1syh6en9.css-1ivu1e4").click();

      // Confirma aviso de convite
      cy.get('.css-5ldc9l > .css-0').should('be.visible').and('contain.text', 'Deseja continuar mesmo assim?');
      cy.get('[data-cy="sim-continuar-button"]').click();
      // Verifica mensagem de sucesso
      cy.contains(/sucesso/i).should("be.visible");
      cy.get('[data-cy="confirmar-button"]').click();
      // Verifica que o membro existente ainda aparece
      cy.get('td[data-label="Nome"]').contains(membros.membroExistente.nome).should("be.visible");
      cy.get('td[data-label="Instituição"]').contains(membros.membroExistente.instituicao).should("be.visible");
      // Altera a função do novo membro para o valor definido na fixture
      cy.get('td[data-label="Nome"]').contains(membros.novoMembro.nomePesquisador).should("be.visible");

      cy.contains("tr", membros.novoMembro.nomePesquisador)
        .find('[data-testid="ArrowDropDownIcon"]')
        .click();

      cy.contains('[class*="option"]', membros.novoMembro.funcao).first().click();
//Atividades
      cy.get('[data-cy="atividades"]').click();
      cy.contains("button", /adicionar/i).click();

      cy.get('[data-cy="propostaAtividadeForm.titulo"]')
        .clear()
        .type(atividade.titulo);

      cy.get('[data-cy="propostaAtividadeForm.descricao"]')
        .clear()
        .type(atividade.descricao);

      cy.get('[data-cy="open-mes-inicio"]').click();
      cy.get('[data-cy="5"]').click();

      cy.get('[data-cy="search-duracao"]').click();
      cy.get('[data-cy="1-mes"]').click();

      cy.get('[data-cy="open-carga-horaria-semanal"]').click();
      cy.get('[data-cy="2-horas"]').click();

      cy.get('[data-cy="propostaAtividade-confirmar"]').click();

//Visualizar
      // Navega para Visualização das Atividades e verifica o título criado
      cy.get('[data-cy="visualizacao-das-atividades"]').click();
      cy.contains(atividade.titulo).should("be.visible");

      //Próxima etapa:
      cy.get('[data-cy="next-button"]').click();
    });
  });
});


//De acordo com o ID: US-16 "Adicionar anexos"
//Quem realiza é o coordenador
describe("Anexos", () => {
  context("Submissão na seção de Anexos com dados válidos", () => {
    before(() => {
      cy.visit("/");

      // 2. O usuário vai para área com todos os editais abertos (Clicar no botão Ver Mais na tabela Editais Abertos na home do sistema).
      cy.get(".css-18juej0.ekicsf50").first().click();

      // 3. Procura o edital [Edital 2026-0001 Sig Cypress] e clica no botão Visualizar Edital.
      cy.contains(".sc-dzsvhq.coiQbB", fixture.edital.numero).click();

      // 4. Verifica se está no edital de interesse e clica no botão Criar Proposta.
      cy.get('[data-cy="criar-proposta"]').click();

      // Acessa a seção de Anexos
      cy.get('[data-cy="anexos"]').click();
    });

    //De acordo com o ID: US-17 "Anexar documentos pessoais"
    it("Documentos pessoais com dados válidos", () => {

      
      //Clica na seção de Documentos pessoais
      cy.get('[data-cy="documentos-pessoais" ]').click();

      // Seleciona categoria do documento
      cy.get('[data-cy="select-categories-usuario-anexo"]').click();
      cy.contains('Documento de identificação com foto').click(); //a categoria que está no seletor

      // Faz upload do arquivo
      cy.get('[data-cy="usuarioAnexo-upload"]')
        .selectFile('cypress/fixtures/Documento.pdf'); //documento pdf de exemplo na pasta fixtures

      // Clica no botão de salvar
      cy.get('[data-cy="menu-salvar"]').click();
    });

    //De acordo com o ID: US-18 "Anexar documentos da proposta"
    it("Documentos da Proposta com dados válidos", () => {
      //Clica na seção de Documentos da Proposta
      cy.get('[data-cy="documentos-da-proposta"]').click();

      // Seleciona categoria do documento 
      cy.get('[data-cy="open-select-categories-documento"]').click();
      cy.contains('Documento 1').click(); //a categoria que está no seletor

      // Faz upload do arquivo
      cy.get('[data-cy="documentoPropostaAnexo-upload"]')
        .selectFile('cypress/fixtures/Documento1.pdf'); //documento pdf de exemplo na pasta fixtures
      
      // Clica no botão de salvar
      cy.get('[data-cy="menu-salvar"]').click();
    });
  });
});

describe("Finalização", () => {
  context("Finalizar a submissão da proposta", () => {
     before(() => {
      cy.visit("/");

      // 2. O usuário vai para área com todos os editais abertos (Clicar no botão Ver Mais na tabela Editais Abertos na home do sistema).
      cy.get(".css-18juej0.ekicsf50").first().click();

      // 3. Procura o edital [Edital 2026-0001 Sig Cypress] e clica no botão Visualizar Edital.
      cy.contains(".sc-dzsvhq.coiQbB", fixture.edital.numero).click();

      // 4. Verifica se está no edital de interesse e clica no botão Criar Proposta.
      cy.get('[data-cy="criar-proposta"]').click();

      // Acessa a seção de Finalização
      cy.get('[data-cy="finalizacao"]').click();
    });

    it("Visualizar proposta", () => {
      //Clina na seção visualizar proposta
      cy.get('[data-cy="visualizacao-da-proposta"]').click();

      // Clica no botão de salvar
      cy.get('[data-cy="menu-salvar"]').click();
    });
    //De acordo com o ID: US-20 "Termo de aceite"
    it("Preencher Termo de aceite", () => {
      //Clina na seção termo de aceite
      cy.get('[data-cy="termo-de-aceite"]').click();

      //Preenche o campo de aceite do termo
      cy.get('[data-cy="termo-de-aceite-aceito-box"]').click();

      // Clica no botão de salvar
      cy.get('[data-cy="menu-salvar"]').click();

      //Clica no botão verificar pendências
      cy.get('[data-cy="menu-verificar-pendencias"]').click();
    });
  });
});