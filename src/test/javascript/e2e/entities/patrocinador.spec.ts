import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Patrocinador e2e test', () => {

    let navBarPage: NavBarPage;
    let patrocinadorDialogPage: PatrocinadorDialogPage;
    let patrocinadorComponentsPage: PatrocinadorComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Patrocinadors', () => {
        navBarPage.goToEntity('patrocinador');
        patrocinadorComponentsPage = new PatrocinadorComponentsPage();
        expect(patrocinadorComponentsPage.getTitle())
            .toMatch(/Patrocinadors/);

    });

    it('should load create Patrocinador dialog', () => {
        patrocinadorComponentsPage.clickOnCreateButton();
        patrocinadorDialogPage = new PatrocinadorDialogPage();
        expect(patrocinadorDialogPage.getModalTitle())
            .toMatch(/Create or edit a Patrocinador/);
        patrocinadorDialogPage.close();
    });

    it('should create and save Patrocinadors', () => {
        patrocinadorComponentsPage.clickOnCreateButton();
        patrocinadorDialogPage.setFechaCreacionInput('2000-12-31');
        expect(patrocinadorDialogPage.getFechaCreacionInput()).toMatch('2000-12-31');
        patrocinadorDialogPage.setNombreInput('nombre');
        expect(patrocinadorDialogPage.getNombreInput()).toMatch('nombre');
        patrocinadorDialogPage.setCedJuridicaInput('cedJuridica');
        expect(patrocinadorDialogPage.getCedJuridicaInput()).toMatch('cedJuridica');
        patrocinadorDialogPage.setCorreoInput('correo');
        expect(patrocinadorDialogPage.getCorreoInput()).toMatch('correo');
        patrocinadorDialogPage.solicitudSelectLastOption();
        // patrocinadorDialogPage.eventosSelectLastOption();
        patrocinadorDialogPage.save();
        expect(patrocinadorDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PatrocinadorComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-patrocinador div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PatrocinadorDialogPage {
    modalTitle = element(by.css('h4#myPatrocinadorLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaCreacionInput = element(by.css('input#field_fechaCreacion'));
    nombreInput = element(by.css('input#field_nombre'));
    cedJuridicaInput = element(by.css('input#field_cedJuridica'));
    correoInput = element(by.css('input#field_correo'));
    solicitudSelect = element(by.css('select#field_solicitud'));
    eventosSelect = element(by.css('select#field_eventos'));

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

    setCedJuridicaInput = function(cedJuridica) {
        this.cedJuridicaInput.sendKeys(cedJuridica);
    };

    getCedJuridicaInput = function() {
        return this.cedJuridicaInput.getAttribute('value');
    };

    setCorreoInput = function(correo) {
        this.correoInput.sendKeys(correo);
    };

    getCorreoInput = function() {
        return this.correoInput.getAttribute('value');
    };

    solicitudSelectLastOption = function() {
        this.solicitudSelect.all(by.tagName('option')).last().click();
    };

    solicitudSelectOption = function(option) {
        this.solicitudSelect.sendKeys(option);
    };

    getSolicitudSelect = function() {
        return this.solicitudSelect;
    };

    getSolicitudSelectedOption = function() {
        return this.solicitudSelect.element(by.css('option:checked')).getText();
    };

    eventosSelectLastOption = function() {
        this.eventosSelect.all(by.tagName('option')).last().click();
    };

    eventosSelectOption = function(option) {
        this.eventosSelect.sendKeys(option);
    };

    getEventosSelect = function() {
        return this.eventosSelect;
    };

    getEventosSelectedOption = function() {
        return this.eventosSelect.element(by.css('option:checked')).getText();
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
