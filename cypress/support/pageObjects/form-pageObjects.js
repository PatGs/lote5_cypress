class Form{

  preencherForm(){
    cy.get('input[id="name"]').type('Teste Desconsiderar');
    cy.get('input[id="telephone"]').type('19999999999');
    cy.get('input[id="email"]').type('testedesconsiderar@teste.com.br');    

  }

    validarcanais1() {
        // Verifica o título da seção
        cy.get('.contact__form__contact-preference__title')
          .should('contain', 'Como prefere ser contactado?');
      
        // Lista de canais
        const canais = ['E-mail', 'WhatsApp', 'Telefone'];      
        // Itera sobre os canais
        canais.forEach((canal) => {
          // Verifica se o canal está visível
          cy.contains('label', canal).should('be.visible');      
          // Verifica o checkbox correspondente e o marca se não estiver habilitado
          cy.contains('label', canal)
            .find('input[type="checkbox"]')
            .should('exist')
            .then(($checkbox) => {
              // Se o checkbox não estiver marcado, marque-o
              if (!$checkbox.is(':checked')) {
                cy.wrap($checkbox).check({ force: true });
              }
            });
        });
      }

    politicaPrivacidade(){
      // Verifica se o checkbox está presente e visível
      cy.get('input[id="privacy-policy"]')
      .should('exist')
      .then(($checkbox) => {
        if (!$checkbox.is(':checked')) {
          // Simula o clique no botão de enviar
          cy.get('button[type="submit"]').click();

          // Verifica se a mensagem de erro é exibida
          cy.get('label .invalid-feedback')
            .should('be.visible')
            .and('contain', 'Você deve aceitar para prosseguir');
        } else {
          cy.log('Checkbox está marcado.');
        }
      });
    }

}  

export default new Form();