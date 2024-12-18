import Form from '../support/pageObjects/form-pageObjects'

describe('Teste de formulário - Almarias', () => {
  it('Preencher formulário e verificar redirecionamento para a página de Obrigado', () => {
    // Acessar a página Homolog
    cy.visit('https://almarias.devhagens.com.br/');
    //Acessar a página Produção
    //cy.visit('https://almarias.com.br/);

    //Clica no botão Descubra Almarias e ancora para o Formulário
    cy.contains('button', 'Descubra Almarias')
      .click();


    // Preencher o formulário
    cy.get('#InputNome1').type('Teste Desconsiderar');
    cy.get('#InputTelefone1').type('19999999999');
    cy.get('#InputEmail1').type('testedesconsiderar@teste.com');

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

    // Verificar se redireciona para a página de Obrigado
    // cy.url().should('include', 'https://almarias.devhagens.com.br/obrigado');
    // cy.contains('button', 'Voltar ao site').click();
  });
});