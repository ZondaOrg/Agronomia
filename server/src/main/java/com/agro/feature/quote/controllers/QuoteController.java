package com.agro.feature.quote.controllers;

import com.agro.core.api.Api;
import com.agro.feature.quote.domain.Quote;
import com.agro.feature.quote.dtos.calculateArs.CalculateArsMapper;
import com.agro.feature.quote.dtos.calculateArs.request.CalculateArsRequest;
import com.agro.feature.quote.dtos.calculateArs.response.CalculateArsResponse;
import com.agro.feature.quote.dtos.calculateArsManual.CalculateArsManualMapper;
import com.agro.feature.quote.dtos.calculateArsManual.request.CalculateArsManualRequest;
import com.agro.feature.quote.dtos.calculateArsManual.response.CalculateArsManualResponse;
import com.agro.feature.quote.services.DolarPriceService;
import com.agro.feature.quote.dtos.calculate.CalculateQuoteMapper;
import com.agro.feature.quote.dtos.calculate.request.CalculateQuoteRequest;
import com.agro.feature.quote.dtos.calculate.response.CalculateQuoteResponse;
import com.agro.feature.quote.services.QuoteService;
import com.agro.shared.annotations.role.VendedorOrOwnerEndpoint;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import java.math.BigDecimal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Api.QUOTE)
@Tag(name = "Cotizaciones", description = "Operaciones relacionadas al cálculo de cotizaciones")
public class QuoteController {

    private final QuoteService quoteService;
    private final DolarPriceService dolarPriceService;

    public QuoteController(QuoteService quoteService, DolarPriceService dolarPriceService) {
        this.quoteService = quoteService;
        this.dolarPriceService = dolarPriceService;
    }

    @PostMapping("/calculate-ars")
    @VendedorOrOwnerEndpoint
    @Operation(summary = "Calcular el precio completo de la selección en pesos y en dólares con el dólar oficial disponible")
    public ResponseEntity<CalculateArsResponse> calculateArs(@Valid @RequestBody CalculateArsRequest request) {
        Quote quote = quoteService.calculate(
                request.productId(),
                request.quantity(),
                request.optionalIds(),
                request.includeFreight());
        BigDecimal dolar = dolarPriceService.get(quote);
        return ResponseEntity.ok(CalculateArsMapper.toResponse(quote, dolar));
    }

    @PostMapping("/calculate-ars/manual")
    @VendedorOrOwnerEndpoint
    @Operation(summary = "Calcular el precio completo de la selección en pesos y en dólares con el dólar ingresado manualmente")
    public ResponseEntity<CalculateArsManualResponse> calculateArsManual(@Valid @RequestBody CalculateArsManualRequest request) {
        Quote quote = quoteService.calculate(
                request.productId(),
                request.quantity(),
                request.optionalIds(),
                request.includeFreight());
        return ResponseEntity.ok(CalculateArsManualMapper.toResponse(quote, request.dolarPrice()));
    }

    @PostMapping("/calculate")
    @VendedorOrOwnerEndpoint
    @Operation(summary = "Calcular el precio completo de la selección del usuario")
    public ResponseEntity<CalculateQuoteResponse> calculate(@Valid @RequestBody CalculateQuoteRequest request) {
        Quote quote = quoteService.calculate(
                request.productId(),
                request.quantity(),
                request.optionalIds(),
                request.includeFreight());
        return ResponseEntity.ok(CalculateQuoteMapper.toResponse(quote));
    }
}
