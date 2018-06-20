import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('LineaEntrega e2e test', () => {

    let navBarPage: NavBarPage;
    let lineaEntregaDialogPage: LineaEntregaDialogPage;
    let lineaEntregaComponentsPage: LineaEntregaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load LineaEntregas', () => {
        navBarPage.goToEntity('linea-entrega');
        lineaEntregaComponentsPage = new LineaEntregaComponentsPage();
        expect(lineaEntregaComponentsPage.getTitle())
            .toMatch(/Linea Entregas/);

    });

    it('should load create LineaEntrega dialog', () => {
        lineaEntregaComponentsPage.clickOnCreateButton();
        lineaEntregaDialogPage = new LineaEntregaDialogPage();
        expect(lineaEntregaDialogPage.getModalTitle())
            .toMatch(/Create or edit a Linea Entrega/);
        lineaEntregaDialogPage.close();
    });

    it('should create and save LineaEntregas', () => {
        lineaEntregaComponentsPage.clickOnCreateButton();
        lineaEntregaDialogPage.setCantidadInput('5');
        expect(lineaEntregaDialogPage.getCantidadInput()).toMatch('5');
        lineaEntregaDialogPage.productoSelectLastOption();
        lineaEntregaDialogPage.entregaSelectLastOption();
        lineaEntregaDialogPage.save();
        expect(lineaEntregaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LineaEntregaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-linea-entrega div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class LineaEntregaDialogPage {
    modalTitle = element(by.css('h4#myLineaEntregaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    cantidadInput = element(by.css('input#field_cantidad'));
    productoSelect = element(by.css('select#field_producto'));
    entregaSelect = element(by.css('select#field_entrega'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setCantidadInput = function(cantidad) {
        this.cantidadInput.sendKeys(cantidad);
    };

    getCantidadInput = function() {
        return this.cantidadInput.getAttribute('value');
    };

    productoSelectLastOption = function() {
        this.productoSelect.all(by.tagName('option')).last().click();
    };

    productoSelectOption = function(option) {
        this.productoSelect.sendKeys(option);
    };

    getProductoSelect = function() {
        return this.productoSelect;
    };

    getProductoSelectedOption = function() {
        return this.productoSelect.element(by.css('option:checked')).getText();
    };

    entregaSelectLastOption = function() {
        this.entregaSelect.all(by.tagName('option')).last().click();
    };

    entregaSelectOption = function(option) {
        this.entregaSelect.sendKeys(option);
    };

    getEntregaSelect = function() {
        return this.entregaSelect;
    };

    getEntregaSelectedOption = function() {
        return this.entregaSelect.element(by.css('option:checked')).getText();
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
