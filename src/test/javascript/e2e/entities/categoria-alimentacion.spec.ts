import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CategoriaAlimentacion e2e test', () => {

    let navBarPage: NavBarPage;
    let categoriaAlimentacionDialogPage: CategoriaAlimentacionDialogPage;
    let categoriaAlimentacionComponentsPage: CategoriaAlimentacionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CategoriaAlimentacions', () => {
        navBarPage.goToEntity('categoria-alimentacion');
        categoriaAlimentacionComponentsPage = new CategoriaAlimentacionComponentsPage();
        expect(categoriaAlimentacionComponentsPage.getTitle())
            .toMatch(/Categoria Alimentacions/);

    });

    it('should load create CategoriaAlimentacion dialog', () => {
        categoriaAlimentacionComponentsPage.clickOnCreateButton();
        categoriaAlimentacionDialogPage = new CategoriaAlimentacionDialogPage();
        expect(categoriaAlimentacionDialogPage.getModalTitle())
            .toMatch(/Create or edit a Categoria Alimentacion/);
        categoriaAlimentacionDialogPage.close();
    });

    it('should create and save CategoriaAlimentacions', () => {
        categoriaAlimentacionComponentsPage.clickOnCreateButton();
        categoriaAlimentacionDialogPage.setNombreInput('nombre');
        expect(categoriaAlimentacionDialogPage.getNombreInput()).toMatch('nombre');
        categoriaAlimentacionDialogPage.setDescripcionInput('descripcion');
        expect(categoriaAlimentacionDialogPage.getDescripcionInput()).toMatch('descripcion');
        categoriaAlimentacionDialogPage.save();
        expect(categoriaAlimentacionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CategoriaAlimentacionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-categoria-alimentacion div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class CategoriaAlimentacionDialogPage {
    modalTitle = element(by.css('h4#myCategoriaAlimentacionLabel'));
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
