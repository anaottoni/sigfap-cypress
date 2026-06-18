import fixture from "../fixtures/submeter-proposta.json";

describe("Caracterização", () => {
  context(
    "Submissão de Proposta com dados válidos",
    { testIsolation: false },
    () => {
      before(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();

        cy.typeLogin("anabitencourtottoni@gmail.com", "Anabanana123!!");
        cy.get('[data-cy="editais-ver-mais"]').click();
        cy.contains(fixture.edital.numero)
          .closest(".e16onss632")
          .find(".e1krp9ay13")
          .click();
        cy.get('[data-cy="criar-proposta"]').click();
      });

      it("Preencher subseções de caracterização com dados válido", () => {
        const {
          proposta,
          areaConhecimento,
          informacoesComplementares,
          abrangencia,
        } = fixture;

        cy.get('[data-cy="caracterizacao"]').click();

        // Informações iniciais
        cy.get('[data-cy="titulo"]').type(proposta.tituloProjeto);

        cy.get('[data-cy="open-tipo-evento-id"]').click();
        cy.get(`[data-cy="${proposta.tipoEvento}"]`).click();

        cy.get('[data-cy="open-estado-execucao-evento"]').click();
        cy.get(`[data-cy="${proposta.estadoExecucao}"]`).click();

        cy.get('[data-cy="open-municipio-execucao-evento"]').click();
        cy.get(`[data-cy="${proposta.municipioExecucao}"]`).click();

        cy.get('[data-cy="duracao"]').clear().type(String(proposta.duracao));

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

        cy.contains("tr", "São Paulo")
          .find('[data-cy="apagar-button"]')
          .click();
        cy.get("body").then(($body) => {
          if ($body.find('[data-cy="confirmar-exclusao"]').length > 0) {
            cy.get('[data-cy="confirmar-exclusao"]').click();
          } else {
            cy.get('[data-cy="next-button"]').click();
          }
        });

        cy.contains("São Paulo").should("not.exist");
      });

      it("Preencher subseção de coordenação com dados válidos", () => {
        const { coordenacao } = fixture;

        cy.get('[data-cy="next-button"]').click();

        // Passo 3
        cy.get('[data-cy="criadoPor.endereco.cep"]')
          .type(coordenacao.endereco.cep)
          .blur();

        cy.get('[data-cy="criadoPor.endereco.bairro"]', {
          timeout: 10000,
        }).should("not.have.value", "");

        // Passo 4
        cy.get('[data-cy="criadoPor.endereco.numero"]')
          .clear()
          .type(coordenacao.endereco.numero);

        // Passo 5
        cy.get('[data-cy="next-button"]').click();

        // Passos 6 e 7
        cy.get('[data-cy="search-instituicao-id"]')
          .clear()
          .type(coordenacao.instituicao.nome);
        cy.get('[data-cy="ufms-universidade-federal-do-mat"]').click();

        // Passos 8 e 9
        cy.get('[data-cy="search-unidade-id"]')
          .clear()
          .type(coordenacao.instituicao.unidade);
        cy.get('[data-cy="facom-faculdade-de-computacao"]').click();

        // Passos 10 e 11
        cy.get('[data-cy="search-nivel-academico-id"]')
          .clear()
          .type(coordenacao.formacao.nivelAcademico);
        cy.get('[data-cy="ensino-superior"]').click();

        // Passos 12 e 13
        cy.get('[data-cy="criadoPor.lattes"]')
          .clear()
          .type(coordenacao.formacao.lattes);
        cy.get('[data-cy="criadoPor.linkedin"]')
          .clear()
          .type(coordenacao.formacao.linkedin);

        // Passo 14 e 15
        cy.get('[data-cy="add-areas-de-conhecimento"]').click();

        // Passos 16 e 17
        cy.get('[data-cy="search-grande-area-id"]').type(
          coordenacao.conhecimento.grandeArea,
        );
        cy.get('[data-cy="ciencias-exatas-e-da-terra"]').click();

        // Passos 18 e 19
        cy.get('[data-cy="search-area-id"]').type(
          coordenacao.conhecimento.area,
        );
        cy.get('[data-cy="ciencia-da-computacao"]').click();

        // Passos 20 e 21
        cy.get('[data-cy="search-sub-area-id"]').type(
          coordenacao.conhecimento.subArea,
        );
        cy.get('[data-cy="sistemas-de-computacao"]').click();

        // Passos 22 e 23
        cy.get('[data-cy="search-especialidade-id"]').type(
          coordenacao.conhecimento.especialidade,
        );
        cy.get('[data-cy="arquitetura-de-sistemas-de-compu"]').click();

        cy.get('[data-cy="criadoPor.areaDeConhecimento-confirmar"]').click();

        // Passo 26
        cy.get('[data-cy="next-button"]').click();

        // Passo 27
        cy.get('[data-cy="possui-vinculo-institucional"]')
          .parent()
          .invoke("attr", "aria-checked")
          .then((estado) => {
            if (estado !== "true") {
              cy.get('[data-cy="possui-vinculo-institucional"]')
                .parent()
                .click();
            }
          });

        // Passos 28 e 29
        cy.get('[data-cy="search-tipo-vinculo-instituciona"]')
          .clear()
          .type(coordenacao.vinculo.tipo);
        cy.get('[data-cy="bolsista"]').click();

        // Passo 30
        cy.get('[data-cy="possui-vinculo-empregaticio-box"]')
          .parent()
          .invoke("attr", "aria-checked")
          .then((estado) => {
            if (estado !== "true") {
              cy.get('[data-cy="possui-vinculo-empregaticio-box"]')
                .parent()
                .click();
            }
          });

        // Passo 31
        cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioServico"]')
          .clear()
          .type(coordenacao.vinculo.inicioServico)
          .type("{esc}"); // <-- Força o calendário a fechar imediatamente

        // Passos 32 e 33
        cy.get('[data-cy="search-regime-trabalho-id"]')
          .clear({ force: true })
          .type(coordenacao.vinculo.regime, { force: true });
        cy.get('[data-cy="outros"]:visible').click();

        // Passos 34 e 35
        cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]')
          .clear()
          .type(coordenacao.vinculo.funcao);
        cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioFuncao"]')
          .clear()
          .type(coordenacao.vinculo.inicioFuncao)
          .type("{esc}"); // <-- Força o calendário a fechar imediatamente

        // Passo 36
        cy.get('[data-cy="next-button"]').click();

        // Passo 40
        cy.get('[data-cy="menu-salvar"]').click();
      });

      it("Preencher subseções de apresentação com dados válidos", () => {
        const { apresentacao, membros, atividades } = fixture;
        const atividade = atividades[0];

        //SUBSEÇÃO: APRESENTAÇÃO
        //Descrição
        cy.get('[data-cy="apresentacao"]').click();
        cy.get('[data-cy="descricao"]').click();
        cy.get('[data-cy="formularioPropostaDescritiva.pergunta-221-item-opcao-1"] > [name="formularioPropostaDescritiva.pergunta-221"]')
          .should("exist")
          .check({ force: true });
        cy.get('[data-cy="formularioPropostaDescritiva.pergunta-221-item-opcao-1"] > [name="formularioPropostaDescritiva.pergunta-221"]').should("be.checked");
        cy.get('[data-cy="formularioPropostaDescritiva.pergunta-222"]')
          .clear()
          .type(apresentacao.pergunta222Texto);
        cy.contains("button", /próxima etapa/i).click();

        //Membros
        cy.get('[data-cy="membros"]').click();
        // Verifica membro já existente
        cy.get('td[data-label="Nome"]')
          .contains(membros.membroExistente.nome)
          .should("be.visible");
        cy.get('td[data-label="Instituição"]')
          .contains(membros.membroExistente.instituicao)
          .should("be.visible");
        cy.get('td[data-label="Função do membro"]')
          .contains(membros.membroExistente.funcao)
          .should("be.visible");

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
        cy.get('[data-cy="2"]').click();

        cy.get('[data-cy="search-duracao"]').click();
        cy.get('[data-cy="1-mes"]').click();

        cy.get('[data-cy="open-carga-horaria-semanal"]').click();
        cy.get('[data-cy="2-horas"]').click();

        cy.get('[data-cy="propostaAtividade-confirmar"]').click();

        //Visualizar
        cy.get('[data-cy="visualizacao-das-atividades"]').click();
        cy.contains(atividade.titulo).should("be.visible");

        //Próxima etapa:
        cy.get('[data-cy="next-button"]').click();
      });

      it("Preencher subseções de orçamento com dados válidos", () => {
        // Acessa a seção principal de Orçamento no menu lateral
        cy.get('[data-cy="orcamento"]').click();

        // Navega e preenche a subseção de Faixa de Financiamento
        cy.get('[data-cy="faixa-de-financiamento"]').click();
        cy.get('[data-cy="search-faixa-financiamento-id"]').click().type('Faixa A{enter}');
        cy.get('[data-cy="menu-salvar"]').click();

        // Navega e valida o salvamento da subseção de Serviços de Terceiros
        cy.get('[data-cy="servicos-de-terceiros"]').click();
        cy.get('[data-cy="menu-salvar"]').click();

        // Navega para a subseção de Bolsa e aciona o formulário de inclusão
        cy.get('[data-cy="bolsa"]').click();
        cy.get('[data-cy="add-button"]').click();
        
        // Preenche os campos obrigatórios do formulário da rubrica de Bolsa
        cy.get('[data-cy="search-modalidade-bolsa-id"]').click().type('AT{enter}');
        cy.get('[data-cy="search-nivel-bolsa-id"]').click().type('NS{enter}');
        cy.get('[data-cy="rubricaBolsaForm.quantidade"]').clear().type('1');
        cy.get('[data-cy="search-duracao"]').click().type('2{enter}');
        cy.get('[data-cy="rubricaBolsaForm.valorTotal"]').clear().type('240000');
        
        // Confirma a inclusão dos dados da bolsa e salva o progresso
        cy.get('[data-cy="rubricaBolsa-confirmar"]').click();
        cy.get('[data-cy="menu-salvar"]').click();

        // Navega para a Consolidação e valida se o valor total está visível na tela
        cy.get('[data-cy="consolidacao"]').click();
        cy.get('body').then(($body) => {
          if ($body.text().includes('2.400,00')) {
            cy.contains('2.400,00').should('be.visible');
          } else {
            cy.contains('240000').should('be.visible');
          }
        });

        // Navega e finaliza a última subseção do módulo de Orçamento
        cy.get('[data-cy="solicitado-a-fundacao"]').click();
        cy.get('[data-cy="menu-salvar"]').click();

        // Avança para a próxima etapa do fluxo de submissão
        cy.get('[data-cy="next-button"]').click();
      });

      it("Preencher subseção de anexos com dados válidos", () => {
        cy.get('[data-cy="anexos"]').click();
        cy.get('[data-cy="documentos-pessoais" ]').click();
        cy.get('[data-cy="select-categories-criado-por-usu"]').click();
        cy.get('[data-cy="documento-de-identificacao-com-f"]').click();
        cy.get('[data-cy="criadoPor.usuarioAnexo-upload"]').selectFile(
          "cypress/fixtures/Documento.pdf",
          { force: true },
        );
        cy.get('[data-cy="menu-salvar"]').click();

        //Próxima etapa: Documentos da proposta
        cy.get('[data-cy="next-button"]').click();
        //ou
        //cy.get('[data-cy="documentos-da-proposta"]').click();
        cy.get('[data-cy="select-categories-documento-prop"]').click();
        cy.get('[data-cy="carta-de-apresentacao"]').click();
        cy.get('[data-cy="documentoPropostaAnexo-upload"]').selectFile(
          "cypress/fixtures/Documento1.pdf",
          { force: true },
        );

        cy.get('[data-cy="menu-salvar"]').click();

        //Próxima etapa: Finalização e Visualização da proposta
        cy.get('[data-cy="next-button"]').click();
        //ou
        //cy.get('[data-cy="finalizacao"]').click();
        //Visualizar proposta:
        //Clina na seção visualizar proposta
        //cy.get('[data-cy="visualizacao-da-proposta"]').click();

        //Próxima etapa: Termo de aceite
        cy.get('[data-cy="next-button"]').click();
        //ou
        //cy.get('[data-cy="termo-de-aceite"]').click();

        //Preenche o campo de aceite do termo
        cy.get('[data-cy="termo-de-aceite-aceito-box"]').click();

        // Clica no botão de salvar
        cy.get('[data-cy="menu-salvar"]').click();

        //Clica no botão verificar pendências
        cy.get('[data-cy="menu-verificar-pendencias"]').click();

        //Submete a proposta
        cy.get(".css-1alpf6f.ebva1ex2").click();
      });
    },
  );
});