import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Publicacion e2e test', () => {

    let navBarPage: NavBarPage;
    let publicacionDialogPage: PublicacionDialogPage;
    let publicacionComponentsPage: PublicacionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Publicacions', () => {
        navBarPage.goToEntity('publicacion');
        publicacionComponentsPage = new PublicacionComponentsPage();
        expect(publicacionComponentsPage.getTitle())
            .toMatch(/Publicacions/);

    });

    it('should load create Publicacion dialog', () => {
        publicacionComponentsPage.clickOnCreateButton();
        publicacionDialogPage = new PublicacionDialogPage();
        expect(publicacionDialogPage.getModalTitle())
            .toMatch(/Create or edit a Publicacion/);
        publicacionDialogPage.close();
    });

    it('should create and save Publicacions', () => {
        publicacionComponentsPage.clickOnCreateButton();
        publicacionDialogPage.setFechaCreacionInput('2000-12-31');
        expect(publicacionDialogPage.getFechaCreacionInput()).toMatch('2000-12-31');
        publicacionDialogPage.setTituloInput('titulo');
        expect(publicacionDialogPage.getTituloInput()).toMatch('titulo');
        publicacionDialogPage.setTextoInput('texto');
        expect(publicacionDialogPage.getTextoInput()).toMatch('texto');
        publicacionDialogPage.usuarioSelectLastOption();
        // publicacionDialogPage.etiquetasSelectLastOption();
        publicacionDialogPage.save();
        expect(publicacionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PublicacionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-publicacion div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PublicacionDialogPage {
    modalTitle = element(by.css('h4#myPublicacionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaCreacionInput = element(by.css('input#field_fechaCreacion'));
    tituloInput = element(by.css('input#field_titulo'));
    textoInput = element(by.css('input#field_texto'));
    usuarioSelect = element(by.css('select#field_usuario'));
    etiquetasSelect = element(by.css('select#field_etiquetas'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFechaCreacionInput = function(fechaCreacion) {
        this.fechaCreacionInput.sendKeys(fechaCreacion);
    };

    getFechaCreacionInput = function() {
        return this.fechaCreacionInput.getAttribute('value');
    };

    setTituloInput = function(titulo) {
        this.tituloInput.sendKeys(titulo);
    };

    getTituloInput = function() {
        return this.tituloInput.getAttribute('value');
    };

    setTextoInput = function(texto) {
        this.textoInput.sendKeys(texto);
    };

    getTextoInput = function() {
        return this.textoInput.getAttribute('value');
    };

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

    etiquetasSelectLastOption = function() {
        this.etiquetasSelect.all(by.tagName('option')).last().click();
    };

    etiquetasSelectOption = function(option) {
        this.etiquetasSelect.sendKeys(option);
    };

    getEtiquetasSelect = function() {
        return this.etiquetasSelect;
    };

    getEtiquetasSelectedOption = function() {
        return this.etiquetasSelect.element(by.css('option:checked')).getText();
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
