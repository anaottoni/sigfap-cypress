import fixture from "../fixtures/submeter-proposta.json";

describe("Caracterização", () => {
  context("Submissão na seção de Caracterização com dados válidos", () => {
    before(() => {
      cy.visit("/");

      // 2. O usuário vai para área com todos os editais abertos (Clicar no botão Ver Mais na tabela Editais Abertos na home do sistema).
      cy.get(".css-18juej0.ekicsf50").first().click();

      // 3. Procura o edital [Edital 2026-0001 Sig Cypress] e clica no botão Visualizar Edital.
      cy.contains(".sc-dzsvhq.coiQbB", fixture.edital.numero).click();

      // 4. Verifica se está no edital de interesse e clica no botão Criar Proposta.
      cy.get('[data-cy="criar-proposta"]').click();
    });

    // 5. Vai para seção "Caracterização" e preenche e salva a cada sub-seção.
    it("Informações iniciais", () => {
      const { proposta, areaConhecimento } = fixture;

      cy.get('[data-cy="titulo"]')
        .should("not.be.disabled")
        .clear()
        .type(proposta.tituloProjeto);

      cy.get('[data-cy="search-tipo-evento-id"]').click();
      cy.get('[data-cy="search-tipo-evento-id"] input')
        .clear()
        .type(proposta.tipoEvento);
      cy.contains('[class*="option"]', proposta.tipoEvento).first().click();

      cy.get('[data-cy="search-estado-execucao-evento"]').click();
      cy.get('[data-cy="search-estado-execucao-evento"] input')
        .clear()
        .type(proposta.estadoExecucao);
      cy.contains('[class*="option"]', proposta.estadoExecucao).first().click();

      cy.get('[data-cy="search-municipio-execucao-evento"]').click();
      cy.get('[data-cy="search-municipio-execucao-evento"] input')
        .clear()
        .type(proposta.municipioExecucao);
      cy.contains('[class*="option"]', proposta.municipioExecucao)
        .first()
        .click();

      cy.get('[data-cy="duracao"]').clear().type(String(proposta.duracao));

      cy.get('[data-cy="search-instituicao-executora-id"]').click();
      cy.get('[data-cy="search-instituicao-executora-id"] input')
        .clear()
        .type(proposta.instituicaoExecutora);
      cy.contains('[class*="option"]', proposta.instituicaoExecutora)
        .first()
        .click();

      cy.get('[data-cy="search-unidade-executora-id"]').click();
      cy.get('[data-cy="search-unidade-executora-id"] input')
        .clear()
        .type(proposta.unidadeExecutora);
      cy.contains('[class*="option"]', proposta.unidadeExecutora)
        .first()
        .click();

      cy.get('[data-cy="add-areas-de-conhecimento"]').click();

      cy.get('[data-cy="search-grande-area-id"]').click();
      cy.get('[data-cy="search-grande-area-id"] input')
        .clear()
        .type(areaConhecimento.grandeArea);
      cy.contains('[class*="option"]', areaConhecimento.grandeArea)
        .first()
        .click();

      cy.get('[data-cy="search-area-id"]').click();
      cy.get('[data-cy="search-area-id"] input')
        .clear()
        .type(areaConhecimento.area);
      cy.contains('[class*="option"]', areaConhecimento.area).first().click();

      cy.get('[data-cy="search-sub-area-id"]').click();
      cy.get('[data-cy="search-sub-area-id"] input')
        .clear()
        .type(areaConhecimento.subArea);
      cy.contains('[class*="option"]', areaConhecimento.subArea)
        .first()
        .click();

      cy.get('[data-cy="search-especialidade-id"]').click();
      cy.get('[data-cy="search-especialidade-id"] input')
        .clear()
        .type(areaConhecimento.especialidade);
      cy.contains('[class*="option"]', areaConhecimento.especialidade)
        .first()
        .click();

      cy.get('[data-cy="areaDeConhecimento-confirmar"]').click();

      cy.contains(areaConhecimento.grandeArea).should("be.visible");

      cy.contains("button", /próxima etapa/i).click();
    });

    it("Informações complementares", () => {
      const { informacoesComplementares } = fixture;

      cy.get('[data-cy="informacoes-complementares"]').click();

      cy.get(
        `#radio-formularioPropostaInformacaoComplementar.pergunta-218-${informacoesComplementares.pergunta1RadioIndex}`,
      )
        .should("exist")
        .check({ force: true });

      cy.get(
        `#radio-formularioPropostaInformacaoComplementar.pergunta-218-${informacoesComplementares.pergunta1RadioIndex}`,
      ).should("be.checked");

      cy.get(
        '[data-cy="formularioPropostaInformacaoComplementar.pergunta-219"]',
      )
        .clear()
        .type(informacoesComplementares.pergunta2Texto);

      cy.contains("button", /próxima etapa/i).click();
    });

    it("Abrangência", () => {
      const { abrangencia } = fixture;

      cy.get('[data-cy="abrangencia"]').click();

      cy.get('[data-cy="add-button"]').click();

      cy.get('[data-cy="search-estado-id"]').click();
      cy.get('[data-cy="search-estado-id"] input')
        .clear()
        .type(abrangencia[0].estado);
      cy.contains('[class*="option"]', abrangencia[0].estado).first().click();

      cy.get('[data-cy="search-abrangencia-municipio"]').click();
      cy.get('[data-cy="search-abrangencia-municipio"] input')
        .clear()
        .type(abrangencia[0].municipios[0]);
      cy.contains('[class*="option"]', abrangencia[0].municipios[0])
        .first()
        .click();

      cy.get('[data-cy="search-abrangencia-municipio"] input')
        .clear()
        .type(abrangencia[0].municipios[1]);
      cy.contains('[class*="option"]', abrangencia[0].municipios[1])
        .first()
        .click();

      cy.get('[data-cy="search-abrangencia-municipio"] input')
        .clear()
        .type(abrangencia[0].municipios[2]);
      cy.contains('[class*="option"]', abrangencia[0].municipios[2])
        .first()
        .click();

      cy.get('[data-cy="abrangencia-confirmar"]').click();
      cy.contains(abrangencia[0].estado).should("be.visible");

      cy.get('[data-cy="add-button"]').click();

      cy.get('[data-cy="search-estado-id"]').click();
      cy.get('[data-cy="search-estado-id"] input')
        .clear()
        .type(abrangencia[1].estado);
      cy.contains('[class*="option"]', abrangencia[1].estado).first().click();

      cy.get('[data-cy="search-abrangencia-municipio"]').click();
      cy.get('[data-cy="search-abrangencia-municipio"] input')
        .clear()
        .type(abrangencia[1].municipios[0]);
      cy.contains('[class*="option"]', abrangencia[1].municipios[0])
        .first()
        .click();

      cy.get('[data-cy="search-abrangencia-municipio"] input')
        .clear()
        .type(abrangencia[1].municipios[1]);
      cy.contains('[class*="option"]', abrangencia[1].municipios[1])
        .first()
        .click();

      cy.get('[data-cy="search-abrangencia-municipio"] input')
        .clear()
        .type(abrangencia[1].municipios[2]);
      cy.contains('[class*="option"]', abrangencia[1].municipios[2])
        .first()
        .click();

      cy.get('[data-cy="search-abrangencia-municipio"] input')
        .clear()
        .type(abrangencia[1].municipios[3]);
      cy.contains('[class*="option"]', abrangencia[1].municipios[3])
        .first()
        .click();

      cy.get('[data-cy="search-abrangencia-municipio"] input')
        .clear()
        .type(abrangencia[1].municipios[4]);
      cy.contains('[class*="option"]', abrangencia[1].municipios[4])
        .first()
        .click();

      cy.get('[data-cy="search-abrangencia-municipio"] input')
        .clear()
        .type(abrangencia[1].municipios[5]);
      cy.contains('[class*="option"]', abrangencia[1].municipios[5])
        .first()
        .click();

      cy.get('[data-cy="search-abrangencia-municipio"] input')
        .clear()
        .type(abrangencia[1].municipios[6]);
      cy.contains('[class*="option"]', abrangencia[1].municipios[6])
        .first()
        .click();

      cy.get('[data-cy="search-abrangencia-municipio"] input')
        .clear()
        .type(abrangencia[1].municipios[7]);
      cy.contains('[class*="option"]', abrangencia[1].municipios[7])
        .first()
        .click();

      cy.get('[data-cy="abrangencia-confirmar"]').click();
      cy.contains(abrangencia[1].estado).should("be.visible");

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
          cy.contains("button", /confirmar|sim|ok/i).click();
        }
      });

      cy.contains("São Paulo").should("not.exist");
      cy.contains("Mato Grosso do Sul").should("be.visible");
    });
  });
});
