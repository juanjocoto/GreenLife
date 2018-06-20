import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Administrador e2e test', () => {

    let navBarPage: NavBarPage;
    let administradorDialogPage: AdministradorDialogPage;
    let administradorComponentsPage: AdministradorComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Administradors', () => {
        navBarPage.goToEntity('administrador');
        administradorComponentsPage = new AdministradorComponentsPage();
        expect(administradorComponentsPage.getTitle())
            .toMatch(/Administradors/);

    });

    it('should load create Administrador dialog', () => {
        administradorComponentsPage.clickOnCreateButton();
        administradorDialogPage = new AdministradorDialogPage();
        expect(administradorDialogPage.getModalTitle())
            .toMatch(/Create or edit a Administrador/);
        administradorDialogPage.close();
    });

    it('should create and save Administradors', () => {
        administradorComponentsPage.clickOnCreateButton();
        administradorDialogPage.usuarioSelectLastOption();
        administradorDialogPage.save();
        expect(administradorDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AdministradorComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-administrador div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class AdministradorDialogPage {
    modalTitle = element(by.css('h4#myAdministradorLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    usuarioSelect = element(by.css('select#field_usuario'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    usuarioSelectLastOption = function() {
        this.usuarioSelect.all(by.tagName('option')).last().click();
    };

    usuarioSelectOption = function(option) {
        this.usuarioSelect.sendKeys(option);
    };

    getUsuarioSelect = function() {
        return this.usuarioSelect;
    };

    getUsuarioSelectedOption = function() {
        return this.usuarioSelect.element(by.css('option:checked')).getText();
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
