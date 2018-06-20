import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Pago e2e test', () => {

    let navBarPage: NavBarPage;
    let pagoDialogPage: PagoDialogPage;
    let pagoComponentsPage: PagoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Pagos', () => {
        navBarPage.goToEntity('pago');
        pagoComponentsPage = new PagoComponentsPage();
        expect(pagoComponentsPage.getTitle())
            .toMatch(/Pagos/);

    });

    it('should load create Pago dialog', () => {
        pagoComponentsPage.clickOnCreateButton();
        pagoDialogPage = new PagoDialogPage();
        expect(pagoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Pago/);
        pagoDialogPage.close();
    });

    it('should create and save Pagos', () => {
        pagoComponentsPage.clickOnCreateButton();
        pagoDialogPage.setFechaInput('2000-12-31');
        expect(pagoDialogPage.getFechaInput()).toMatch('2000-12-31');
        pagoDialogPage.save();
        expect(pagoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PagoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-pago div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PagoDialogPage {
    modalTitle = element(by.css('h4#myPagoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaInput = element(by.css('input#field_fecha'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFechaInput = function(fecha) {
        this.fechaInput.sendKeys(fecha);
    };

    getFechaInput = function() {
        return this.fechaInput.getAttribute('value');
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
