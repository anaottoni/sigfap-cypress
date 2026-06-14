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

    it("Informações iniciais, Informações complementares, Abrangência", () => {
      const {
        proposta,
        areaConhecimento,
        informacoesComplementares,
        abrangencia,
      } = fixture;

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
      cy.contains("Mato Grosso do Sul").should("be.visible");
    });
  });
});
