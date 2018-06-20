import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ComentarioPublicacion e2e test', () => {

    let navBarPage: NavBarPage;
    let comentarioPublicacionDialogPage: ComentarioPublicacionDialogPage;
    let comentarioPublicacionComponentsPage: ComentarioPublicacionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ComentarioPublicacions', () => {
        navBarPage.goToEntity('comentario-publicacion');
        comentarioPublicacionComponentsPage = new ComentarioPublicacionComponentsPage();
        expect(comentarioPublicacionComponentsPage.getTitle())
            .toMatch(/Comentario Publicacions/);

    });

    it('should load create ComentarioPublicacion dialog', () => {
        comentarioPublicacionComponentsPage.clickOnCreateButton();
        comentarioPublicacionDialogPage = new ComentarioPublicacionDialogPage();
        expect(comentarioPublicacionDialogPage.getModalTitle())
            .toMatch(/Create or edit a Comentario Publicacion/);
        comentarioPublicacionDialogPage.close();
    });

    it('should create and save ComentarioPublicacions', () => {
        comentarioPublicacionComponentsPage.clickOnCreateButton();
        comentarioPublicacionDialogPage.setFechaCreacionInput('2000-12-31');
        expect(comentarioPublicacionDialogPage.getFechaCreacionInput()).toMatch('2000-12-31');
        comentarioPublicacionDialogPage.setTextoInput('texto');
        expect(comentarioPublicacionDialogPage.getTextoInput()).toMatch('texto');
        comentarioPublicacionDialogPage.usuarioSelectLastOption();
        comentarioPublicacionDialogPage.publicacionSelectLastOption();
        comentarioPublicacionDialogPage.save();
        expect(comentarioPublicacionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ComentarioPublicacionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-comentario-publicacion div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ComentarioPublicacionDialogPage {
    modalTitle = element(by.css('h4#myComentarioPublicacionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaCreacionInput = element(by.css('input#field_fechaCreacion'));
    textoInput = element(by.css('input#field_texto'));
    usuarioSelect = element(by.css('select#field_usuario'));
    publicacionSelect = element(by.css('select#field_publicacion'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFechaCreacionInput = function(fechaCreacion) {
        this.fechaCreacionInput.sendKeys(fechaCreacion);
    };

    getFechaCreacionInput = function() {
        return this.fechaCreacionInput.getAttribute('value');
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

    publicacionSelectLastOption = function() {
        this.publicacionSelect.all(by.tagName('option')).last().click();
    };

    publicacionSelectOption = function(option) {
        this.publicacionSelect.sendKeys(option);
    };

    getPublicacionSelect = function() {
        return this.publicacionSelect;
    };

    getPublicacionSelectedOption = function() {
        return this.publicacionSelect.element(by.css('option:checked')).getText();
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
