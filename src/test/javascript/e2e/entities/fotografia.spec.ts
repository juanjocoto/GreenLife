import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Fotografia e2e test', () => {

    let navBarPage: NavBarPage;
    let fotografiaDialogPage: FotografiaDialogPage;
    let fotografiaComponentsPage: FotografiaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Fotografias', () => {
        navBarPage.goToEntity('fotografia');
        fotografiaComponentsPage = new FotografiaComponentsPage();
        expect(fotografiaComponentsPage.getTitle())
            .toMatch(/Fotografias/);

    });

    it('should load create Fotografia dialog', () => {
        fotografiaComponentsPage.clickOnCreateButton();
        fotografiaDialogPage = new FotografiaDialogPage();
        expect(fotografiaDialogPage.getModalTitle())
            .toMatch(/Create or edit a Fotografia/);
        fotografiaDialogPage.close();
    });

    it('should create and save Fotografias', () => {
        fotografiaComponentsPage.clickOnCreateButton();
        fotografiaDialogPage.setUrlImageInput('urlImage');
        expect(fotografiaDialogPage.getUrlImageInput()).toMatch('urlImage');
        fotografiaDialogPage.centroAcopioSelectLastOption();
        fotografiaDialogPage.comercioSelectLastOption();
        fotografiaDialogPage.productoSelectLastOption();
        fotografiaDialogPage.publicacionSelectLastOption();
        fotografiaDialogPage.eventoSelectLastOption();
        fotografiaDialogPage.patrocinadorSelectLastOption();
        fotografiaDialogPage.save();
        expect(fotografiaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class FotografiaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-fotografia div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class FotografiaDialogPage {
    modalTitle = element(by.css('h4#myFotografiaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    urlImageInput = element(by.css('input#field_urlImage'));
    centroAcopioSelect = element(by.css('select#field_centroAcopio'));
    comercioSelect = element(by.css('select#field_comercio'));
    productoSelect = element(by.css('select#field_producto'));
    publicacionSelect = element(by.css('select#field_publicacion'));
    eventoSelect = element(by.css('select#field_evento'));
    patrocinadorSelect = element(by.css('select#field_patrocinador'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setUrlImageInput = function(urlImage) {
        this.urlImageInput.sendKeys(urlImage);
    };

    getUrlImageInput = function() {
        return this.urlImageInput.getAttribute('value');
    };

    centroAcopioSelectLastOption = function() {
        this.centroAcopioSelect.all(by.tagName('option')).last().click();
    };

    centroAcopioSelectOption = function(option) {
        this.centroAcopioSelect.sendKeys(option);
    };

    getCentroAcopioSelect = function() {
        return this.centroAcopioSelect;
    };

    getCentroAcopioSelectedOption = function() {
        return this.centroAcopioSelect.element(by.css('option:checked')).getText();
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

    productoSelectLastOption = function() {
        this.productoSelect.all(by.tagName('option')).last().click();
    };

    productoSelectOption = function(option) {
        this.productoSelect.sendKeys(option);
    };

    getProductoSelect = function() {
        return this.productoSelect;
    };

    getProductoSelectedOption = function() {
        return this.productoSelect.element(by.css('option:checked')).getText();
    };

    publicacionSelectLastOption = function() {
        this.publicacionSelect.all(by.tagName('option')).last().click();
    };

    publicacionSelectOption = function(option) {
        this.publicacionSelect.sendKeys(option);
    };

    getPublicacionSelect = function() {
        return this.publicacionSelect;
    };

    getPublicacionSelectedOption = function() {
        return this.publicacionSelect.element(by.css('option:checked')).getText();
    };

    eventoSelectLastOption = function() {
        this.eventoSelect.all(by.tagName('option')).last().click();
    };

    eventoSelectOption = function(option) {
        this.eventoSelect.sendKeys(option);
    };

    getEventoSelect = function() {
        return this.eventoSelect;
    };

    getEventoSelectedOption = function() {
        return this.eventoSelect.element(by.css('option:checked')).getText();
    };

    patrocinadorSelectLastOption = function() {
        this.patrocinadorSelect.all(by.tagName('option')).last().click();
    };

    patrocinadorSelectOption = function(option) {
        this.patrocinadorSelect.sendKeys(option);
    };

    getPatrocinadorSelect = function() {
        return this.patrocinadorSelect;
    };

    getPatrocinadorSelectedOption = function() {
        return this.patrocinadorSelect.element(by.css('option:checked')).getText();
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
