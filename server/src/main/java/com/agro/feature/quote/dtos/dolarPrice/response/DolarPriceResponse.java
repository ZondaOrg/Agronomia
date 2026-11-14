package com.agro.feature.quote.dtos.dolarPrice.response;

public record DolarPriceResponse(
        String moneda,
        String casa,
        String nombre,
        Integer compra,
        Integer venta,
        String fechaActualizacion
) {
}
