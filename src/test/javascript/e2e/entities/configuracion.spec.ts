import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Configuracion e2e test', () => {

    let navBarPage: NavBarPage;
    let configuracionDialogPage: ConfiguracionDialogPage;
    let configuracionComponentsPage: ConfiguracionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Configuracions', () => {
        navBarPage.goToEntity('configuracion');
        configuracionComponentsPage = new ConfiguracionComponentsPage();
        expect(configuracionComponentsPage.getTitle())
            .toMatch(/Configuracions/);

    });

    it('should load create Configuracion dialog', () => {
        configuracionComponentsPage.clickOnCreateButton();
        configuracionDialogPage = new ConfiguracionDialogPage();
        expect(configuracionDialogPage.getModalTitle())
            .toMatch(/Create or edit a Configuracion/);
        configuracionDialogPage.close();
    });

    it('should create and save Configuracions', () => {
        configuracionComponentsPage.clickOnCreateButton();
        configuracionDialogPage.setCalificacionMinimaInput('5');
        expect(configuracionDialogPage.getCalificacionMinimaInput()).toMatch('5');
        configuracionDialogPage.setCalificacionMaximaInput('5');
        expect(configuracionDialogPage.getCalificacionMaximaInput()).toMatch('5');
        configuracionDialogPage.setNombreAplicacionInput('nombreAplicacion');
        expect(configuracionDialogPage.getNombreAplicacionInput()).toMatch('nombreAplicacion');
        configuracionDialogPage.setRazonSocialInput('razonSocial');
        expect(configuracionDialogPage.getRazonSocialInput()).toMatch('razonSocial');
        configuracionDialogPage.setCedJuridicaInput('cedJuridica');
        expect(configuracionDialogPage.getCedJuridicaInput()).toMatch('cedJuridica');
        configuracionDialogPage.setDireccionInput('direccion');
        expect(configuracionDialogPage.getDireccionInput()).toMatch('direccion');
        configuracionDialogPage.setLatitudInput('5');
        expect(configuracionDialogPage.getLatitudInput()).toMatch('5');
        configuracionDialogPage.setLongitudInput('5');
        expect(configuracionDialogPage.getLongitudInput()).toMatch('5');
        configuracionDialogPage.setTelefonoInput('telefono');
        expect(configuracionDialogPage.getTelefonoInput()).toMatch('telefono');
        configuracionDialogPage.setUrlLogoInput('urlLogo');
        expect(configuracionDialogPage.getUrlLogoInput()).toMatch('urlLogo');
        configuracionDialogPage.save();
        expect(configuracionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ConfiguracionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-configuracion div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ConfiguracionDialogPage {
    modalTitle = element(by.css('h4#myConfiguracionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    calificacionMinimaInput = element(by.css('input#field_calificacionMinima'));
    calificacionMaximaInput = element(by.css('input#field_calificacionMaxima'));
    nombreAplicacionInput = element(by.css('input#field_nombreAplicacion'));
    razonSocialInput = element(by.css('input#field_razonSocial'));
    cedJuridicaInput = element(by.css('input#field_cedJuridica'));
    direccionInput = element(by.css('input#field_direccion'));
    latitudInput = element(by.css('input#field_latitud'));
    longitudInput = element(by.css('input#field_longitud'));
    telefonoInput = element(by.css('input#field_telefono'));
    urlLogoInput = element(by.css('input#field_urlLogo'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setCalificacionMinimaInput = function(calificacionMinima) {
        this.calificacionMinimaInput.sendKeys(calificacionMinima);
    };

    getCalificacionMinimaInput = function() {
        return this.calificacionMinimaInput.getAttribute('value');
    };

    setCalificacionMaximaInput = function(calificacionMaxima) {
        this.calificacionMaximaInput.sendKeys(calificacionMaxima);
    };

    getCalificacionMaximaInput = function() {
        return this.calificacionMaximaInput.getAttribute('value');
    };

    setNombreAplicacionInput = function(nombreAplicacion) {
        this.nombreAplicacionInput.sendKeys(nombreAplicacion);
    };

    getNombreAplicacionInput = function() {
        return this.nombreAplicacionInput.getAttribute('value');
    };

    setRazonSocialInput = function(razonSocial) {
        this.razonSocialInput.sendKeys(razonSocial);
    };

    getRazonSocialInput = function() {
        return this.razonSocialInput.getAttribute('value');
    };

    setCedJuridicaInput = function(cedJuridica) {
        this.cedJuridicaInput.sendKeys(cedJuridica);
    };

    getCedJuridicaInput = function() {
        return this.cedJuridicaInput.getAttribute('value');
    };

    setDireccionInput = function(direccion) {
        this.direccionInput.sendKeys(direccion);
    };

    getDireccionInput = function() {
        return this.direccionInput.getAttribute('value');
    };

    setLatitudInput = function(latitud) {
        this.latitudInput.sendKeys(latitud);
    };

    getLatitudInput = function() {
        return this.latitudInput.getAttribute('value');
    };

    setLongitudInput = function(longitud) {
        this.longitudInput.sendKeys(longitud);
    };

    getLongitudInput = function() {
        return this.longitudInput.getAttribute('value');
    };

    setTelefonoInput = function(telefono) {
        this.telefonoInput.sendKeys(telefono);
    };

    getTelefonoInput = function() {
        return this.telefonoInput.getAttribute('value');
    };

    setUrlLogoInput = function(urlLogo) {
        this.urlLogoInput.sendKeys(urlLogo);
    };

    getUrlLogoInput = function() {
        return this.urlLogoInput.getAttribute('value');
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
