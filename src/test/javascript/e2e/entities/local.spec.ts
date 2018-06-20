import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Local e2e test', () => {

    let navBarPage: NavBarPage;
    let localDialogPage: LocalDialogPage;
    let localComponentsPage: LocalComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Locals', () => {
        navBarPage.goToEntity('local');
        localComponentsPage = new LocalComponentsPage();
        expect(localComponentsPage.getTitle())
            .toMatch(/Locals/);

    });

    it('should load create Local dialog', () => {
        localComponentsPage.clickOnCreateButton();
        localDialogPage = new LocalDialogPage();
        expect(localDialogPage.getModalTitle())
            .toMatch(/Create or edit a Local/);
        localDialogPage.close();
    });

    it('should create and save Locals', () => {
        localComponentsPage.clickOnCreateButton();
        localDialogPage.setFechaCreacionInput('2000-12-31');
        expect(localDialogPage.getFechaCreacionInput()).toMatch('2000-12-31');
        localDialogPage.setNombreInput('nombre');
        expect(localDialogPage.getNombreInput()).toMatch('nombre');
        localDialogPage.setDireccionInput('direccion');
        expect(localDialogPage.getDireccionInput()).toMatch('direccion');
        localDialogPage.setLatitudInput('5');
        expect(localDialogPage.getLatitudInput()).toMatch('5');
        localDialogPage.setLatitudeInput('5');
        expect(localDialogPage.getLatitudeInput()).toMatch('5');
        localDialogPage.setHorarioInput('horario');
        expect(localDialogPage.getHorarioInput()).toMatch('horario');
        localDialogPage.setTelefonoInput('telefono');
        expect(localDialogPage.getTelefonoInput()).toMatch('telefono');
        localDialogPage.fachadaSelectLastOption();
        localDialogPage.comercioSelectLastOption();
        localDialogPage.save();
        expect(localDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LocalComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-local div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class LocalDialogPage {
    modalTitle = element(by.css('h4#myLocalLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaCreacionInput = element(by.css('input#field_fechaCreacion'));
    nombreInput = element(by.css('input#field_nombre'));
    direccionInput = element(by.css('input#field_direccion'));
    latitudInput = element(by.css('input#field_latitud'));
    latitudeInput = element(by.css('input#field_latitude'));
    horarioInput = element(by.css('input#field_horario'));
    telefonoInput = element(by.css('input#field_telefono'));
    fachadaSelect = element(by.css('select#field_fachada'));
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

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
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

    setLatitudeInput = function(latitude) {
        this.latitudeInput.sendKeys(latitude);
    };

    getLatitudeInput = function() {
        return this.latitudeInput.getAttribute('value');
    };

    setHorarioInput = function(horario) {
        this.horarioInput.sendKeys(horario);
    };

    getHorarioInput = function() {
        return this.horarioInput.getAttribute('value');
    };

    setTelefonoInput = function(telefono) {
        this.telefonoInput.sendKeys(telefono);
    };

    getTelefonoInput = function() {
        return this.telefonoInput.getAttribute('value');
    };

    fachadaSelectLastOption = function() {
        this.fachadaSelect.all(by.tagName('option')).last().click();
    };

    fachadaSelectOption = function(option) {
        this.fachadaSelect.sendKeys(option);
    };

    getFachadaSelect = function() {
        return this.fachadaSelect;
    };

    getFachadaSelectedOption = function() {
        return this.fachadaSelect.element(by.css('option:checked')).getText();
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
