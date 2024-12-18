describe('Validação de Formulário de Contato', () => {
    beforeEach(() => {
      // Visita a página antes de cada teste
      // Substitua pela URL correta do seu projeto
      cy.visit('https://edificiocopa.com.br') 
    });
  
    it.only('Deve mostrar erros de validação quando o formulário é enviado em branco', () => {
      // Localiza o formulário de maneira mais flexível
      cy.get('form[id="form1"]').then($form => {
        // Usa JavaScript puro para submeter o formulário
        cy.wrap($form[0]).invoke('submit');
      });
  
      // Verifica validação do campo Nome
      cy.get('input[name="name"]').then($input => {
        // Verifica se o campo está inválido
        cy.wrap($input)
          .should('have.attr', 'required')
          .and('satisfy', ($el) => $el[0].validity.valid === false);
  
        // Verifica mensagem de erro
        cy.get('.invalid-feedback')
          .contains('Por favor digite seu nome')
          .should('be.visible');
      });
  
      // Verifica validação do campo Telefone
      cy.get('input[name="telephone"]').then($input => {
        // Verifica se o campo está inválido
        cy.wrap($input)
          .should('have.attr', 'required')
          .and('satisfy', ($el) => $el[0].validity.valid === false);
  
        // Verifica mensagem de erro
        cy.get('.invalid-feedback')
          .contains('Por favor digite um telefone válido')
          .should('be.visible');
      });
  
      // Verifica validação do campo E-mail
      cy.get('input[name="email"]').then($input => {
        // Verifica se o campo está inválido
        cy.wrap($input)
          .should('have.attr', 'required')
          .and('satisfy', ($el) => $el[0].validity.valid === false);
  
        // Verifica mensagem de erro
        cy.get('.invalid-feedback')
          .contains('Por favor digite um e-mail válido')
          .should('be.visible');
      });
    });
  

  
    it('Deve validar formato de telefone incorreto', () => {
      // Preenche campos com dados inválidos
      cy.get('input[name="name"]').type('Nome Teste');
      cy.get('input[name="telephone"]').type('123'); // Telefone inválido
      cy.get('input[name="email"]').type('teste@email.com');
  
      // Submete o formulário
      cy.get('form[id="form1"]').within(() => {
        cy.get('button[type="submit"], input[type="submit"]').click();
      });
  
      // Verifica validação do telefone
      cy.get('input[name="telephone"]')
        .should('have.class', 'is-invalid')
        .parent()
        .find('.invalid-feedback')
        .should('be.visible')
        .and('contain', 'Por favor digite um telefone válido');
    });
  
    it('Deve validar formato de e-mail incorreto', () => {
      // Preenche campos com e-mail inválido
      cy.get('input[name="name"]').type('Nome Teste');
      cy.get('input[name="telephone"]').type('(11) 99999-9999');
      cy.get('input[name="email"]').type('emailinvalido'); // E-mail sem domínio
  
      // Submete o formulário
      cy.get('form[id="form1"]').within(() => {
        cy.get('button[type="submit"], input[type="submit"]').click();
      });
  
      // Verifica validação do e-mail
      cy.get('input[name="email"]')
        .should('have.class', 'is-invalid')
        .parent()
        .find('.invalid-feedback')
        .should('be.visible')
        .and('contain', 'Por favor digite um e-mail válido');
    });
  
   /* it('Deve permitir envio com dados válidos', () => {
      // Gera dados de teste
      const nome = `Teste ${Math.floor(Math.random() * 1000)}`;
      const telefone = '(11) 99999-9999';
      const email = `teste${Math.floor(Math.random() * 1000)}@email.com`;
  
      // Preenche todos os campos corretamente
      cy.get('input[name="name"]').type(nome);
      cy.get('input[name="telephone"]').type(telefone);
      cy.get('input[name="email"]').type(email);
  
      // Submete o formulário
      cy.get('form[id="form1"]').within(() => {
        cy.get('button[type="submit"], input[type="submit"]').click();
      });
  
      // Adicione aqui a verificação de sucesso do envio
      // Por exemplo:
      // cy.contains('.mensagem-sucesso', 'Formulário enviado com sucesso')
      //   .should('be.visible');
    });
  */
    it('Deve formatar automaticamente o campo de telefone', () => {
      // Testa a máscara de telefone para celular
      cy.get('input[name="telephone"]')
        .type('1199999999')
        .should('have.value', '(11) 99999-9999');
  
      // Limpa e testa para telefone fixo
      cy.get('input[name="telephone"]')
        .clear()
        .type('1133334444')
        .should('have.value', '(11) 3333-4444');
    });
  });