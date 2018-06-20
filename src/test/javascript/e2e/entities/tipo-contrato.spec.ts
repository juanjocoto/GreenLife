import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('TipoContrato e2e test', () => {

    let navBarPage: NavBarPage;
    let tipoContratoDialogPage: TipoContratoDialogPage;
    let tipoContratoComponentsPage: TipoContratoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TipoContratoes', () => {
        navBarPage.goToEntity('tipo-contrato');
        tipoContratoComponentsPage = new TipoContratoComponentsPage();
        expect(tipoContratoComponentsPage.getTitle())
            .toMatch(/Tipo Contratoes/);

    });

    it('should load create TipoContrato dialog', () => {
        tipoContratoComponentsPage.clickOnCreateButton();
        tipoContratoDialogPage = new TipoContratoDialogPage();
        expect(tipoContratoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Tipo Contrato/);
        tipoContratoDialogPage.close();
    });

    it('should create and save TipoContratoes', () => {
        tipoContratoComponentsPage.clickOnCreateButton();
        tipoContratoDialogPage.setNombreInput('nombre');
        expect(tipoContratoDialogPage.getNombreInput()).toMatch('nombre');
        tipoContratoDialogPage.setDescripcionInput('descripcion');
        expect(tipoContratoDialogPage.getDescripcionInput()).toMatch('descripcion');
        tipoContratoDialogPage.setCostoInput('5');
        expect(tipoContratoDialogPage.getCostoInput()).toMatch('5');
        tipoContratoDialogPage.save();
        expect(tipoContratoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TipoContratoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tipo-contrato div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class TipoContratoDialogPage {
    modalTitle = element(by.css('h4#myTipoContratoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));
    descripcionInput = element(by.css('input#field_descripcion'));
    costoInput = element(by.css('input#field_costo'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
    };

    setDescripcionInput = function(descripcion) {
        this.descripcionInput.sendKeys(descripcion);
    };

    getDescripcionInput = function() {
        return this.descripcionInput.getAttribute('value');
    };

    setCostoInput = function(costo) {
        this.costoInput.sendKeys(costo);
    };

    getCostoInput = function() {
        return this.costoInput.getAttribute('value');
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
