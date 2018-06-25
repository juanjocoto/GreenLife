package com.radicalbytes.greenlife.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String USER = "ROLE_USER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    public static final String CLIENTE = "ROLE_CLIENTE";

    public static final String COMERCIO = "ROLE_COMERCIO";

    public static final String RECOLECTOR = "ROLE_RECOLECTOR";

    public static final String PATROCINADOR = "ROLE_PATROCINADOR";

    private AuthoritiesConstants() {
    }
}
