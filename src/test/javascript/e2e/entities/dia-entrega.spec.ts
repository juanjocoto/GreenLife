import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('DiaEntrega e2e test', () => {

    let navBarPage: NavBarPage;
    let diaEntregaDialogPage: DiaEntregaDialogPage;
    let diaEntregaComponentsPage: DiaEntregaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load DiaEntregas', () => {
        navBarPage.goToEntity('dia-entrega');
        diaEntregaComponentsPage = new DiaEntregaComponentsPage();
        expect(diaEntregaComponentsPage.getTitle())
            .toMatch(/Dia Entregas/);

    });

    it('should load create DiaEntrega dialog', () => {
        diaEntregaComponentsPage.clickOnCreateButton();
        diaEntregaDialogPage = new DiaEntregaDialogPage();
        expect(diaEntregaDialogPage.getModalTitle())
            .toMatch(/Create or edit a Dia Entrega/);
        diaEntregaDialogPage.close();
    });

    it('should create and save DiaEntregas', () => {
        diaEntregaComponentsPage.clickOnCreateButton();
        diaEntregaDialogPage.setNombreInput('nombre');
        expect(diaEntregaDialogPage.getNombreInput()).toMatch('nombre');
        diaEntregaDialogPage.save();
        expect(diaEntregaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DiaEntregaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-dia-entrega div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class DiaEntregaDialogPage {
    modalTitle = element(by.css('h4#myDiaEntregaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
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
