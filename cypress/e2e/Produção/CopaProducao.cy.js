/* PARA RODAR OS TESTES EM PRODUÇÃO PRECISA REMOVER
    O COMENTÁRIO DA FUNÇÃO DE PREENCHER O FORMULÁRIO
        "Form.preencherForm()"
*/

import Form from '../support/pageObjects/form-pageObjects'

describe('Teste de formulário - Edifício Copa', () => {
  it('Preencher formulário e verificar redirecionamento para a página de Obrigado', () => {
    // Acessar a página em Produção
    cy.visit('https://edificiocopa.com.br/');

    //Clica no primeiro botão Saiba Mais e ancora para o Formulário
    cy.get('a.cta__btn[href="#saiba-mais"]')
      .eq(0)
      .click();

    //Localiza o texto do primeiro Formulário
    cy.get('.contact__title.text-uppercase')
      .eq(0)
      .should('contain', 'Agende seu atendimento');

    //Preencher os campos de inputs do Formulário
    //Form.preencherForm();

    //Valida se os canais de comunicação estão habilitados
    Form.validarcanais1();

    //Valida se o checkbox da Política de Privacidade está habilitado
    Form.politicaPrivacidade(); 

    // Clicar no botão Enviar
    cy.contains('button', 'Enviar').click();

    // Verificar se redireciona para a página de Obrigado
    cy.url().should('include', 'https://edificiocopa.com.br/obrigado.html');
    cy.get('.cta__btn')
      .should('contain','Voltar ao site')
      .click();
  });
});