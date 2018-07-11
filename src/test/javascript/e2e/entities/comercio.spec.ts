import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Comercio e2e test', () => {

    let navBarPage: NavBarPage;
    let comercioDialogPage: ComercioDialogPage;
    let comercioComponentsPage: ComercioComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Comercios', () => {
        navBarPage.goToEntity('comercio');
        comercioComponentsPage = new ComercioComponentsPage();
        expect(comercioComponentsPage.getTitle())
            .toMatch(/Comercios/);

    });

    it('should load create Comercio dialog', () => {
        comercioComponentsPage.clickOnCreateButton();
        comercioDialogPage = new ComercioDialogPage();
        expect(comercioDialogPage.getModalTitle())
            .toMatch(/Create or edit a Comercio/);
        comercioDialogPage.close();
    });

    it('should create and save Comercios', () => {
        comercioComponentsPage.clickOnCreateButton();
        comercioDialogPage.setFechaCreacionInput('2000-12-31');
        expect(comercioDialogPage.getFechaCreacionInput()).toMatch('2000-12-31');
        comercioDialogPage.setCedJuridicaInput('cedJuridica');
        expect(comercioDialogPage.getCedJuridicaInput()).toMatch('cedJuridica');
        comercioDialogPage.setRazonSocialInput('razonSocial');
        expect(comercioDialogPage.getRazonSocialInput()).toMatch('razonSocial');
        comercioDialogPage.setNombreComercialInput('nombreComercial');
        expect(comercioDialogPage.getNombreComercialInput()).toMatch('nombreComercial');
        comercioDialogPage.tipoSelectLastOption();
        comercioDialogPage.setLogoUrlInput('logoUrl');
        expect(comercioDialogPage.getLogoUrlInput()).toMatch('logoUrl');
        // comercioDialogPage.etiquetasSelectLastOption();
        // comercioDialogPage.categoriasSelectLastOption();
        comercioDialogPage.duenoSelectLastOption();
        comercioDialogPage.save();
        expect(comercioDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ComercioComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-comercio div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ComercioDialogPage {
    modalTitle = element(by.css('h4#myComercioLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaCreacionInput = element(by.css('input#field_fechaCreacion'));
    cedJuridicaInput = element(by.css('input#field_cedJuridica'));
    razonSocialInput = element(by.css('input#field_razonSocial'));
    nombreComercialInput = element(by.css('input#field_nombreComercial'));
    tipoSelect = element(by.css('select#field_tipo'));
    logoUrlInput = element(by.css('input#field_logoUrl'));
    etiquetasSelect = element(by.css('select#field_etiquetas'));
    categoriasSelect = element(by.css('select#field_categorias'));
    duenoSelect = element(by.css('select#field_dueno'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFechaCreacionInput = function(fechaCreacion) {
        this.fechaCreacionInput.sendKeys(fechaCreacion);
    };

    getFechaCreacionInput = function() {
        return this.fechaCreacionInput.getAttribute('value');
    };

    setCedJuridicaInput = function(cedJuridica) {
        this.cedJuridicaInput.sendKeys(cedJuridica);
    };

    getCedJuridicaInput = function() {
        return this.cedJuridicaInput.getAttribute('value');
    };

    setRazonSocialInput = function(razonSocial) {
        this.razonSocialInput.sendKeys(razonSocial);
    };

    getRazonSocialInput = function() {
        return this.razonSocialInput.getAttribute('value');
    };

    setNombreComercialInput = function(nombreComercial) {
        this.nombreComercialInput.sendKeys(nombreComercial);
    };

    getNombreComercialInput = function() {
        return this.nombreComercialInput.getAttribute('value');
    };

    setTipoSelect = function(tipo) {
        this.tipoSelect.sendKeys(tipo);
    };

    getTipoSelect = function() {
        return this.tipoSelect.element(by.css('option:checked')).getText();
    };

    tipoSelectLastOption = function() {
        this.tipoSelect.all(by.tagName('option')).last().click();
    };
    setLogoUrlInput = function(logoUrl) {
        this.logoUrlInput.sendKeys(logoUrl);
    };

    getLogoUrlInput = function() {
        return this.logoUrlInput.getAttribute('value');
    };

    etiquetasSelectLastOption = function() {
        this.etiquetasSelect.all(by.tagName('option')).last().click();
    };

    etiquetasSelectOption = function(option) {
        this.etiquetasSelect.sendKeys(option);
    };

    getEtiquetasSelect = function() {
        return this.etiquetasSelect;
    };

    getEtiquetasSelectedOption = function() {
        return this.etiquetasSelect.element(by.css('option:checked')).getText();
    };

    categoriasSelectLastOption = function() {
        this.categoriasSelect.all(by.tagName('option')).last().click();
    };

    categoriasSelectOption = function(option) {
        this.categoriasSelect.sendKeys(option);
    };

    getCategoriasSelect = function() {
        return this.categoriasSelect;
    };

    getCategoriasSelectedOption = function() {
        return this.categoriasSelect.element(by.css('option:checked')).getText();
    };

    duenoSelectLastOption = function() {
        this.duenoSelect.all(by.tagName('option')).last().click();
    };

    duenoSelectOption = function(option) {
        this.duenoSelect.sendKeys(option);
    };

    getDuenoSelect = function() {
        return this.duenoSelect;
    };

    getDuenoSelectedOption = function() {
        return this.duenoSelect.element(by.css('option:checked')).getText();
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
