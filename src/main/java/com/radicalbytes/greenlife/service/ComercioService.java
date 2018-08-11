package com.radicalbytes.greenlife.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.radicalbytes.greenlife.domain.Comercio;
import com.radicalbytes.greenlife.domain.Producto;
import com.radicalbytes.greenlife.repository.ComercioRepository;
import com.radicalbytes.greenlife.repository.ProductoRepository;
import com.radicalbytes.greenlife.repository.ResenaComercioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComercioService {

    @Autowired
    private ComercioRepository comercioRepository;
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private ResenaComercioRepository resenaRepository;

    @Transactional
    public List<Comercio> findByRange(String range) {
        List<Comercio> filterComercios = new ArrayList<Comercio>();

        List<Comercio> listComercios = comercioRepository.findAll();

        Map<String, Range> ranges = setPriceRange();

        Range rangeMap = ranges.get(range);

        for (int i = 0; i < listComercios.size(); i ++) {
            double avg = 0;
            Comercio comercio = listComercios.get(i);
            List<Producto> productosComercio = new ArrayList<Producto>(comercio.getProductos());
            for (int j = 0; j < productosComercio.size(); j++) {
                Producto producto = productosComercio.get(j);
                avg += producto.getPrecio();
            }
            avg = avg / productosComercio.size();
            double min = rangeMap.min;
            double max = rangeMap.max;

            if (avg >= min && avg <= max) {
                filterComercios.add(comercio);
            }
        }

        return filterComercios;
    }

    @Transactional
    public Map<String, Range> setPriceRange() {
        Map<String, Range> listRangePrices = new HashMap<>();
        double min = productoRepository.findLowestPrecio();
        double max = productoRepository.findHighestPrecio();
        double rangeSize = (max - min) / 3;
        Range range = new Range();
        range.min = min;
        range.max = min + rangeSize;
        listRangePrices.put("Low", range);
        min += rangeSize;
        range = new Range();
        range.min = min + 1;
        range.max = min + rangeSize;
        listRangePrices.put("Mild", range);
        min += rangeSize;
        range = new Range();
        range.min = min + 1;
        range.max = min + rangeSize;
        listRangePrices.put("High", range);
        return listRangePrices;
    }

    @Transactional
    public List<Comercio> findByScore(Long score) {
        List<Comercio> filterComercios = new ArrayList<Comercio>();

        List<Comercio> listComercios = comercioRepository.findAll();

        for (int i = 0; i < listComercios.size(); i ++) {
            Comercio comercio = listComercios.get(i);
            double avg = resenaRepository.getCalificacion(comercio.getId()) - score;
            if ( avg >= 0 && avg < 1) {
                filterComercios.add(comercio);
            }
        }

        return filterComercios;
    }

    class Range {
        public double min;
        public double max;
    }
}