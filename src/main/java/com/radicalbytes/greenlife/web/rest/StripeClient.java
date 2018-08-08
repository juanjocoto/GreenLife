package com.radicalbytes.greenlife.web.rest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.stripe.Stripe;
import com.stripe.model.Charge;

@Component
public class StripeClient {

    @Autowired
    StripeClient() {
        Stripe.apiKey = "sk_test_CRvu2B9dW74bzjrqggWqSWC0";
    }

    public Charge chargeCard(String token, double amount, String description, String email) throws Exception {
        Map<String, Object> chargeMap = new HashMap<String, Object>();
        System.out.println(token);
        chargeMap.put("amount", (int)(amount * 100));
        chargeMap.put("currency", "crc");
        chargeMap.put("description", description);
        chargeMap.put("source", token);
        chargeMap.put("receipt_email", email);

        return Charge.create(chargeMap);
    }

}
