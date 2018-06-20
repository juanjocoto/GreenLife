import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Recolector e2e test', () => {

    let navBarPage: NavBarPage;
    let recolectorDialogPage: RecolectorDialogPage;
    let recolectorComponentsPage: RecolectorComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Recolectors', () => {
        navBarPage.goToEntity('recolector');
        recolectorComponentsPage = new RecolectorComponentsPage();
        expect(recolectorComponentsPage.getTitle())
            .toMatch(/Recolectors/);

    });

    it('should load create Recolector dialog', () => {
        recolectorComponentsPage.clickOnCreateButton();
        recolectorDialogPage = new RecolectorDialogPage();
        expect(recolectorDialogPage.getModalTitle())
            .toMatch(/Create or edit a Recolector/);
        recolectorDialogPage.close();
    });

    it('should create and save Recolectors', () => {
        recolectorComponentsPage.clickOnCreateButton();
        recolectorDialogPage.usuarioSelectLastOption();
        recolectorDialogPage.save();
        expect(recolectorDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RecolectorComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-recolector div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class RecolectorDialogPage {
    modalTitle = element(by.css('h4#myRecolectorLabel'));
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
