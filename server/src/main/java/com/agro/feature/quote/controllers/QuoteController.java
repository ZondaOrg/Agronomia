package com.agro.feature.quote.controllers;

import com.agro.core.api.Api;
import com.agro.feature.quote.domain.Quote;
import com.agro.feature.quote.dtos.calculate.CalculateQuoteMapper;
import com.agro.feature.quote.dtos.calculate.request.CalculateQuoteRequest;
import com.agro.feature.quote.dtos.calculate.response.CalculateQuoteResponse;
import com.agro.feature.quote.services.QuoteService;
import com.agro.shared.annotations.role.VendedorOrOwnerEndpoint;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Api.QUOTE)
@Tag(name = "Cotizaciones", description = "Operaciones relacionadas al cálculo de cotizaciones")
public class QuoteController {

    private final QuoteService quoteService;

    public QuoteController(QuoteService quoteService) {
        this.quoteService = quoteService;
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
