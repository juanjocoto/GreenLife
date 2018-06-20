import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Etiqueta e2e test', () => {

    let navBarPage: NavBarPage;
    let etiquetaDialogPage: EtiquetaDialogPage;
    let etiquetaComponentsPage: EtiquetaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Etiquetas', () => {
        navBarPage.goToEntity('etiqueta');
        etiquetaComponentsPage = new EtiquetaComponentsPage();
        expect(etiquetaComponentsPage.getTitle())
            .toMatch(/Etiquetas/);

    });

    it('should load create Etiqueta dialog', () => {
        etiquetaComponentsPage.clickOnCreateButton();
        etiquetaDialogPage = new EtiquetaDialogPage();
        expect(etiquetaDialogPage.getModalTitle())
            .toMatch(/Create or edit a Etiqueta/);
        etiquetaDialogPage.close();
    });

    it('should create and save Etiquetas', () => {
        etiquetaComponentsPage.clickOnCreateButton();
        etiquetaDialogPage.setNombreInput('nombre');
        expect(etiquetaDialogPage.getNombreInput()).toMatch('nombre');
        etiquetaDialogPage.getDisponibleInput().isSelected().then((selected) => {
            if (selected) {
                etiquetaDialogPage.getDisponibleInput().click();
                expect(etiquetaDialogPage.getDisponibleInput().isSelected()).toBeFalsy();
            } else {
                etiquetaDialogPage.getDisponibleInput().click();
                expect(etiquetaDialogPage.getDisponibleInput().isSelected()).toBeTruthy();
            }
        });
        etiquetaDialogPage.save();
        expect(etiquetaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EtiquetaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-etiqueta div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class EtiquetaDialogPage {
    modalTitle = element(by.css('h4#myEtiquetaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));
    disponibleInput = element(by.css('input#field_disponible'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
    };

    getDisponibleInput = function() {
        return this.disponibleInput;
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
