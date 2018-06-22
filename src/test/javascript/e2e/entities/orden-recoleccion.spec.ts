import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('OrdenRecoleccion e2e test', () => {

    let navBarPage: NavBarPage;
    let ordenRecoleccionDialogPage: OrdenRecoleccionDialogPage;
    let ordenRecoleccionComponentsPage: OrdenRecoleccionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load OrdenRecoleccions', () => {
        navBarPage.goToEntity('orden-recoleccion');
        ordenRecoleccionComponentsPage = new OrdenRecoleccionComponentsPage();
        expect(ordenRecoleccionComponentsPage.getTitle())
            .toMatch(/Orden Recoleccions/);

    });

    it('should load create OrdenRecoleccion dialog', () => {
        ordenRecoleccionComponentsPage.clickOnCreateButton();
        ordenRecoleccionDialogPage = new OrdenRecoleccionDialogPage();
        expect(ordenRecoleccionDialogPage.getModalTitle())
            .toMatch(/Create or edit a Orden Recoleccion/);
        ordenRecoleccionDialogPage.close();
    });

    it('should create and save OrdenRecoleccions', () => {
        ordenRecoleccionComponentsPage.clickOnCreateButton();
        ordenRecoleccionDialogPage.setFechaCrecionInput('2000-12-31');
        expect(ordenRecoleccionDialogPage.getFechaCrecionInput()).toMatch('2000-12-31');
        ordenRecoleccionDialogPage.setFechaSolicitudInput('2000-12-31');
        expect(ordenRecoleccionDialogPage.getFechaSolicitudInput()).toMatch('2000-12-31');
        ordenRecoleccionDialogPage.solicitanteSelectLastOption();
        ordenRecoleccionDialogPage.recolectorSelectLastOption();
        ordenRecoleccionDialogPage.save();
        expect(ordenRecoleccionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class OrdenRecoleccionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-orden-recoleccion div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class OrdenRecoleccionDialogPage {
    modalTitle = element(by.css('h4#myOrdenRecoleccionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaCrecionInput = element(by.css('input#field_fechaCrecion'));
    fechaSolicitudInput = element(by.css('input#field_fechaSolicitud'));
    solicitanteSelect = element(by.css('select#field_solicitante'));
    recolectorSelect = element(by.css('select#field_recolector'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFechaCrecionInput = function(fechaCrecion) {
        this.fechaCrecionInput.sendKeys(fechaCrecion);
    };

    getFechaCrecionInput = function() {
        return this.fechaCrecionInput.getAttribute('value');
    };

    setFechaSolicitudInput = function(fechaSolicitud) {
        this.fechaSolicitudInput.sendKeys(fechaSolicitud);
    };

    getFechaSolicitudInput = function() {
        return this.fechaSolicitudInput.getAttribute('value');
    };

    solicitanteSelectLastOption = function() {
        this.solicitanteSelect.all(by.tagName('option')).last().click();
    };

    solicitanteSelectOption = function(option) {
        this.solicitanteSelect.sendKeys(option);
    };

    getSolicitanteSelect = function() {
        return this.solicitanteSelect;
    };

    getSolicitanteSelectedOption = function() {
        return this.solicitanteSelect.element(by.css('option:checked')).getText();
    };

    recolectorSelectLastOption = function() {
        this.recolectorSelect.all(by.tagName('option')).last().click();
    };

    recolectorSelectOption = function(option) {
        this.recolectorSelect.sendKeys(option);
    };

    getRecolectorSelect = function() {
        return this.recolectorSelect;
    };

    getRecolectorSelectedOption = function() {
        return this.recolectorSelect.element(by.css('option:checked')).getText();
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
