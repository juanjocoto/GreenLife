import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Cliente e2e test', () => {

    let navBarPage: NavBarPage;
    let clienteDialogPage: ClienteDialogPage;
    let clienteComponentsPage: ClienteComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Clientes', () => {
        navBarPage.goToEntity('cliente');
        clienteComponentsPage = new ClienteComponentsPage();
        expect(clienteComponentsPage.getTitle())
            .toMatch(/Clientes/);

    });

    it('should load create Cliente dialog', () => {
        clienteComponentsPage.clickOnCreateButton();
        clienteDialogPage = new ClienteDialogPage();
        expect(clienteDialogPage.getModalTitle())
            .toMatch(/Create or edit a Cliente/);
        clienteDialogPage.close();
    });

    it('should create and save Clientes', () => {
        clienteComponentsPage.clickOnCreateButton();
        clienteDialogPage.usuarioSelectLastOption();
        clienteDialogPage.save();
        expect(clienteDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ClienteComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cliente div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ClienteDialogPage {
    modalTitle = element(by.css('h4#myClienteLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    usuarioSelect = element(by.css('select#field_usuario'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    usuarioSelectLastOption = function() {
        this.usuarioSelect.all(by.tagName('option')).last().click();
    };

    usuarioSelectOption = function(option) {
        this.usuarioSelect.sendKeys(option);
    };

    getUsuarioSelect = function() {
        return this.usuarioSelect;
    };

    getUsuarioSelectedOption = function() {
        return this.usuarioSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
