describe('Teste de formulário - Almarias', () => {
    it('Preencher formulário e verificar redirecionamento para a página de Obrigado', () => {

      //Acessar a página Produção
      cy.visit('https://almarias.com.br/');
  
      //Clica no botão Descubra Almarias e ancora para o Formulário
      cy.contains('button', 'Descubra Almarias')
        .click();
  
      // Preencher o formulário
    //   cy.get('#InputNome1').type('Teste Desconsiderar');
    //   cy.get('#InputTelefone1').type('19999999999');
    //   cy.get('#InputEmail1').type('testedesconsiderar@teste.com');
  
      // Verificar os checkboxes dos canais de contato
      const canais = [
          { id: '#check-email', nome: 'E-MAIL' },
          { id: '#check-whatsapp', nome: 'WHATSAPP' },
          { id: '#check-phone', nome: 'TELEFONE' },
      ];
  
      canais.forEach((canal) => {
          cy.get(canal.id)
            .should('exist') // Verifica que o checkbox existe
            .and('be.checked'); // Verifica que o checkbox está marcado
      });
  
      // Clicar no botão de enviar
      cy.get('#btnEnviar').click();
  
      // Capturar o alerta de envio do formulário para o teste em Produção
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Erro ao enviar!')
      });
  
      // Verificar se redireciona para a página de Obrigado Produção
      cy.url().should('include', 'https://almarias.com.br/obrigado');
      cy.contains('button', 'Voltar ao site').click();
    });
  });