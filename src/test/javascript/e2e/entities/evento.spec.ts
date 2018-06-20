import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Evento e2e test', () => {

    let navBarPage: NavBarPage;
    let eventoDialogPage: EventoDialogPage;
    let eventoComponentsPage: EventoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Eventos', () => {
        navBarPage.goToEntity('evento');
        eventoComponentsPage = new EventoComponentsPage();
        expect(eventoComponentsPage.getTitle())
            .toMatch(/Eventos/);

    });

    it('should load create Evento dialog', () => {
        eventoComponentsPage.clickOnCreateButton();
        eventoDialogPage = new EventoDialogPage();
        expect(eventoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Evento/);
        eventoDialogPage.close();
    });

    it('should create and save Eventos', () => {
        eventoComponentsPage.clickOnCreateButton();
        eventoDialogPage.setFechaCreacionInput('2000-12-31');
        expect(eventoDialogPage.getFechaCreacionInput()).toMatch('2000-12-31');
        eventoDialogPage.setFechaActividadInput('2000-12-31');
        expect(eventoDialogPage.getFechaActividadInput()).toMatch('2000-12-31');
        eventoDialogPage.setNombreInput('nombre');
        expect(eventoDialogPage.getNombreInput()).toMatch('nombre');
        eventoDialogPage.setDireccionInput('direccion');
        expect(eventoDialogPage.getDireccionInput()).toMatch('direccion');
        eventoDialogPage.setLatitudInput('5');
        expect(eventoDialogPage.getLatitudInput()).toMatch('5');
        eventoDialogPage.setLongitudInput('5');
        expect(eventoDialogPage.getLongitudInput()).toMatch('5');
        eventoDialogPage.setHorarioInput('horario');
        expect(eventoDialogPage.getHorarioInput()).toMatch('horario');
        // eventoDialogPage.etiquetasSelectLastOption();
        eventoDialogPage.save();
        expect(eventoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EventoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-evento div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class EventoDialogPage {
    modalTitle = element(by.css('h4#myEventoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaCreacionInput = element(by.css('input#field_fechaCreacion'));
    fechaActividadInput = element(by.css('input#field_fechaActividad'));
    nombreInput = element(by.css('input#field_nombre'));
    direccionInput = element(by.css('input#field_direccion'));
    latitudInput = element(by.css('input#field_latitud'));
    longitudInput = element(by.css('input#field_longitud'));
    horarioInput = element(by.css('input#field_horario'));
    etiquetasSelect = element(by.css('select#field_etiquetas'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFechaCreacionInput = function(fechaCreacion) {
        this.fechaCreacionInput.sendKeys(fechaCreacion);
    };

    getFechaCreacionInput = function() {
        return this.fechaCreacionInput.getAttribute('value');
    };

    setFechaActividadInput = function(fechaActividad) {
        this.fechaActividadInput.sendKeys(fechaActividad);
    };

    getFechaActividadInput = function() {
        return this.fechaActividadInput.getAttribute('value');
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

    setLongitudInput = function(longitud) {
        this.longitudInput.sendKeys(longitud);
    };

    getLongitudInput = function() {
        return this.longitudInput.getAttribute('value');
    };

    setHorarioInput = function(horario) {
        this.horarioInput.sendKeys(horario);
    };

    getHorarioInput = function() {
        return this.horarioInput.getAttribute('value');
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
