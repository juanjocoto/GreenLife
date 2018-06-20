import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Rol e2e test', () => {

    let navBarPage: NavBarPage;
    let rolDialogPage: RolDialogPage;
    let rolComponentsPage: RolComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Rols', () => {
        navBarPage.goToEntity('rol');
        rolComponentsPage = new RolComponentsPage();
        expect(rolComponentsPage.getTitle())
            .toMatch(/Rols/);

    });

    it('should load create Rol dialog', () => {
        rolComponentsPage.clickOnCreateButton();
        rolDialogPage = new RolDialogPage();
        expect(rolDialogPage.getModalTitle())
            .toMatch(/Create or edit a Rol/);
        rolDialogPage.close();
    });

    it('should create and save Rols', () => {
        rolComponentsPage.clickOnCreateButton();
        rolDialogPage.setFechaCreacionInput('2000-12-31');
        expect(rolDialogPage.getFechaCreacionInput()).toMatch('2000-12-31');
        rolDialogPage.setNombreInput('nombre');
        expect(rolDialogPage.getNombreInput()).toMatch('nombre');
        rolDialogPage.setDescripcionInput('descripcion');
        expect(rolDialogPage.getDescripcionInput()).toMatch('descripcion');
        // rolDialogPage.permisosSelectLastOption();
        rolDialogPage.save();
        expect(rolDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RolComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-rol div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class RolDialogPage {
    modalTitle = element(by.css('h4#myRolLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaCreacionInput = element(by.css('input#field_fechaCreacion'));
    nombreInput = element(by.css('input#field_nombre'));
    descripcionInput = element(by.css('input#field_descripcion'));
    permisosSelect = element(by.css('select#field_permisos'));

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

    setDescripcionInput = function(descripcion) {
        this.descripcionInput.sendKeys(descripcion);
    };

    getDescripcionInput = function() {
        return this.descripcionInput.getAttribute('value');
    };

    permisosSelectLastOption = function() {
        this.permisosSelect.all(by.tagName('option')).last().click();
    };

    permisosSelectOption = function(option) {
        this.permisosSelect.sendKeys(option);
    };

    getPermisosSelect = function() {
        return this.permisosSelect;
    };

    getPermisosSelectedOption = function() {
        return this.permisosSelect.element(by.css('option:checked')).getText();
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
