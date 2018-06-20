import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Producto e2e test', () => {

    let navBarPage: NavBarPage;
    let productoDialogPage: ProductoDialogPage;
    let productoComponentsPage: ProductoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Productos', () => {
        navBarPage.goToEntity('producto');
        productoComponentsPage = new ProductoComponentsPage();
        expect(productoComponentsPage.getTitle())
            .toMatch(/Productos/);

    });

    it('should load create Producto dialog', () => {
        productoComponentsPage.clickOnCreateButton();
        productoDialogPage = new ProductoDialogPage();
        expect(productoDialogPage.getModalTitle())
            .toMatch(/Create or edit a Producto/);
        productoDialogPage.close();
    });

    it('should create and save Productos', () => {
        productoComponentsPage.clickOnCreateButton();
        productoDialogPage.setNombreInput('nombre');
        expect(productoDialogPage.getNombreInput()).toMatch('nombre');
        productoDialogPage.setDescripcionInput('descripcion');
        expect(productoDialogPage.getDescripcionInput()).toMatch('descripcion');
        productoDialogPage.setPrecioInput('5');
        expect(productoDialogPage.getPrecioInput()).toMatch('5');
        productoDialogPage.setFechaCreacionInput('2000-12-31');
        expect(productoDialogPage.getFechaCreacionInput()).toMatch('2000-12-31');
        productoDialogPage.comercioSelectLastOption();
        // productoDialogPage.etiquetasSelectLastOption();
        // productoDialogPage.categoriaSelectLastOption();
        productoDialogPage.save();
        expect(productoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProductoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-producto div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ProductoDialogPage {
    modalTitle = element(by.css('h4#myProductoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreInput = element(by.css('input#field_nombre'));
    descripcionInput = element(by.css('input#field_descripcion'));
    precioInput = element(by.css('input#field_precio'));
    fechaCreacionInput = element(by.css('input#field_fechaCreacion'));
    comercioSelect = element(by.css('select#field_comercio'));
    etiquetasSelect = element(by.css('select#field_etiquetas'));
    categoriaSelect = element(by.css('select#field_categoria'));

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

    setPrecioInput = function(precio) {
        this.precioInput.sendKeys(precio);
    };

    getPrecioInput = function() {
        return this.precioInput.getAttribute('value');
    };

    setFechaCreacionInput = function(fechaCreacion) {
        this.fechaCreacionInput.sendKeys(fechaCreacion);
    };

    getFechaCreacionInput = function() {
        return this.fechaCreacionInput.getAttribute('value');
    };

    comercioSelectLastOption = function() {
        this.comercioSelect.all(by.tagName('option')).last().click();
    };

    comercioSelectOption = function(option) {
        this.comercioSelect.sendKeys(option);
    };

    getComercioSelect = function() {
        return this.comercioSelect;
    };

    getComercioSelectedOption = function() {
        return this.comercioSelect.element(by.css('option:checked')).getText();
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

    categoriaSelectLastOption = function() {
        this.categoriaSelect.all(by.tagName('option')).last().click();
    };

    categoriaSelectOption = function(option) {
        this.categoriaSelect.sendKeys(option);
    };

    getCategoriaSelect = function() {
        return this.categoriaSelect;
    };

    getCategoriaSelectedOption = function() {
        return this.categoriaSelect.element(by.css('option:checked')).getText();
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
