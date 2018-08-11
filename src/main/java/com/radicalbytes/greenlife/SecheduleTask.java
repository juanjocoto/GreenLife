package com.radicalbytes.greenlife;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import com.radicalbytes.greenlife.domain.CadenaEntrega;
import com.radicalbytes.greenlife.domain.Entrega;
import com.radicalbytes.greenlife.domain.LineaEntrega;
import com.radicalbytes.greenlife.domain.LineaProducto;
import com.radicalbytes.greenlife.domain.Pedido;
import com.radicalbytes.greenlife.domain.User;
import com.radicalbytes.greenlife.domain.enumeration.EstadoCadena;
import com.radicalbytes.greenlife.repository.CadenaEntregaRepository;
import com.radicalbytes.greenlife.repository.EntregaRepository;
import com.radicalbytes.greenlife.repository.LineaEntregaRepository;
import com.radicalbytes.greenlife.repository.PedidoRepository;
import com.radicalbytes.greenlife.service.MailContentGenerator;
import com.radicalbytes.greenlife.service.MailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class SecheduleTask {

    @Autowired
    private PedidoRepository pedidoRepo;
    @Autowired
    private EntregaRepository entregaRepo;
    @Autowired
    private LineaEntregaRepository lineaEntregaRepo;
    @Autowired
    private CadenaEntregaRepository cadenaEntregaRepository;
    @Autowired
    private MailService mailService;
    @Autowired
    private MailContentGenerator mailContentGenerator;

    @Scheduled(cron = "0 0 0 * * *")
    // @Scheduled(cron = "0/10 * * * * *")
    @Transactional
    public void test() {

        Locale spanishLocale = new Locale("es", "ES");

        LocalDate now = LocalDate.now();
        String dayWeek = now.format(DateTimeFormatter.ofPattern("EEEE", spanishLocale));
        dayWeek = dayWeek.substring(0, 1).toUpperCase() + dayWeek.substring(1);
        System.out.println();
        System.out.println(dayWeek);
        System.out.println();

        List<Pedido> pedidoList = pedidoRepo.findAllByDiasEntrega_nombre(dayWeek);
        for (Pedido pedido : pedidoList) {
            Entrega entrega = new Entrega();
            entrega.setFechaInicio(now);
            entrega.setSuscripcion(pedido.getSuscripcion());
            entrega.setPedido(pedido);
            entregaRepo.save(entrega);

            Set<LineaEntrega> lineas = entrega.getLineas();
            for (LineaProducto lineaProducto : pedido.getLineas()) {
                LineaEntrega lineaEntrega = new LineaEntrega();
                lineaEntrega.setCantidad(lineaProducto.getCantidad());
                lineaEntrega.setProducto(lineaProducto.getProducto());
                lineaEntrega.setEntrega(entrega);
                lineas.add(lineaEntrega);
                lineaEntregaRepo.save(lineaEntrega);
            }
            // entrega.addCadena(cadenaEntrega);

            CadenaEntrega cadenaEntrega = new CadenaEntrega();
            cadenaEntrega.setFecha(now);
            cadenaEntrega.setEstado(EstadoCadena.PENDIENTE);
            cadenaEntrega.setInfo("Se inicia el pedido");
            cadenaEntregaRepository.save(cadenaEntrega);

            entrega.setCadena(cadenaEntrega);

            entregaRepo.save(entrega);

            String reciver = entrega.getSuscripcion().getComercio().getDueno().getUserDetail().getEmail();

            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");// dd/MM/yyyy
            SimpleDateFormat hourFormat = new SimpleDateFormat("HH:mm");

            Date date = new Date();
            String strDate = dateFormat.format(date);
            String strHour = hourFormat.format(date);
            User client = entrega.getSuscripcion().getUsuario().getUserDetail();

            String content = mailContentGenerator.generateContent(entrega, strDate, strHour, client);

            mailService.sendEmail(reciver, "Se crea el pedido #" + entrega.getId(), content + strDate, false, true);
        }
    }

}