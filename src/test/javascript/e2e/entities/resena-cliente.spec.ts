import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ResenaCliente e2e test', () => {

    let navBarPage: NavBarPage;
    let resenaClienteDialogPage: ResenaClienteDialogPage;
    let resenaClienteComponentsPage: ResenaClienteComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ResenaClientes', () => {
        navBarPage.goToEntity('resena-cliente');
        resenaClienteComponentsPage = new ResenaClienteComponentsPage();
        expect(resenaClienteComponentsPage.getTitle())
            .toMatch(/Resena Clientes/);

    });

    it('should load create ResenaCliente dialog', () => {
        resenaClienteComponentsPage.clickOnCreateButton();
        resenaClienteDialogPage = new ResenaClienteDialogPage();
        expect(resenaClienteDialogPage.getModalTitle())
            .toMatch(/Create or edit a Resena Cliente/);
        resenaClienteDialogPage.close();
    });

    it('should create and save ResenaClientes', () => {
        resenaClienteComponentsPage.clickOnCreateButton();
        resenaClienteDialogPage.setFechaCreacionInput('2000-12-31');
        expect(resenaClienteDialogPage.getFechaCreacionInput()).toMatch('2000-12-31');
        resenaClienteDialogPage.setCalificacionInput('5');
        expect(resenaClienteDialogPage.getCalificacionInput()).toMatch('5');
        resenaClienteDialogPage.setComentarioInput('comentario');
        expect(resenaClienteDialogPage.getComentarioInput()).toMatch('comentario');
        resenaClienteDialogPage.comercioSelectLastOption();
        resenaClienteDialogPage.clienteSelectLastOption();
        resenaClienteDialogPage.save();
        expect(resenaClienteDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ResenaClienteComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-resena-cliente div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ResenaClienteDialogPage {
    modalTitle = element(by.css('h4#myResenaClienteLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaCreacionInput = element(by.css('input#field_fechaCreacion'));
    calificacionInput = element(by.css('input#field_calificacion'));
    comentarioInput = element(by.css('input#field_comentario'));
    comercioSelect = element(by.css('select#field_comercio'));
    clienteSelect = element(by.css('select#field_cliente'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFechaCreacionInput = function(fechaCreacion) {
        this.fechaCreacionInput.sendKeys(fechaCreacion);
    };

    getFechaCreacionInput = function() {
        return this.fechaCreacionInput.getAttribute('value');
    };

    setCalificacionInput = function(calificacion) {
        this.calificacionInput.sendKeys(calificacion);
    };

    getCalificacionInput = function() {
        return this.calificacionInput.getAttribute('value');
    };

    setComentarioInput = function(comentario) {
        this.comentarioInput.sendKeys(comentario);
    };

    getComentarioInput = function() {
        return this.comentarioInput.getAttribute('value');
    };

    comercioSelectLastOption = function() {
        this.comercioSelect.all(by.tagName('option')).last().click();
    };

    comercioSelectOption = function(option) {
        this.comercioSelect.sendKeys(option);
    };

    getComercioSelect = function() {
        return this.comercioSelect;
    };

    getComercioSelectedOption = function() {
        return this.comercioSelect.element(by.css('option:checked')).getText();
    };

    clienteSelectLastOption = function() {
        this.clienteSelect.all(by.tagName('option')).last().click();
    };

    clienteSelectOption = function(option) {
        this.clienteSelect.sendKeys(option);
    };

    getClienteSelect = function() {
        return this.clienteSelect;
    };

    getClienteSelectedOption = function() {
        return this.clienteSelect.element(by.css('option:checked')).getText();
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
