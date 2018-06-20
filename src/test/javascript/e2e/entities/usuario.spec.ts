import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Usuario e2e test', () => {

    let navBarPage: NavBarPage;
    let usuarioDialogPage: UsuarioDialogPage;
    let usuarioComponentsPage: UsuarioComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Usuarios', () => {
        navBarPage.goToEntity('usuario');
        usuarioComponentsPage = new UsuarioComponentsPage();
        expect(usuarioComponentsPage.getTitle())
            .toMatch(/Usuarios/);

    });

    it('should load create Usuario dialog', () => {
        usuarioComponentsPage.clickOnCreateButton();
        usuarioDialogPage = new UsuarioDialogPage();
        expect(usuarioDialogPage.getModalTitle())
            .toMatch(/Create or edit a Usuario/);
        usuarioDialogPage.close();
    });

    it('should create and save Usuarios', () => {
        usuarioComponentsPage.clickOnCreateButton();
        usuarioDialogPage.setFechaCreacionInput('2000-12-31');
        expect(usuarioDialogPage.getFechaCreacionInput()).toMatch('2000-12-31');
        usuarioDialogPage.setFechaNacimientoInput('2000-12-31');
        expect(usuarioDialogPage.getFechaNacimientoInput()).toMatch('2000-12-31');
        usuarioDialogPage.setNombreInput('nombre');
        expect(usuarioDialogPage.getNombreInput()).toMatch('nombre');
        usuarioDialogPage.setApellidosInput('apellidos');
        expect(usuarioDialogPage.getApellidosInput()).toMatch('apellidos');
        usuarioDialogPage.setCedulaInput('cedula');
        expect(usuarioDialogPage.getCedulaInput()).toMatch('cedula');
        usuarioDialogPage.setDireccionInput('direccion');
        expect(usuarioDialogPage.getDireccionInput()).toMatch('direccion');
        usuarioDialogPage.setTelefonoInput('telefono');
        expect(usuarioDialogPage.getTelefonoInput()).toMatch('telefono');
        usuarioDialogPage.setLatitudInput('5');
        expect(usuarioDialogPage.getLatitudInput()).toMatch('5');
        usuarioDialogPage.setLongitudInput('5');
        expect(usuarioDialogPage.getLongitudInput()).toMatch('5');
        usuarioDialogPage.setContrasenaInput('contrasena');
        expect(usuarioDialogPage.getContrasenaInput()).toMatch('contrasena');
        usuarioDialogPage.setCorreoInput('correo');
        expect(usuarioDialogPage.getCorreoInput()).toMatch('correo');
        usuarioDialogPage.getEstaActivadoInput().isSelected().then((selected) => {
            if (selected) {
                usuarioDialogPage.getEstaActivadoInput().click();
                expect(usuarioDialogPage.getEstaActivadoInput().isSelected()).toBeFalsy();
            } else {
                usuarioDialogPage.getEstaActivadoInput().click();
                expect(usuarioDialogPage.getEstaActivadoInput().isSelected()).toBeTruthy();
            }
        });
        usuarioDialogPage.setNombreUsuarioInput('nombreUsuario');
        expect(usuarioDialogPage.getNombreUsuarioInput()).toMatch('nombreUsuario');
        usuarioDialogPage.fotoSelectLastOption();
        usuarioDialogPage.userDetailSelectLastOption();
        usuarioDialogPage.rolSelectLastOption();
        usuarioDialogPage.save();
        expect(usuarioDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UsuarioComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-usuario div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class UsuarioDialogPage {
    modalTitle = element(by.css('h4#myUsuarioLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fechaCreacionInput = element(by.css('input#field_fechaCreacion'));
    fechaNacimientoInput = element(by.css('input#field_fechaNacimiento'));
    nombreInput = element(by.css('input#field_nombre'));
    apellidosInput = element(by.css('input#field_apellidos'));
    cedulaInput = element(by.css('input#field_cedula'));
    direccionInput = element(by.css('input#field_direccion'));
    telefonoInput = element(by.css('input#field_telefono'));
    latitudInput = element(by.css('input#field_latitud'));
    longitudInput = element(by.css('input#field_longitud'));
    contrasenaInput = element(by.css('input#field_contrasena'));
    correoInput = element(by.css('input#field_correo'));
    estaActivadoInput = element(by.css('input#field_estaActivado'));
    nombreUsuarioInput = element(by.css('input#field_nombreUsuario'));
    fotoSelect = element(by.css('select#field_foto'));
    userDetailSelect = element(by.css('select#field_userDetail'));
    rolSelect = element(by.css('select#field_rol'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setFechaCreacionInput = function(fechaCreacion) {
        this.fechaCreacionInput.sendKeys(fechaCreacion);
    };

    getFechaCreacionInput = function() {
        return this.fechaCreacionInput.getAttribute('value');
    };

    setFechaNacimientoInput = function(fechaNacimiento) {
        this.fechaNacimientoInput.sendKeys(fechaNacimiento);
    };

    getFechaNacimientoInput = function() {
        return this.fechaNacimientoInput.getAttribute('value');
    };

    setNombreInput = function(nombre) {
        this.nombreInput.sendKeys(nombre);
    };

    getNombreInput = function() {
        return this.nombreInput.getAttribute('value');
    };

    setApellidosInput = function(apellidos) {
        this.apellidosInput.sendKeys(apellidos);
    };

    getApellidosInput = function() {
        return this.apellidosInput.getAttribute('value');
    };

    setCedulaInput = function(cedula) {
        this.cedulaInput.sendKeys(cedula);
    };

    getCedulaInput = function() {
        return this.cedulaInput.getAttribute('value');
    };

    setDireccionInput = function(direccion) {
        this.direccionInput.sendKeys(direccion);
    };

    getDireccionInput = function() {
        return this.direccionInput.getAttribute('value');
    };

    setTelefonoInput = function(telefono) {
        this.telefonoInput.sendKeys(telefono);
    };

    getTelefonoInput = function() {
        return this.telefonoInput.getAttribute('value');
    };

    setLatitudInput = function(latitud) {
        this.latitudInput.sendKeys(latitud);
    };

    getLatitudInput = function() {
        return this.latitudInput.getAttribute('value');
    };

    setLongitudInput = function(longitud) {
        this.longitudInput.sendKeys(longitud);
    };

    getLongitudInput = function() {
        return this.longitudInput.getAttribute('value');
    };

    setContrasenaInput = function(contrasena) {
        this.contrasenaInput.sendKeys(contrasena);
    };

    getContrasenaInput = function() {
        return this.contrasenaInput.getAttribute('value');
    };

    setCorreoInput = function(correo) {
        this.correoInput.sendKeys(correo);
    };

    getCorreoInput = function() {
        return this.correoInput.getAttribute('value');
    };

    getEstaActivadoInput = function() {
        return this.estaActivadoInput;
    };
    setNombreUsuarioInput = function(nombreUsuario) {
        this.nombreUsuarioInput.sendKeys(nombreUsuario);
    };

    getNombreUsuarioInput = function() {
        return this.nombreUsuarioInput.getAttribute('value');
    };

    fotoSelectLastOption = function() {
        this.fotoSelect.all(by.tagName('option')).last().click();
    };

    fotoSelectOption = function(option) {
        this.fotoSelect.sendKeys(option);
    };

    getFotoSelect = function() {
        return this.fotoSelect;
    };

    getFotoSelectedOption = function() {
        return this.fotoSelect.element(by.css('option:checked')).getText();
    };

    userDetailSelectLastOption = function() {
        this.userDetailSelect.all(by.tagName('option')).last().click();
    };

    userDetailSelectOption = function(option) {
        this.userDetailSelect.sendKeys(option);
    };

    getUserDetailSelect = function() {
        return this.userDetailSelect;
    };

    getUserDetailSelectedOption = function() {
        return this.userDetailSelect.element(by.css('option:checked')).getText();
    };

    rolSelectLastOption = function() {
        this.rolSelect.all(by.tagName('option')).last().click();
    };

    rolSelectOption = function(option) {
        this.rolSelect.sendKeys(option);
    };

    getRolSelect = function() {
        return this.rolSelect;
    };

    getRolSelectedOption = function() {
        return this.rolSelect.element(by.css('option:checked')).getText();
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
