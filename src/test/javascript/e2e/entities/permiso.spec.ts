import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Permiso e2e test', () => {

    let navBarPage: NavBarPage;
    let permisoDialogPage: PermisoDialogPage;
    let permisoComponentsPage: PermisoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Permisos', () => {
        navBarPage.goToEntity('permiso');
        permisoComponentsPage = new PermisoComponentsPage();
        expect(permisoComponentsPage.getTitle())
            .toMatch(/Permisos/);

    });

    it('should load create Permiso dialog', () => {
        permisoComponentsPage.clickOnCreateButton();
        permisoDialogPage = new PermisoDialogPage();
        expect(permisoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Permiso/);
        permisoDialogPage.close();
    });

    it('should create and save Permisos', () => {
        permisoComponentsPage.clickOnCreateButton();
        permisoDialogPage.setNombreInput('nombre');
        expect(permisoDialogPage.getNombreInput()).toMatch('nombre');
        permisoDialogPage.setDescripcionInput('descripcion');
        expect(permisoDialogPage.getDescripcionInput()).toMatch('descripcion');
        permisoDialogPage.save();
        expect(permisoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PermisoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-permiso div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PermisoDialogPage {
    modalTitle = element(by.css('h4#myPermisoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));
    descripcionInput = element(by.css('input#field_descripcion'));

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
