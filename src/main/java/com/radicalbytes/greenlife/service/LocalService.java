package com.radicalbytes.greenlife.service;

import java.util.ArrayList;
import java.util.List;

import com.radicalbytes.greenlife.domain.Local;
import com.radicalbytes.greenlife.repository.LocalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocalService {

    @Autowired
    private LocalRepository localRepository;

    public List<Local> findByDistance(double lat, double lon, double distance) {
        List<Local> locals = this.localRepository.findAll();
        List<Local> resultList = new ArrayList<>();

        for (Local local : locals) {
            double dist = this.getDistance(lat, lon, local.getLatitud(), local.getLongitud());
            if (dist <= distance) {
                resultList.add(local);
            }
        }

        return resultList;
    }

    private double getDistance(double centerLat, double centerLong, double pointLat, double pointLong) {
        double R = 6371e3; // metres
        double φ1 = toRadians(centerLat);
        double φ2 = toRadians(pointLat);
        double Δφ = toRadians(pointLat - centerLat);
        double Δλ = toRadians(pointLong - centerLong);

        double a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2)
                + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        double d = R * c;

        return d;
    }

    private double toRadians(double value) {
        return value * Math.PI / 180;
    }
}