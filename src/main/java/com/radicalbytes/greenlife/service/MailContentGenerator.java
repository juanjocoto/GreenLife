package com.radicalbytes.greenlife.service;

import java.text.DecimalFormat;

import com.radicalbytes.greenlife.domain.Entrega;
import com.radicalbytes.greenlife.domain.LineaEntrega;
import com.radicalbytes.greenlife.domain.User;

import org.springframework.stereotype.Service;

@Service
public class MailContentGenerator {
    public String generateContent(Entrega entrega, String strDate, String strHour, User client) {
        String content = "<html><body> <article> <p> Rastreador <br>"
                + "Información: {info} <br>Fecha: {date} <br>Hora: {hour} <br>Cliente: {client}<br>"
                + "</p></article><table><thead><tr><th>Producto</th><th>Cant.</th><th></th>Precio U.</tr>"
                + "</thead><tbody>{tableContent}</tbody></table></body></html>";
        content = content.replace("{estado}", entrega.getCadena().getEstado().toString());
        content = content.replace("{info}", entrega.getCadena().getInfo());
        content = content.replace("{date}", strDate);
        content = content.replace("{hour}", strHour);
        content = content.replace("{client}", client.getFirstName() + " " + client.getLastName());
        content = content.replace("{tableContent}", generateTable(entrega));
        return content;
    }

    private String generateTable(Entrega entrega) {
        final String template = "<tr><td>{prod}</td><td>{cant}</td><td>{price}</td></tr>";
        String result = "";
        DecimalFormat formatter = new DecimalFormat("#,###.00");

        for (LineaEntrega linea : entrega.getLineas()) {
            String temp = template;
            temp = temp.replace("{prod}", linea.getProducto().getNombre());
            temp = temp.replace("{cant}", linea.getCantidad().toString());
            temp = temp.replace("{price}", formatter.format(linea.getProducto().getPrecio()));
            result += temp;
        }

        return result;
    }
}