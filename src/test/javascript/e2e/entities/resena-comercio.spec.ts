import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ResenaComercio e2e test', () => {

    let navBarPage: NavBarPage;
    let resenaComercioDialogPage: ResenaComercioDialogPage;
    let resenaComercioComponentsPage: ResenaComercioComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ResenaComercios', () => {
        navBarPage.goToEntity('resena-comercio');
        resenaComercioComponentsPage = new ResenaComercioComponentsPage();
        expect(resenaComercioComponentsPage.getTitle())
            .toMatch(/Resena Comercios/);

    });

    it('should load create ResenaComercio dialog', () => {
        resenaComercioComponentsPage.clickOnCreateButton();
        resenaComercioDialogPage = new ResenaComercioDialogPage();
        expect(resenaComercioDialogPage.getModalTitle())
            .toMatch(/Create or edit a Resena Comercio/);
        resenaComercioDialogPage.close();
    });

    it('should create and save ResenaComercios', () => {
        resenaComercioComponentsPage.clickOnCreateButton();
        resenaComercioDialogPage.setFechaCreacionInput('2000-12-31');
        expect(resenaComercioDialogPage.getFechaCreacionInput()).toMatch('2000-12-31');
        resenaComercioDialogPage.setCalificacionInput('5');
        expect(resenaComercioDialogPage.getCalificacionInput()).toMatch('5');
        resenaComercioDialogPage.setComentarioInput('comentario');
        expect(resenaComercioDialogPage.getComentarioInput()).toMatch('comentario');
        resenaComercioDialogPage.clienteSelectLastOption();
        resenaComercioDialogPage.comercioSelectLastOption();
        resenaComercioDialogPage.save();
        expect(resenaComercioDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ResenaComercioComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-resena-comercio div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ResenaComercioDialogPage {
    modalTitle = element(by.css('h4#myResenaComercioLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaCreacionInput = element(by.css('input#field_fechaCreacion'));
    calificacionInput = element(by.css('input#field_calificacion'));
    comentarioInput = element(by.css('input#field_comentario'));
    clienteSelect = element(by.css('select#field_cliente'));
    comercioSelect = element(by.css('select#field_comercio'));

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
